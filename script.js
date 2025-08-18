// feedback.js

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------
    // Subject-card buttons
    // -------------------------------
    const buttons = document.querySelectorAll('.subject-card button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Redirecting to notes...');
            // TODO: Add redirect functionality here
        });
    });

    // -------------------------------
    // Feedback form functionality
    // -------------------------------
    const FEEDBACK_ENDPOINT = "https://script.google.com/macros/s/AKfycbyKdzXTn1OQ0O8wx2jrUVr41Sny3ZG4Mn-plQchayLfjt8BrId42gyKzKWKy3_UB5z3/exec";
    
    const feedbackBtn = document.getElementById("feedbackBtn");
    const feedbackPopup = document.getElementById("feedbackPopup");
    const closePopup = document.getElementById("closePopup");
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackResponse = document.getElementById("feedbackResponse");

    // Open popup when button clicked
    if (feedbackBtn) {
        feedbackBtn.onclick = () => {
            if (feedbackPopup) {
                feedbackPopup.style.display = "block";
            }
        };
    }

    // Close popup
    if (closePopup) {
        closePopup.onclick = () => {
            if (feedbackPopup) {
                feedbackPopup.style.display = "none";
            }
        };
    }

    // Handle form submission
    if (feedbackForm) {
        feedbackForm.onsubmit = async (e) => {
            e.preventDefault();

            let message = document.getElementById("message").value.trim();
            let email = document.getElementById("email").value.trim();

            // ✅ Validation
            if (!message) {
                if (feedbackResponse) feedbackResponse.innerText = "⚠️ Please enter your feedback.";
                return;
            }
            if (!email) {
                if (feedbackResponse) feedbackResponse.innerText = "⚠️ Please enter your email.";
                return;
            }

            if (feedbackResponse) feedbackResponse.innerText = "Submitting...";

            try {
                let res = await fetch(FEEDBACK_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        feedback: message,
                        email: email,
                        page: window.location.href,
                        ua: navigator.userAgent
                    })
                });

                let data = await res.json();

                if (data.ok) {
                    if (feedbackResponse) feedbackResponse.innerText = "✅ Thank you for your feedback!";
                    feedbackForm.reset();
                } else {
                    if (feedbackResponse) feedbackResponse.innerText = "❌ Error: " + (data.error || "Unknown error");
                }
            } catch (err) {
                if (feedbackResponse) feedbackResponse.innerText = "❌ Error submitting feedback!";
            }
        };
    }
});
