const q = document.getElementById("q");
const send = document.getElementById("send");
const mic = document.getElementById("mic");
const result = document.getElementById("result");
const answer = document.getElementById("answer");

function show(text) {
  const s = text.toLowerCase();

  result.classList.remove("hidden");

  // Travel
  if (
    (s.includes("ara") && s.includes("patna")) ||
    s.includes("travel") ||
    s.includes("यात्रा")
  ) {
    answer.innerHTML = `
      <h4>Ara → Patna</h4>

      <p>आपके लिए सस्ते travel options:</p>

      <div class="card">
        <b>🚌 बस</b><br>
        Approx ₹110–₹150<br>
        <span>Budget option</span>
      </div>

      <div class="card">
        <b>🚆 ट्रेन</b><br>
        Approx ₹140–₹200<br>
        <span>Usually economical</span>
      </div>

      <div class="card">
        <b>🚕 Shared Cab</b><br>
        Approx ₹250–₹350<br>
        <span>More convenient</span>
      </div>

      <p>
        Live fare और exact timing next phase में connect होंगे.
      </p>
    `;
  }

  // Jobs
  else if (
    s.includes("job") ||
    s.includes("jobs") ||
    s.includes("naukri") ||
    s.includes("नौकरी") ||
    s.includes("desk")
  ) {
    answer.innerHTML = `
      <h4>💼 Job Assistant</h4>

      <p>
        आपकी qualification, skills और location के आधार पर
        suitable local jobs खोजी जा सकती हैं.
      </p>

      <div class="card">
        <b>📋 Profile Analysis</b><br>
        Qualification + Skills + Experience
      </div>

      <div class="card">
        <b>🎯 Skill Gap</b><br>
        कौन-सी skills सीखनी हैं
      </div>

      <div class="card">
        <b>💼 Job Matching</b><br>
        Suitable jobs और salary range
      </div>
    `;
  }

  // Mechanic / Repair
  else if (
    s.includes("mechanic") ||
    s.includes("repair") ||
    s.includes("garage") ||
    s.includes("मिस्त्री") ||
    s.includes("मरम्मत")
  ) {
    answer.innerHTML = `
      <h4>🔧 Nearby Mechanic</h4>

      <p>
        Location permission मिलने पर nearby mechanics
        को distance, rating और availability के आधार पर
        compare किया जाएगा.
      </p>

      <div class="card">
        <b>📍 Local Service Finder</b><br>
        Nearby mechanics और repair services
      </div>
    `;
  }

  // Government Services
  else if (
    s.includes("government") ||
    s.includes("sarkari") ||
    s.includes("सरकारी") ||
    s.includes("certificate") ||
    s.includes("प्रमाण")
  ) {
    answer.innerHTML = `
      <h4>🏛️ Government Services</h4>

      <p>
        आपको सरकारी service के लिए required documents,
        process और official portal की जानकारी दी जाएगी.
      </p>

      <div class="card">
        <b>📄 Documents</b><br>
        कौन-कौन से documents चाहिए
      </div>

      <div class="card">
        <b>📝 Process</b><br>
        Step-by-step application process
      </div>

      <div class="card">
        <b>🌐 Official Portal</b><br>
        Official website से verified information
      </div>
    `;
  }

  // Banking
  else if (
    s.includes("bank") ||
    s.includes("banking") ||
    s.includes("बैंक")
  ) {
    answer.innerHTML = `
      <h4>🏦 Banking Assistant</h4>

      <p>
        Nearby banks, branches, ATM और banking services
        खोजने में मदद मिलेगी.
      </p>

      <div class="card">
        <b>🏦 Nearby Bank</b><br>
        Location के आधार पर nearby branches
      </div>

      <div class="card">
        <b>💳 Banking Service</b><br>
        Account, ATM, loan और अन्य services
      </div>
    `;
  }

  // Food
  else if (
    s.includes("food") ||
    s.includes("khana") ||
    s.includes("restaurant") ||
    s.includes("खाना") ||
    s.includes("रेस्टोरेंट")
  ) {
    answer.innerHTML = `
      <h4>🍴 Local Food</h4>

      <p>
        आपके आसपास restaurants और food places
        खोजने की सुविधा यहाँ होगी.
      </p>

      <div class="card">
        <b>📍 Nearby Food</b><br>
        Distance और rating के आधार पर options
      </div>
    `;
  }

  // Hotel
  else if (
    s.includes("hotel") ||
    s.includes("stay") ||
    s.includes("होटल")
  ) {
    answer.innerHTML = `
      <h4>🏨 Nearby Hotels</h4>

      <p>
        Nearby hotels को price, distance और rating
        के आधार पर compare किया जाएगा.
      </p>

      <div class="card">
        <b>🏨 Stay Finder</b><br>
        Budget और location के हिसाब से hotels
      </div>
    `;
  }

  // Generic response
  else {
    answer.innerHTML = `
      <h4>नमस्ते 👋</h4>

      <p>
        मैंने आपका सवाल समझने की कोशिश की.
        अभी Local India AI V1 demo mode में है.
      </p>

      <div class="card">
        <b>Try करें:</b><br><br>

        “Ara se Patna sabse sasta kaise jaaye?”<br><br>

        “Mujhe desk job chahiye”<br><br>

        “Nearby mechanic chahiye”
      </div>
    `;
  }
}


// Send button
send.onclick = () => {
  const text = q.value.trim();

  if (!text) {
    q.focus();
    return;
  }

  show(text);
};


// Enter key
q.onkeydown = (event) => {
  if (event.key === "Enter") {
    const text = q.value.trim();

    if (text) {
      show(text);
    }
  }
};


// Popular service buttons
document
  .querySelectorAll(".service-grid button")
  .forEach((button) => {

    button.onclick = () => {

      const text = button.dataset.q;

      if (!text) return;

      q.value = text;

      show(text);
    };

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

  recognition.interimResults = false;

  recognition.continuous = false;

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

    const transcript =
      event.results[0][0].transcript;

    q.value = transcript;

    show(transcript);
  };

  recognition.start();
};
