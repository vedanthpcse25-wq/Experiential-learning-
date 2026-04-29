document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Hide all top-level page content except the success message
        document.querySelectorAll('body > *:not(#successMessage)').forEach(function (el) {
            el.style.display = 'none';
        });
        successMessage.style.display = "block";
    });

});
function showPopup() {
    document.getElementById("successPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("successPopup").style.display = "none";
}

// Navigation handlers: scroll to sections within the same page
document.addEventListener("DOMContentLoaded", function () {
    const navHome = document.getElementById("navHome");
    const navAbout = document.getElementById("navAbout");
    const navContact = document.getElementById("navContact");
    const mainNav = document.getElementById("mainNav");

    function scrollToId(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (mainNav && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
    }

    if (navHome) navHome.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToId('home');
    });

    if (navAbout) navAbout.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToId('about');
    });

    if (navContact) navContact.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToId('contact');
    });
});