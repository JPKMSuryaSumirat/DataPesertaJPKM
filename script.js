window.addEventListener("DOMContentLoaded", function () {
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

    fetch("https://raw.githubusercontent.com/JPKMSuryaSumirat/DataPesertaJPKM/main/Peserta%20JPKM%20s.d%2010%20Juni%202025%20New.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Data JSON:", data);
        console.log("Input:", nameInput, packageInput);

        const peserta = data.find((item) => {
          const namaPeserta = item["Nama Member"]?.trim().toLowerCase();
          const jenisPaket = item["Nama Paket"]?.trim().toUpperCase();
          return namaPeserta === nameInput && jenisPaket === packageInput;
        });

        loadingElement.style.display = "none";

        if (peserta) {
          resultElement.innerHTML = `
            <p><strong>Nama:</strong> ${peserta["Nama Member"]}</p>
            <p><strong>No. JPKM:</strong> ${peserta["No JPKM"]}</p>
            <p><strong>Nama Grup:</strong> ${peserta["Nama Grup"]}</p>
            <p><strong>Status:</strong> ${peserta["Status "]}</p>
            <p><strong>Paket:</strong> ${peserta["Nama Paket"]}</p>
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
        console.error("Fetch error or parsing error:", error);
      });
  });
});
