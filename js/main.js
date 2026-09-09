document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("form-alert");
    const submitBtn = document.getElementById("submitBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Client-side HTML5 validation check
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
                contactForm.classList.add("was-validated");
                return;
            }

            // Disable button and show spinner
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...`;

            const formData = new FormData(contactForm);

            fetch("send_email.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    formAlert.innerHTML = `<div class="alert alert-success border-0 shadow-sm mb-4">${data.message}</div>`;
                    contactForm.reset();
                    contactForm.classList.remove("was-validated");
                } else {
                    formAlert.innerHTML = `<div class="alert alert-danger border-0 shadow-sm mb-4">${data.message}</div>`;
                }
            })
            .catch(() => {
                formAlert.innerHTML = `<div class="alert alert-danger border-0 shadow-sm mb-4">An error occurred while sending your message. Please try again later.</div>`;
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span>`;
            });
        });
    }
});
