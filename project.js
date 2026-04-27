document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    const successMsg = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Form hide
        form.style.display = "none";

        // Navbar hide (optional)
        document.querySelector("nav").style.display = "none";

        // Show success message
        successMsg.style.display = "flex";
    });

});