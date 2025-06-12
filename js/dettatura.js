let recognition;
const micBtn = document.getElementById("startMic");
const outputField = document.getElementById("dreamText");
const statusText = document.getElementById("micStatus");

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'it-IT';
  recognition.interimResults = true;

  function formatTranscript(text) {
    text = text.trim().toLowerCase();

    if (!/[.?!]$/.test(text) && text.split(" ").length > 6) {
      text += ".";
    }

    text = text.replace(/\s*,\s*/g, ", ");
    text = text.replace(/\s*\.\s*/g, "."); // niente spazio prima del punto
    text = text.replace(/([a-z])\.(?=[^\s])/g, "$1. "); // assicura che ci sia uno spazio DOPO il punto se manca
    text = text.replace(/\s+/g, " ");

    return text + " ";
  }

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
    let transcript = event.results[event.resultIndex][0].transcript;
    if (event.results[event.resultIndex].isFinal) {
      outputField.value += formatTranscript(transcript);
    }
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