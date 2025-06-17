window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("identity-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nojpkmInput = document.getElementById("nojpkm").value.trim().toUpperCase();
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
      .then((jsonData) => {
        const data = jsonData["Sheet1"];
        const peserta = data.find((item) => {
          const noMatch = nojpkmInput && item["No JPKM"]?.toUpperCase() === nojpkmInput;
          const namaMatch = nameInput && item["Nama Member"]?.toLowerCase() === nameInput;
          const paketMatch = packageInput && item["Nama Paket"]?.toUpperCase() === packageInput;

          return (
            (nojpkmInput && noMatch) ||
            (nameInput && paketMatch && namaMatch)
          );
        });

        loadingElement.style.display = "none";

        if (peserta) {
          resultElement.innerHTML = `
            <p><strong>Nama:</strong> ${peserta["Nama Member"]}</p>
            <p><strong>Tanggal Lahir:</strong> ${peserta["Tanggal Lahir"]}</p>
            <p><strong>Nama Grup:</strong> ${peserta["Nama Grup"]}</p>
            <p><strong>PPK Basis:</strong> ${peserta["PPKBasis"]}</p>
            <p><strong>Klinik Layanan:</strong> ${peserta["Klinik Layanan"]}</p>
            <p><strong>Tanggal Masuk:</strong> ${peserta["Tanggal Masuk"]}</p>
            <p><strong>Tanggal Akhir Kontrak:</strong> ${peserta["Tanggal Akhir Kontrak"]}</p>
            <p><strong>Nama Paket:</strong> ${peserta["Nama Paket"]}</p>
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
});
