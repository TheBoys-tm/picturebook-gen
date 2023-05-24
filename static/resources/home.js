document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const promptText = document.getElementById('prompt-text');
    const imageBox = document.getElementById('image-box');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const pagesContainer = document.getElementById('pages-container');

    let pages = [];
    let currentPageIndex = 0;

    submitButton.addEventListener('click', () => {
        const prompt = promptText.value.trim();
        if (prompt !== '') {
            // Send the prompt to the API endpoint
            sendPrompt(prompt);
        }
    });

    leftButton.addEventListener('click', () => {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            updateUI();
        }
    });

    rightButton.addEventListener('click', () => {
        if (currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            updateUI();
        }
    });

    function sendPrompt(prompt) {
        // Make a POST request to your API endpoint
        fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })
        .then(response => response.json())
        .then(data => {
            // Display the generated image
            const imageUrl = data.image_url;
            // Add new page
            pages.push({
                prompt,
                imageUrl
            });
            currentPageIndex = pages.length - 1;
            updateUI();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function updateUI() {
        const currentPage = pages[currentPageIndex];
        promptText.value = currentPage.prompt;
        imageBox.innerHTML = `<img id="SDimg" src="${currentPage.imageUrl}" alt="Generated Image" height="90%" width="90%">`;
        updatePagesContainer();
    }

    function updatePagesContainer() {
        pagesContainer.innerHTML = '';

        // Add left arrow
        // pagesContainer.innerHTML += '<button class="btn btn-primary" id="page-left">&lt;--</button>';

        // Add page numbers
        for (let i = 0; i < pages.length; i++) {
            pagesContainer.innerHTML += `<button class="btn btn-primary page-number ${i === currentPageIndex ? 'active' : ''}">${i + 1}</button>`;
        }

        // Add right arrow
        // pagesContainer.innerHTML += '<button class="btn btn-primary" id="page-right">--&gt;</button>';

        const pageNumbers = pagesContainer.getElementsByClassName('page-number');
        for (let i = 0; i < pageNumbers.length; i++) {
            pageNumbers[i].addEventListener('click', () => {
                currentPageIndex = i;
                updateUI();
            });
        }

        const pageLeft = document.getElementById('page-left');
        pageLeft.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                updateUI();
            }
        });

        const pageRight = document.getElementById('page-right');
        pageRight.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                updateUI();
            }
        });
    }
});
