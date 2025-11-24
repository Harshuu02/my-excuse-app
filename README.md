# 🚀 Features

Generate believable, funny, or dramatic excuses

Beautiful TailwindCSS UI

Gemini 2.5 Flash API integration

Copy-to-clipboard support

Quick regenerate option

Fully responsive design

🛠 Requirements

Python 3.8+

pip

A Google Gemini API Key
Create one here → https://aistudio.google.com/apikey


# 📦 Installation
1. Clone the repo
git clone <your-repo-url>
cd excuse-engine-flask

2. Install dependencies
pip install -r requirements.txt


# 🔑 API Key Setup

You have two ways to provide your Gemini API key.

✅ Method 1 — Easiest (Recommended for Development)

Run Flask with the key inline:

Mac/Linux
GEMINI_API_KEY="YOUR_KEY_HERE" python app.py

Windows PowerShell
$env:GEMINI_API_KEY="YOUR_KEY_HERE"; python app.py


This instantly injects the key into the environment.

✅ Method 2 — Using a .env File (Optional)

Create a file named .env in the project root:

GEMINI_API_KEY=YOUR_KEY_HERE


Note: Some systems may fail to auto-load .env.
Using Method 1 is the simplest and guaranteed to work.


# ▶️ Running the App

Start the Flask server:

python app.py


Your app will be available at:

http://127.0.0.1:3000


# 🧠 How It Works
Backend (Flask)

Receives input from the frontend (recipient, reason, mood)

Builds a custom prompt

Sends it to Gemini using requests

Returns the generated excuse as JSON

Frontend

TailwindCSS-based UI

JavaScript (main.js) sends fetch requests to /generate

Displays excuse in a message bubble

Supports:

tone selection

copy-to-clipboard

regenerate


# 🎨 UI Technologies

TailwindCSS CDN

Lucide Icons

Custom CSS for minor tweaks


# 🧪 Example Request (Internally Generated)
POST /generate
{
  "recipient": "My Boss",
  "reason": "I overslept",
  "mood": "Polite"
}


Response:

{
  "excuse": "Sorry, I’m running late. I woke up feeling unusually drained today, but I’m on my way and will catch up quickly."
}


# ⚠️ Notes & Limitations

Keep your GEMINI_API_KEY private

Do not commit .env to Git

For production, use a secure environment variable setup


# 📄 License


