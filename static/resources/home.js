document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const promptText = document.getElementById('prompt-text');
    const imageBox = document.getElementById('image-box');

    submitButton.addEventListener('click', () => {
        const prompt = promptText.value.trim();
        if (prompt !== '') {
            // Send the prompt to the API endpoint
            sendPrompt(prompt);
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
            console.log(data)
            const imageUrl = data.image_url;
            imageBox.innerHTML = `<img id="SDimg" src="${imageUrl}" alt="Generated Image" height="90%" width="90%">`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
