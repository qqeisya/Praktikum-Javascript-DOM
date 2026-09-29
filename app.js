console.log("Bismillah Praktikum Dimulai");

//Aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karena "menangkap" atau ambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// 1. Mengambil elemen judul dan subjudul
// document.getElementById("...") mengambil berdasarkan atribut id.

const judulUtama = document.getElementById("judul-utama"); // menangkap: <h1 id ="judul-utama">

//document.querySelector("#...")
// Tanda # artinya ID

const subjudul = document.querySelector("#sub-judul"); // menangkap: <p id="sub-judul"

// 2. Mengambil element pada kartu 1 (kartu manipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil elemen - tombol aksi pada kartu 1
const BtnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById ("btn-toggle-warna");
const btnRiset = document.getElementById("btn-reset");

// 4. Mengambil element pada kartu ke 2 (Fiturr catatan dinamis / To Do list sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 Manipulasi teks & style (card 1)
// addEventListener("click", function() {...}) artinya adalah Tolong dengarkan dulu/tunggu
// sampai di klik user. jika di klik jalankan perintah didalam function

// A. Mengubah Teks & Warna secara langsung

BtnUbahTeks.addEventListener("click", function() {
    //.innertext = mengganti atau mengisi secara langsung teks yang ada didalam elemen html
    teksPreview.innerText = "Hebat! Teks ini berhasil di ubah pakai DOM!";

    //.style.color = mengubah warna teks secara langsung (inline style)
    teksPreview.style.color = "#8819d2";

    // console.log = mencetak pesan di console browser
    console.log("[DOM] Teks Preview telah di perbaharui!");
});

// B. Manipulasi Class CSS menggunakan classlist.toggle.()
btnToggleWarna.addEventListener("click", function() {
    // .classlist.toggle("nama-class") = fitur saklar otomatis (PN/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log('[DOM] Berhasil di switch!');
});

// C. Mengembalikan (Reset) Teks ke kondisi semula
btnRiset.addEventListener("click", function() {
    // 1. Kembalikan teks semula teks asli
    teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript!";

    // 2. Kosongkan kemali warna agar kembali ke warna css semula
    teksPreview.style.color = "";

    // 3. Hapus class khusus untuk menggunakan .classlist.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan di reset");
}); 

// Aktivitas 3 & 4 : Elemen Dinamis & Event Handling (To-DO List Sederhana)
// Di aktivitas ini jika kita belajar elemen HTML baru (<li>) secara otomatis dalam javascript
// mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)


// Langkah 1 : membuat variabel penampung angka junlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bsia berkurang (counting)
let totalCatatan = 0;

// Langkah 2 : Fungsi update angka counter & pesan status
function perbaruiJumlah() {
    // Masukkan angka total cattaan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;

    // condisional statement berupa apakah catatannya itu kosong/0?
    if (totalCatatan === 0) {
        // jika 0 : hapus class "hidden" supaya teks "belum ada cattaan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        //jika > 0 : tambahkan class "hiden" agar teks "belum ada cattan" tersembunyi
        pesanKosong.classList.add("hidden");
    }

}

//Langkah 3 : Fungsi utama dari logika tambah catatan baru
function tambahCatatan() {
    // 3.1 inputCatatan.value fungsinya untuk mengambil teks yang diketik oleh user
    // .trim() = menghapus spasi diawal dan diakhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi input : jika isi teks kosong maka tampilkan alert
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    // 3.3 document.createElement("li") -> membuat memori di javascript secara dinamis
    const liBaru = document.createElement("li");
    liBaru.className = "note-item";  // menambahkan pada tag li

    // 3.4 .innerHTML = mengisi struktur didalam <li> dengan teks catatan dan tombol hapus
    // Tanda backtick (`)
    liBaru.innerHTML = `<span>${isiTeks}<span> <button class="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga / Event Listener untuk tombol hapus pada catatan dinamis
    // liBaru.querySelector(".btn-hapus") = mengambil tombol ber class "btn-hapus" khusus yang ada di li
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        liBaru.remove();  // menghapus elemen list dari layar html
        totalCatatan--;  // totalCatatan dikurangi sebanyak 1x
        perbaruiJumlah(); // Panggil fungsi perbaruiJumlah untuk update angka di layar
        console.log(`Dom Catatan "${isiTeks}" dihapus.` );

    });

    // 3.6 appenChild = memasukkan elemen li kedalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
    inputCatatan.value = "";

    // 3.8 totalCatatan++ artinya tambah nilai total catatan sebanyak 1, lalu update angka ke layar 
    totalCatatan++;
    perbaruiJumlah();

    console.log(`Dom Catatan baru ditambahkan: ${isiTeks} `);
}

// Langkah 4 : Event Listener klik tombol + "Tambah"
// ketika tombol "+" tambah di kilik oleh user, maka jalankan fungsi tambah catatan()

btnTambah.addEventListener("click", function() {
    tambahCatatan();
})

//Langkah 5: Event Listener keyboard "Enter" pada kolom input 
// ketika user mengetik dikolom input dan melepas tombol keyboard (`Event keyup`)
inputCatatan.addEventListener("keyup", function (Event) {
    // periksa apakah tombol keyboard yang diteikan user adlaah enter?
    if (event.key === "Enter") {
        tambahCatatan();  // jika ya, jalankan fungsi tambahCatatan()
    }

});