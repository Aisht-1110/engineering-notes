document.addEventListener('DOMContentLoaded', () => {
    // Your original code
    const buttons = document.querySelectorAll('.subject-card button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Redirecting to notes...');
            // Here you can add functionality to redirect to the notes page
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
    // Paste all of your JavaScript code here
    
    const FEEDBACK_ENDPOINT = "https://script.google.com/macros/s/AKfycbyKdzXTn1OQ0O8wx2jrUVr41Sny3ZG4Mn-plQchayLfjt8BrId42gyKzKWKy3_UB5z3/exec";
    
    // Check if the feedback elements exist before trying to attach listeners
    const feedbackBtn = document.getElementById("feedbackBtn");
    const feedbackPopup = document.getElementById("feedbackPopup");
    const closePopup = document.getElementById("closePopup");
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackResponse = document.getElementById("feedbackResponse");
    
    if (feedbackBtn) {
        // Open popup
        feedbackBtn.onclick = () => {
            if (feedbackPopup) {
                feedbackPopup.style.display = "block";
            }
        };
    }
    
    if (closePopup) {
        // Close popup
        closePopup.onclick = () => {
            if (feedbackPopup) {
                feedbackPopup.style.display = "none";
            }
        };
    }
    
    if (feedbackForm) {
        // Submit feedback form
        feedbackForm.onsubmit = async (e) => {
            e.preventDefault();
    
            let message = document.getElementById("message").value;
            let email = document.getElementById("email").value;
    
            if (feedbackResponse) {
                feedbackResponse.innerText = "Submitting...";
            }
    
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
                    if (feedbackResponse) {
                        feedbackResponse.innerText = "✅ Thank you for your feedback!";
                    }
                    feedbackForm.reset();
                } else {
                    if (feedbackResponse) {
                        feedbackResponse.innerText = "❌ Error: " + (data.error || "Unknown error");
                    }
                }
            } catch (err) {
                if (feedbackResponse) {
                    feedbackResponse.innerText = "❌ Error submitting feedback!";
                }
            }
        };
    }
});
