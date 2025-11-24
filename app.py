import os
import json
from flask import Flask, render_template, request, jsonify, abort
import requests
from dotenv import load_dotenv

load_dotenv(".env")
print("Loaded GEMINI_API_KEY:", os.getenv("GEMINI_API_KEY"))

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # set in environment
GEMINI_MODEL_ENDPOINT = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash-preview-09-2025:generateContent"
)

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    if not GEMINI_API_KEY:
        return jsonify({"error": "Server misconfigured: missing GEMINI_API_KEY"}), 500

    data = request.get_json() or {}
    recipient = (data.get("recipient") or "").strip()
    reason = (data.get("reason") or "").strip()
    mood = (data.get("mood") or "Polite").strip()

    if not recipient or not reason:
        return jsonify({"error": "recipient and reason are required"}), 400

    # Construct prompt similar to your React app
    prompt = f"""
Write a text message excuse.
To: {recipient}
The Real Reason I can't go: {reason}
Tone: {mood}.

Rules:
1. Keep it under 280 characters.
2. Make it sound believable (unless the tone is 'Dramatic', then make it wild).
3. Do not include quotes or "To/From" labels. Just the message body.
"""

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }

    params = {"key": GEMINI_API_KEY}
    headers = {"Content-Type": "application/json"}

    try:
        resp = requests.post(GEMINI_MODEL_ENDPOINT, params=params, headers=headers, json=payload, timeout=20)
        resp.raise_for_status()
        j = resp.json()
        text = (
            j.get("candidates", [{}])[0]
            .get("content", {})
            .get("parts", [{}])[0]
            .get("text", "")
        )
        if not text:
            raise ValueError("Empty response from API")
        return jsonify({"excuse": text.strip()})
    except Exception as e:
        # Friendly fallback message
        return jsonify({"excuse": "Error: My dog ate the internet connection. Try again!", "debug": str(e)}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 3000)))
