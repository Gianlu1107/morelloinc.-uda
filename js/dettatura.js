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

    // se il testo contiene frasi separate logicamente, segmentale
    const chunks = text.split(/(?:(?:ma|perché|poi|allora|e)\s)/g);
    let result = chunks
      .map(chunk => {
        chunk = chunk.trim();
        if (!chunk) return "";

        // se è una domanda
        if (/come|perché|dove|quando|quanto|chi|cosa/.test(chunk.split(" ")[0])) {
          return chunk + "?";
        }

        // se è un'affermazione forte
        if (/^che bello|fantastico|incredibile|non ci credo/.test(chunk)) {
          return chunk + "!";
        }

        // frase normale
        return chunk + ".";
      })
      .join(" ");

    result = result.replace(/\s+/g, " ");
    result = result.replace(/\s([?.!])/g, "$1"); // rimuove spazi prima della punteggiatura
    return result + " ";
  }

  micBtn.addEventListener("click", () => {
    if (micBtn.classList.contains("listening")) {
      recognition.stop();
      micBtn.classList.remove("listening");
      micBtn.textContent = "🎙️ inizia dettatura";
      statusText.textContent = "dettatura disattivata";
    } else {
      recognition.start();
      micBtn.classList.add("listening");
      micBtn.textContent = "🛑 stoppa dettatura";
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