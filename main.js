// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFk9y7h6kDSX3DtHurqq_YqQeS976m4yY",
  authDomain: "findit-82a86.firebaseapp.com",
  projectId: "findit-82a86",
  storageBucket: "findit-82a86.firebasestorage.app",
  messagingSenderId: "361351119734",
  appId: "1:361351119734:web:f7298e23cfcbca49573057",
  measurementId: "G-XQG74GKGQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener("DOMContentLoaded", () => {

    const ilanContainer = document.getElementById("ilanContainer");

    // LocalStorage'dan ilanları al
    let ilanlar = JSON.parse(localStorage.getItem("ilanlar") || "[]");

    // Eğer LocalStorage boşsa örnek ilanları ekle
    if(ilanlar.length === 0){
        ilanlar = [
            {
                title: "Kaybolan Cüzdan",
                city: "Ankara",
                category: "cüzdan",
                description: "Siyah deri cüzdan, içinde kimlik var.",
                type: "kayip"
            },
            {
                title: "Bulunan Telefon",
                city: "İzmir",
                category: "telefon",
                description: "Siyah iPhone, ekran koruyucu var.",
                type: "bulunan"
            },
            {
                title: "Kaybolan Anahtar",
                city: "İstanbul",
                category: "anahtar",
                description: "Ev anahtarı, kırmızı ipli anahtarlık.",
                type: "kayip"
            }
        ];
        localStorage.setItem("ilanlar", JSON.stringify(ilanlar));
    }

    // İlanları ekrana bas
    renderIlanlar(ilanlar);

    function renderIlanlar(list){
        ilanContainer.innerHTML = "";
        list.forEach(ilan => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${ilan.title}</h3>
                <p><strong>Şehir:</strong> ${ilan.city}</p>
                <p><strong>Kategori:</strong> ${ilan.category}</p>
                <p>${ilan.description}</p>
                <span class="category ${ilan.category}">${ilan.category}</span>
            `;
            ilanContainer.appendChild(card);
        });
    }

    // --- Kayıp ilan formu ---
    const lostForm = document.getElementById("lostForm");
    if(lostForm){
        lostForm.addEventListener("submit", e => {
            e.preventDefault();

            const title = document.getElementById("title").value.trim();
            const city = document.getElementById("city").value.trim();
            const category = document.getElementById("category").value;
            const description = document.getElementById("description").value.trim();

            if(!title || !city || !category || !description){
                alert("Tüm alanları doldurun!");
                return;
            }

            ilanlar.push({title, city, category, description, type:"kayip"});
            localStorage.setItem("ilanlar", JSON.stringify(ilanlar));

            lostForm.reset();
            window.location.href = "index.html";
        });
    }

    // --- Bulunan ilan formu ---
    const foundForm = document.getElementById("foundForm");
    if(foundForm){
        foundForm.addEventListener("submit", e => {
            e.preventDefault();

            const title = document.getElementById("foundTitle").value.trim();
            const city = document.getElementById("foundCity").value.trim();
            const category = document.getElementById("foundCategory").value;
            const description = document.getElementById("foundDescription").value.trim();

            if(!title || !city || !category || !description){
                alert("Tüm alanları doldurun!");
                return;
            }

            ilanlar.push({title, city, category, description, type:"bulunan"});
            localStorage.setItem("ilanlar", JSON.stringify(ilanlar));

            foundForm.reset();
            window.location.href = "index.html";
        });
    }

});
