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
        const nama = item["Nama Member"]?.toLowerCase();
        const paket = item["Nama Paket"]?.toUpperCase();
        return nama === nameInput && paket === packageInput;
      });

      loadingElement.style.display = "none";

      if (peserta) {
        resultElement.innerHTML = `
          <p><strong>Nama:</strong> ${peserta["Nama Member"]}</p>
          <p><strong>No. JPKM:</strong> ${peserta["No JPKM"]}</p>
          <p><strong>Nama Grup:</strong> ${peserta["Nama Grup"]}</p>
          <p><strong>Tipe Grup:</strong> ${peserta["Tipe Grup"]}</p>
          <p><strong>PPK Basis:</strong> ${peserta["PPKBasis"]}</p>
          <p><strong>Klinik Layanan:</strong> ${peserta["Klinik Layanan"]}</p>
          <p><strong>Status:</strong> ${peserta["Status "]}</p>
          <p><strong>Nama Paket:</strong> ${peserta["Nama Paket"]}</p>
          <p><strong>Paket Tambahan:</strong> ${peserta["Paket Tambahan"]}</p>
          <p><strong>Tanggal Akhir Kontrak:</strong> ${peserta["Tanggal Akhir Kontrak"]}</p>
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
