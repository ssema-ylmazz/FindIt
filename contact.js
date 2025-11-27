document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        // Basit olarak LocalStorage'a kaydedebiliriz veya sadece alert gösterebiliriz
        alert("Mesajınız alındı! Teşekkürler.");
        form.reset();
    });
});
