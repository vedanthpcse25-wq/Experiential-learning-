document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = "Submit"; // Saving original text
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


                    const feedbackData = {
                        name: formData.get("first_name") + " " + formData.get("last_name"),
                        email: formData.get("user_email"),
                        studentId: formData.get("student_id"),
                        message: formData.get("message"),
                        date: new Date().toLocaleDateString()
                    };
                    let history = JSON.parse(sessionStorage.getItem("feedbackHistory")) || [];
                    history.push(feedbackData);
                    sessionStorage.setItem("feedbackHistory", JSON.stringify(history));
                    loadHistory(); // Refresh history display

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
function loadHistory() {
    const container = document.getElementById("historyContainer");
    if (!container) return;

    let history = JSON.parse(sessionStorage.getItem("feedbackHistory")) || [];

    if (history.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No feedback submitted yet.</p>';
        return;
    }

    let html = "";
    history.slice().reverse().forEach((item) => {
        html += `
        <div class="col-md-6 mb-3">
            <div class="card shadow-sm border-warning">
                <div class="card-body">
                    <h5 class="card-title text-primary">${item.name} <small class="text-muted" style="font-size:12px;">(${item.date})</small></h5>
                    <h6 class="card-subtitle mb-2 text-muted">ID: ${item.studentId} | Email: ${item.email}</h6>
                    <p class="card-text"><i>"${item.message}"</i></p>
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

// Load history initially
document.addEventListener("DOMContentLoaded", loadHistory);


document.addEventListener("DOMContentLoaded", function () {
    const navHome = document.getElementById("navHome");
    const navAbout = document.getElementById("navAbout");
    const navContact = document.getElementById("navContact");
    const navHistory = document.getElementById("navHistory");
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

    if (navHistory) navHistory.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToId('historySection');
    });
});