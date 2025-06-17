document.getElementById("identity-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name").value.trim().toLowerCase();
  const packageInput = document.getElementById("package").value.trim().toUpperCase();

  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";

  fetch('https://cdn.glitch.global/faaa3442-55cd-4c89-95bc-b8e71ed96f86/Peserta%20JPKM%20s.d%2010%20Juni%202025%20New.json?v=1749697886549')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const pesertaData = data["Sheet1"];
      let peserta;

      if (packageInput === "SISWA") {
        peserta = pesertaData.find(item =>
          item["Nama Member"].toLowerCase() === nameInput &&
          item["Nama Paket"].toUpperCase() === "SISWA"
        );
      } else if (packageInput === "GURU") {
        peserta = pesertaData.find(item =>
          item["Nama Member"].toLowerCase() === nameInput &&
          item["Nama Paket"].toUpperCase() === "GURU"
        );
      }

      loadingElement.style.display = "none";

      const resultContainer = document.getElementById("result-container");
      resultContainer.innerHTML = "";

      if (peserta) {
        const card = document.createElement("div");
        card.id = "card";
        card.innerHTML = `
          <h2>${peserta["Nama Member"]}</h2>
          <p><strong>No. Peserta:</strong> ${peserta["No. Peserta"]}</p>
          <p><strong>Tanggal Lahir:</strong> ${peserta["Tgl Lahir"]}</p>
          <p><strong>Nama Paket:</strong> ${peserta["Nama Paket"]}</p>
          <button onclick="unduhPDF()">Unduh Kartu PDF</button>
        `;
        resultContainer.appendChild(card);
      } else {
        resultContainer.innerHTML = "<p style='color:red;'>Data tidak ditemukan.</p>";
      }
    })
    .catch(error => {
      loadingElement.style.display = "none";
      console.error("Fetch error:", error);
      alert("Terjadi kesalahan saat mengambil data.");
    });
});

function unduhPDF() {
  const element = document.getElementById("card");
  const opt = {
    margin: 0.5,
    filename: 'kartu_peserta_jpkm.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
