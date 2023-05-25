jQuery(function ($) {
    $(document).ready(function () {
        let submit = document.getElementById('submit');
        let newPage = document.getElementById('new-page');
        let image = document.getElementById('image');
        let promptText = document.getElementById('user-prompt');
        let leftButton = document.getElementById('left-button');
        let rightButton = document.getElementById('right-button');
        let pagesContainer = document.getElementById('pages-container');

        let pages = [];
        let currentPageIndex = 0;

        newPage.addEventListener('click', function() {
            let saved_prompt = '';
            let image_url = '';

            pages.push({
                saved_prompt,
                image_url
            });
        });

        submit.addEventListener('click', function () {
            loading();

            $.ajax({
                url: '/generate-image',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    prompt: promptText.value.trim(),
                }),
                success: function (data) {
                    let image_url = data.image_url;
                    let saved_prompt = promptText.value.trim();
                    
                    pages.push({
                        saved_prompt,
                        image_url
                    });
                    currentPageIndex = pages.length - 1;

                    doneLoading();
                    updateUI();
                },
                error: function () {
                    console.error("Failed");
                }
            });
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

        function loading() {
            submit.classList.add('disabled');
            submit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only"> Generating...</span>`;
        }

        function doneLoading() {
            submit.classList.remove('disabled');
            submit.innerHTML = `Generate Image`;
        }

        function updateUI() {
            let currentPage = pages[currentPageIndex];
            promptText.ariaPlaceholder = currentPage.saved_prompt;
            image.innerHTML = `<span class="helper"></span><img id="SDimg" src="${currentPage.image_url}" height="100%" width="100%" style="display: inline-block; vertical-align: middle;">`;
            updatePagesContainer();
        }

        function updatePagesContainer() {
            pagesContainer.innerHTML = '';

            for (let i = 0; i < pages.length; i++) {
                pagesContainer.innerHTML += `<button class="btn btn-primary page-number ${i === currentPageIndex ? 'active' : ''}">${i + 1}</button>`;
            }

            let pageNumbers = pagesContainer.getElementsByClassName('page-number');
            for (let i = 0; i < pageNumbers.length; i++) {
                pageNumbers[i].addEventListener('click', () => {
                    currentPageIndex = i;
                    updateUI();
                });
            }
        }
    });
});