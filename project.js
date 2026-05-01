document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerText = "Submitting...";

        const formData = new FormData(form);
        // Added the Access Key from Web3Forms
        formData.append("access_key", "04bc14c3-f045-4028-839b-0c1003a5bda4");

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    submitBtn.innerText = originalBtnText;


                    document.querySelectorAll('body > *:not(#successMessage)').forEach(function (el) {
                        el.style.display = 'none';
                    });
                    successMessage.style.display = "block";
                    form.reset();
                } else {
                    console.log(response);
                    submitBtn.innerText = originalBtnText;
                    alert('Oops! Something went wrong: ' + json.message);
                }
            })
            .catch((error) => {
                console.log(error);
                submitBtn.innerText = originalBtnText;
                alert('Something went wrong!');
            });
    });

    const goHomeBtn = document.getElementById("goHomeBtn");
    if (goHomeBtn) {
        goHomeBtn.addEventListener("click", function () {
            successMessage.style.display = "none";
            document.querySelectorAll('body > *:not(#successMessage)').forEach(function (el) {
                el.style.display = '';
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
function showPopup() {
    document.getElementById("successPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("successPopup").style.display = "none";
}


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