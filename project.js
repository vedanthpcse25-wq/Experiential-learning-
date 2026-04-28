document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        form.style.display = "none";
        successMessage.style.display = "block";
    });

});
function showPopup() {
    document.getElementById("successPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("successPopup").style.display = "none";
}