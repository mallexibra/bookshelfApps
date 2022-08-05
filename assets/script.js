// Section - Masukkan data buku;
let inputJudul = document.getElementById("judul");
let inputPenulis = document.getElementById("penulis");
let inputTahun = document.getElementById("tahun");
let checkbox = document.getElementById("done");
let submitInput = document.getElementById("submitInput");

// Section - Cari Buku;
let cariBuku = document.getElementById("search-buku");
let submitCariBuku = document.getElementById("cariBuku");

// Section - Belum Selesai Dibaca;
let articleBelumDibaca = document.querySelector(".belum-dibaca");
let judulBelumDibaca = document.querySelector(".belum-dibaca h3");
let penulis = document.querySelectorAll("#penulisBelumDibaca");

// Section - Sudah selesai dibaca;
let articleSudahDIbaca = document.querySelector(".sudah-dibaca");
let judulSudahDibaca = document.querySelector(".sudah-dibaca h3");
let penulisSudahDibaca = document.querySelectorAll("#penulisSudahDibaca");
let tahunSudahDibaca = document.querySelector(".sudah-dibaca .tahun");

let setDefault = document.getElementById("setDefault");

setDefault.addEventListener("click", (e) => {
  let konfirmasi = confirm("Apakah anda yakin akan mereset data anda di website ini?");
  if (konfirmasi === true) {
    localStorage.clear();
  }
});

let nilaiDefault = localStorage.getItem("NILAI_BUKU");

if (!nilaiDefault) {
  localStorage.setItem("NILAI_BUKU", "[]");
}
const storageKey = "NILAI_BUKU";

submitInput.addEventListener("click", (e) => {
  let storageKey = "NILAI_BUKU";
  let nilai = JSON.parse(localStorage.getItem(storageKey));

  let inputUser = {
    judul: inputJudul.value,
    penulis: inputPenulis.value,
    tahun: inputTahun.value,
    checked: checkbox.checked,
  };

  ambilData(inputUser);
});

function ambilData(inputUser) {
  let userData = [];

  let getItem = localStorage.getItem(storageKey);
  if (getItem !== null) {
    userData = JSON.parse(getItem);
  }
  userData.unshift(inputUser);

  localStorage.setItem(storageKey, JSON.stringify(userData));
}

let userDataHasil = JSON.parse(localStorage.getItem("NILAI_BUKU"));

for (let i of userDataHasil) {
  if (i !== undefined && i !== null) {
    if (i.checked) {
      articleSudahDIbaca.innerHTML += `<article>
      <h3>${i.judul}</h3>
      <p>
        <span id="penulisSudahDibaca">${i.penulis}</span>
        <span class="tahun">${i.tahun}</span>
      </p>
      <form action="">
      <button type="submit" id="belum">Belum</button>
      <button type="submit" id="hapus">Hapus</button>
      </form>
    </article>`;
    } else {
      articleBelumDibaca.innerHTML += `<article>
      <h3>${i.judul}</h3>
      <p>
        <span id="penulisBelumDibaca">${i.penulis}</span>
        <span class="tahun">${i.tahun}</span>
      </p>
      <form action="">
      <button type="submit" id="selesai">Selesai</button>
      <button type="submit" id="hapus">Hapus</button>
      </form>
    </article>`;
    }
  }
}

let tahun = document.querySelector(".tahun");
let selesai = document.querySelectorAll("#selesai");
let belum = document.querySelectorAll("#belum");
let hapus = document.querySelectorAll("#hapus");
// let hapus2 = document.querySelector("#hapus2");

for (let j = 0; j < hapus.length; j++) {
  hapus[j].addEventListener("click", function (e) {
    let konfirmasi = confirm("Anda yakin akan menghapus elemen ini?");
    if (konfirmasi) {
      const storageKey = "NILAI_BUKU";
      userDataHasil.splice(j, 1);
      localStorage.setItem(storageKey, JSON.stringify(userDataHasil));
      e.target.parentElement.parentElement.remove();
    }
    // e.preventDefault();
    // console.log(hapus[j].parentElement);
  });
}

for (let l = 0; l < selesai.length; l++) {
  selesai[l].addEventListener("click", function (e) {
    userDataHasil[l].checked = true;
    const storageKey = "NILAI_BUKU";
    localStorage.setItem(storageKey, JSON.stringify(userDataHasil));
    // e.target.parentElement.remove();
    // console.log(selesai[j].parentElement);
  });
}

for (let c = 0; c < belum.length; c++) {
  belum[c].addEventListener("click", function (e) {
    userDataHasil[c].checked = false;
    const storageKey = "NILAI_BUKU";
    localStorage.setItem(storageKey, JSON.stringify(userDataHasil));
    // e.target.parentElement.remove();
    // console.log(selesai[j].parentElement);
  });
}

let article = document.getElementsByTagName("article");

submitCariBuku.addEventListener("click", (e) => {
  let input = cariBuku.value;
  const storageKey = "NILAI_BUKU";
  let item = JSON.parse(localStorage.getItem(storageKey));
  for (let y = 0; y < item.length; y++) {
    if (item[y].judul.toUpperCase() == input.toUpperCase()) {
      article[y].classList.add("green");
    } else {
      article[y].classList.remove("green");
    }
  }
  e.preventDefault();
});

// Theme Mode;
let toggleMenu = document.querySelector(".mode-toggle");
let iconTheme = document.querySelector("#iconTheme");
let tema = localStorage.getItem("tema");

if (!tema) {
  localStorage.setItem("tema", "light");
}

function darkMode() {
  localStorage.setItem("tema", "dark");
  iconTheme.setAttribute("src", "assets/img/brightness.png");
  document.body.classList.add("buat-body");
}

function lightMode() {
  localStorage.setItem("tema", "light");
  iconTheme.setAttribute("src", "assets/img/moon.png");
  document.body.classList.remove("buat-body");
}

if (tema == "dark") {
  darkMode();
}

toggleMenu.addEventListener("click", (e) => {
  if (tema == "light") {
    darkMode();
  } else {
    lightMode();
  }
});
