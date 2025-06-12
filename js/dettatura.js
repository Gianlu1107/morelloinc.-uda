

let recognition;
const micBtn = document.getElementById("startMic");
const outputField = document.getElementById("dreamText");
const statusText = document.getElementById("micStatus");

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'it-IT';
  recognition.interimResults = true;

  micBtn.addEventListener("click", () => {
    if (micBtn.classList.contains("listening")) {
      recognition.stop();
      micBtn.classList.remove("listening");
      statusText.textContent = "dettatura disattivata";
    } else {
      recognition.start();
      micBtn.classList.add("listening");
      statusText.textContent = "sto ascoltando...";
    }
  });

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    outputField.value = transcript;
  };

  recognition.onerror = (event) => {
    console.error("errore:", event.error);
    statusText.textContent = "errore nella dettatura";
  };

  recognition.onend = () => {
    micBtn.classList.remove("listening");
    statusText.textContent = "dettatura finita";
  };
} else {
  micBtn.disabled = true;
  statusText.textContent = "il tuo browser non supporta la dettatura vocale.";
}