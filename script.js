function format(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

document.querySelectorAll(".rupiah").forEach(input => {
    input.addEventListener("input", function () {
        let angka = this.value.replace(/[^0-9]/g, "");
        this.value = angka ? format(parseInt(angka)) : "";
    });
});

function pindah(id) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.add("hidden");
        p.classList.remove("show");
    });

    document.getElementById(id).classList.remove("hidden");
    document.getElementById(id).classList.add("show");
}

// NAVIGASI
document.getElementById("btnMasuk").onclick = () => pindah("home");

// 🔥 TARIF SEKARANG JADI TAMBAH
document.getElementById("btnTarif").onclick = () => pindah("tambah");

document.getElementById("btnKembali").onclick = () => pindah("home");

// SIMPAN
document.getElementById("btnSimpan").onclick = function () {

    let pengiriman = parseInt(document.getElementById("pengiriman").value.replace(/[^0-9]/g, "")) || 0;
    let prioritas = parseInt(document.getElementById("prioritas").value.replace(/[^0-9]/g, "")) || 0;
    let ppn = parseInt(document.getElementById("ppn").value.replace(/[^0-9]/g, "")) || 0;
    let komisi = parseInt(document.getElementById("komisi").value.replace(/[^0-9]/g, "")) || 0;

    localStorage.setItem("pengiriman", pengiriman);
    localStorage.setItem("prioritas", prioritas);
    localStorage.setItem("ppn", ppn);
    localStorage.setItem("komisi", komisi);

    pindah("home");
    loadData();
};

// LOAD
function loadData() {
    let pengiriman = parseInt(localStorage.getItem("pengiriman")) || 0;
    let prioritas = parseInt(localStorage.getItem("prioritas")) || 0;
    let ppn = parseInt(localStorage.getItem("ppn")) || 0;
    let komisi = parseInt(localStorage.getItem("komisi")) || 0;

    let tunai = pengiriman + prioritas + ppn;
    let total = tunai - komisi;

    document.getElementById("tunai").innerText = format(tunai);
    document.getElementById("total").innerText = format(total);

    document.getElementById("pengirimanText").innerText = format(pengiriman);
    document.getElementById("prioritasText").innerText = format(prioritas);
    document.getElementById("ppnText").innerText = format(ppn);
    document.getElementById("komisiText").innerText = "-" + format(komisi);
}

window.onload = loadData;