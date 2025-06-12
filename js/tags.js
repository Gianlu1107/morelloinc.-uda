// tags.js
document.addEventListener("DOMContentLoaded", () => {
  const tagContainer = document.getElementById("tagCloud");

  if (!tagContainer) return;

  fetch("php/tags.php")
    .then((res) => res.json())
    .then((tags) => {
      if (!tags || Object.keys(tags).length === 0) {
        tagContainer.innerHTML = "<p>nessun tag trovato</p>";
        return;
      }

      // calcolo dimensioni in base alla frequenza
      const maxFreq = Math.max(...Object.values(tags));
      const minFreq = Math.min(...Object.values(tags));
      const scale = (freq) => {
        // da 0.8rem a 2.5rem
        return (
          0.8 + ((freq - minFreq) / (maxFreq - minFreq || 1)) * (2.5 - 0.8)
        );
      };

      tagContainer.innerHTML = "";

      Object.entries(tags).forEach(([tag, freq]) => {
        const tagSpan = document.createElement("span");
        tagSpan.classList.add("tag-item");
        tagSpan.style.fontSize = `${scale(freq)}rem`;
        tagSpan.textContent = tag;

        // comportamento clickabile (opzionale)
        tagSpan.addEventListener("click", () => {
          window.location.href = `search.php?tag=${encodeURIComponent(tag)}`;
        });

        tagContainer.appendChild(tagSpan);
      });
    })
    .catch((err) => {
      console.error("errore nel caricamento dei tag:", err);
      tagContainer.innerHTML = "<p>errore nel caricamento dei tag</p>";
    });
});