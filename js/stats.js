// stats.js
document.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById('dreamChart');

  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');

  fetch('php/stats.php')
    .then(response => response.json())
    .then(data => {
      if (!data || !data.months || !data.counts) {
        console.error("Dati del grafico non validi");
        return;
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.months,
          datasets: [{
            label: 'Numero di sogni registrati',
            data: data.counts,
            fill: true,
            borderColor: 'rgba(0, 150, 255, 0.9)',
            backgroundColor: 'rgba(0, 150, 255, 0.2)',
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#0090ff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Statistiche sogni negli ultimi mesi',
              font: {
                size: 18
              }
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    })
    .catch(err => {
      console.error("Errore nel caricamento dei dati per il grafico:", err);
    });
});