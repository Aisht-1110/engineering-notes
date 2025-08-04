document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the books page by looking for the search input
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        return; // Exit if this is not the books page
    }

    const booksGrid = document.getElementById('booksGrid');
    // UPDATE: Select the new container for each subject card
    const subjectItems = booksGrid.querySelectorAll('.subject-item-container');
    const noResultsMessage = document.getElementById('noResults');

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleItems = 0;

        // Loop through each subject card's container
        subjectItems.forEach(item => {
            // UPDATE: Find the subject name within the new card structure
            const titleElement = item.querySelector('.subject-name');

            // Ensure the title element exists before trying to read it
            if (titleElement) {
                const title = titleElement.textContent.toLowerCase();

                // Check if the subject title includes the search term
                if (title.includes(searchTerm)) {
                    // Show the item. 'flex' is its default display style in the new CSS.
                    item.style.display = 'flex';
                    visibleItems++;
                } else {
                    // Hide the item
                    item.style.display = 'none';
                }
            }
        });

        // Show or hide the "no results" message
        // This logic remains the same and is correct.
        if (visibleItems === 0 && searchTerm !== '') {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    });
});