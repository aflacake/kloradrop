// tentang.js

const navbar = document.getElementById('navbar');

function checkNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('show');
    } else {
        navbar.classList.remove('show');
    }
}

// Reset progres
const resetBtn = document.getElementById("reset-data");

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        if (confirm("Yakin ingin menghapus semua data minum?")) {
            localStorage.removeItem("daily_drink");
            localStorage.removeItem("weekly_drink");
            localStorage.removeItem("next_drink_time");
            alert("Data berhasil dihapus!");
            location.reload();
        }
    });
}

// Tombol install PWA
let deferredPrompt;
const installBtn = document.getElementById("install-kloradrop");

installBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "inline-block";
});

installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    deferredPrompt = null;
});

window.addEventListener('scroll', checkNavbar);
checkNavbar();

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("fade-out");
    }, 500);
});

// Ekspor data
const exportBtn = document.getElementById("export-data");
if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        const data = {
            daily: localStorage.getItem("daily_drink") || 0,
            weekly: localStorage.getItem("weekly_drink") || 0,
            saved_date: localStorage.getItem("last_date") || "Belum ada",
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download = "kloradrop_data.json";
        a.click();

        URL.revokeObjectURL(url);
    });
}

// Tombol impor
document.getElementById("import-data").addEventListener("click", () => {
    document.getElementById("import-file").click();
});

// Impor
document.getElementById("import-file").addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const importedData = JSON.parse(event.target.result);

            if (!importedData || typeof importedData !== "object") {
                alert("Format data tidak valid!");
                return;
            }

            localStorage.setItem("kloraDropData", JSON.stringify(importedData));

            alert("Data berhasil diimpor!");
            location.reload();
        } catch (error) {
            alert("Gagal membaca file. Pastikan file yang diunggah benar.");
        }
    };

    reader.readAsText(file);
});
