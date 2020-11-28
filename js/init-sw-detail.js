// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/sw.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");

    const btnSave = document.getElementById("save");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        // ambil match lalu tampilkan
        getSavedMatchById();
    } else {
        const item = getMatchById();
        btnSave.onclick = function () {
            console.log("Tombol FAB di klik.");
            item.then(function (match) {
                saveForLater(match);
            });
        }
    }

});

function back() {
    window.history.back();
}