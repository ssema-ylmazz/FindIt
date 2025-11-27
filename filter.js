document.addEventListener("DOMContentLoaded", () => {

    const filterBtn = document.getElementById("applyFilter");
    const filterCityInput = document.getElementById("filterCity");
    const filterCategorySelect = document.getElementById("filterCategory");
    const container = document.getElementById("filterContainer");

    // LocalStorage’dan ilanları al
    let ilanlar = JSON.parse(localStorage.getItem("ilanlar") || "[]");

    // Tüm ilanları başta göster
    renderIlanlar(ilanlar);

    filterBtn.addEventListener("click", () => {
        const filterCity = filterCityInput.value.toLowerCase();
        const filterCategory = filterCategorySelect.value;

        const filtered = ilanlar.filter(ilan => {
            const cityMatch = filterCity ? ilan.city.toLowerCase().includes(filterCity) : true;
            const categoryMatch = filterCategory ? ilan.category === filterCategory : true;
            return cityMatch && categoryMatch;
        });

        renderIlanlar(filtered);
    });

    function renderIlanlar(list) {
        container.innerHTML = "";
        if (list.length === 0) {
            container.innerHTML = "<p>Hiç ilan bulunamadı.</p>";
            return;
        }
        list.forEach(ilan => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h3>${ilan.title}</h3>
                <p><strong>Şehir:</strong> ${ilan.city}</p>
                <p><strong>Kategori:</strong> ${ilan.category}</p>
                <p>${ilan.description}</p>
            `;
            container.appendChild(card);
        });
    }

});
