// feedback.js (feedback code removed)

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
});
