const q = document.getElementById("q");
const send = document.getElementById("send");
const mic = document.getElementById("mic");
const result = document.getElementById("result");
const answer = document.getElementById("answer");

const API_URL = "http://localhost:3000/api/ask";

async function askAI(message) {
  result.classList.remove("hidden");

  answer.innerHTML = `
    <h4>🤖 Local India AI</h4>
    <div class="card">
      AI सोच रहा है...
    </div>
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Server error");
    }

    answer.innerHTML = `
      <h4>🤖 Local India AI</h4>

      <div class="card">
        ${formatAnswer(data.answer)}
      </div>
    `;

  } catch (error) {

    console.error(error);

    answer.innerHTML = `
      <h4>⚠️ Connection Problem</h4>

      <div class="card">
        Backend से connection नहीं हो पाया.
        <br><br>
        Check करें कि Termux में:
        <br><br>
        <b>Local India AI backend running on port 3000</b>
        <br><br>
        दिखाई दे रहा है.
      </div>
    `;
  }
}


function formatAnswer(text) {

  if (!text) {
    return "AI से कोई response नहीं मिला.";
  }

  return text
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
}


// Send button
send.onclick = () => {

  const message = q.value.trim();

  if (!message) {
    q.focus();
    return;
  }

  askAI(message);
};


// Enter key
q.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    const message = q.value.trim();

    if (message) {
      askAI(message);
    }
  }
});


// Popular services
document
  .querySelectorAll(".service-grid button")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const message = button.dataset.q;

      if (!message) return;

      q.value = message;

      askAI(message);
    });

  });


// Voice input
mic.onclick = () => {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert(
      "इस browser में voice input available नहीं है."
    );

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "hi-IN";

  recognition.continuous = false;

  recognition.interimResults = false;


  recognition.onstart = () => {
    mic.textContent = "🔴";
  };


  recognition.onend = () => {
    mic.textContent = "🎙";
  };


  recognition.onerror = () => {
    mic.textContent = "🎙";
  };


  recognition.onresult = (event) => {

    const message =
      event.results[0][0].transcript;

    q.value = message;

    askAI(message);
  };


  recognition.start();
};
