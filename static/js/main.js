// DOM
const recipientEl = document.getElementById("recipient");
const reasonEl = document.getElementById("reason");
const generateBtn = document.getElementById("generateBtn");
const generateLabel = document.getElementById("generateLabel");
const resultArea = document.getElementById("resultArea");
const excuseText = document.getElementById("excuseText");
const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const toneButtons = document.querySelectorAll(".tone-btn");

let mood = "Polite";
toneButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    toneButtons.forEach(b => {
      b.classList.remove("bg-indigo-100", "text-indigo-700", "border-indigo-200");
      b.classList.add("bg-white", "border-slate-200", "text-slate-500");
    });
    btn.classList.add("bg-indigo-100", "text-indigo-700", "border-indigo-200");
    btn.classList.remove("bg-white", "text-slate-500");
    mood = btn.getAttribute("data-tone");
  });
});

// generate
async function generateExcuse() {
  const recipient = recipientEl.value.trim();
  const reason = reasonEl.value.trim();
  if (!recipient || !reason) return;

  generateBtn.disabled = true;
  generateLabel.innerText = "Generating Lie...";
  resultArea.classList.add("opacity-60");

  try {
    const resp = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, reason, mood })
    });
    const j = await resp.json();
    const text = j.excuse || j.error || "Sorry, something went wrong.";
    excuseText.textContent = text;
    resultArea.classList.remove("hidden");
    resultArea.classList.remove("opacity-60");
  } catch (err) {
    excuseText.textContent = "Error: My dog ate the internet connection. Try again!";
    resultArea.classList.remove("hidden");
    resultArea.classList.remove("opacity-60");
  } finally {
    generateBtn.disabled = false;
    generateLabel.innerText = "Generate Excuse";
  }
}

generateBtn.addEventListener("click", generateExcuse);

// copy
copyBtn.addEventListener("click", async () => {
  const text = excuseText.textContent || "";
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copyLabel.textContent = "Copied!";
    setTimeout(() => (copyLabel.textContent = "Copy Text"), 2000);
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    copyLabel.textContent = "Copied!";
    setTimeout(() => (copyLabel.textContent = "Copy Text"), 2000);
  }
});

// try again -> just regenerate using current inputs
tryAgainBtn.addEventListener("click", generateExcuse);

// simple enter-to-submit on reason field
reasonEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    generateExcuse();
  }
});
