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

            pages[currentPageIndex].saved_prompt = promptText.value.trim() != '' ? promptText.value.trim() : '';
            currentPageIndex = pages.length - 1;
            updateUI();
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
                    
                    if(pages[currentPageIndex] != undefined && pages[currentPageIndex].image_url != '') {
                        pages.push({
                            saved_prompt,
                            image_url
                        });    
                        currentPageIndex = pages.length - 1;
                    } else {
                        pages[currentPageIndex] = {
                            saved_prompt,
                            image_url
                        };
                    }
                    
                    doneLoading();
                    updateUI();
                },
                error: function () {
                    console.error("Failed");
                }
            });
        });

        leftButton.addEventListener('click', () => {
            pages[currentPageIndex].saved_prompt = promptText.value.trim() != '' ? promptText.value.trim() : '';
            if (currentPageIndex > 0) {
                currentPageIndex--;
                updateUI();
            }
        });

        rightButton.addEventListener('click', () => {
            pages[currentPageIndex].saved_prompt = promptText.value.trim() != '' ? promptText.value.trim() : '';
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                updateUI();
            }
        });

        function loading() {
            let btns = document.getElementsByClassName('btn')
            for (let btn of btns) {
                btn.classList.add('disabled');
            }
            submit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="sr-only"> Generating...</span>`;
        }

        function doneLoading() {
            let btns = document.getElementsByClassName('btn')
            for (let btn of btns) {
                btn.classList.remove('disabled');
            }
            submit.innerHTML = `Generate Image`;
        }

        function updateUI() {
            let currentPage = pages[currentPageIndex];
            promptText.value = currentPage.saved_prompt;
            image.innerHTML = `<span class="helper"></span><img id="SDimg" src="${currentPage.image_url}" height="100%" width="100%" style="display: inline-block; vertical-align: middle;">`;
            updatePagesContainer();
        }

        function updatePagesContainer() {
            pagesContainer.innerHTML = '';

            for (let i = 0; i < pages.length; i++) {
                pagesContainer.innerHTML += `<button class="btn btn-primary page-number id= "page_${i}" ${i === currentPageIndex ? 'active' : ''}">${i + 1}</button>`;
            }

            let pageNumbers = pagesContainer.getElementsByClassName('page-number');
            for (let i = 0; i < pageNumbers.length; i++) {
                pageNumbers[i].addEventListener('click', () => {
                    pages[currentPageIndex].saved_prompt = promptText.value.trim() != '' ? promptText.value.trim() : '';
                    currentPageIndex = i;
                    updateUI();
                });
            }
        }
    });
});