document.getElementById("identity-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name").value.trim().toLowerCase();
  const packageInput = document.getElementById("package").value.trim().toUpperCase();

  const loadingElement = document.getElementById("loading");
  const resultElement = document.getElementById("result");
  const notFoundElement = document.getElementById("not-found");

  loadingElement.style.display = "block";
  resultElement.style.display = "none";
  notFoundElement.style.display = "none";

  fetch("Peserta%20JPKM%20s.d%2010%20Juni%202025%20New.json")
    .then((response) => response.json())
    .then((data) => {
      const peserta = data.find((item) => {
        const namaPeserta = item["NAMA PESERTA"]?.toLowerCase();
        const jenisPaket = item["JENIS PAKET"]?.toUpperCase();
        return namaPeserta === nameInput && jenisPaket === packageInput;
      });

      loadingElement.style.display = "none";

      if (peserta) {
        resultElement.innerHTML = `
          <p><strong>Nama:</strong> ${peserta["NAMA PESERTA"]}</p>
          <p><strong>No. Peserta:</strong> ${peserta["NO JPKM"]}</p>
          <p><strong>Jenis Paket:</strong> ${peserta["JENIS PAKET"]}</p>
          <a href="${peserta["LINK KARTU"]}" download class="download-button">Unduh Kartu PDF</a>
        `;
        resultElement.style.display = "block";
      } else {
        notFoundElement.style.display = "block";
      }
    })
    .catch((error) => {
      loadingElement.style.display = "none";
      notFoundElement.style.display = "block";
      console.error("Terjadi kesalahan:", error);
    });
});
