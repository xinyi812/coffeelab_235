(function () {
    /* =========================================================
       1. 判斷目前所在頁面與資料夾
       ========================================================= */

    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    const isInsidePages =
        window.location.pathname.includes('/pages/');

    /* 角色圖片路徑 */
    const guideImagePath =
        isInsidePages
            ? '../img/guide.jpg'
            : 'img/guide.jpg';

    /* 不同資料夾需要使用不同的連結路徑 */
    const routes =
        isInsidePages
            ? {
                home: '../index.html',
                game: 'game.html',
                cafes: '../cafes.html',
                beans: 'beans.html',
                about: 'about.html',
                qianhua: 'qianhua.html',
                feedback: 'feedback.html'
            }
            : {
                home: 'index.html',
                game: 'pages/game.html',
                cafes: 'cafes.html',
                beans: 'pages/beans.html',
                about: 'pages/about.html',
                qianhua: 'pages/qianhua.html',
                feedback: 'pages/feedback.html'
            };

    /* =========================================================
       2. 不同頁面的角色提示
       ========================================================= */

    const pageMessages = {
        'index.html':
            '第一次來嗎？我可以帶你認識這場嘉義老屋咖啡攝影展。',

        'game.html':
            '往下看看，你會知道玩家如何走訪老屋、採集故事，並完成最後的攝影展。',

        'cafes.html':
            '點擊任一張咖啡館卡片，可以閱讀它的空間、人物與地方故事。',

        'qianhua.html':
            '這裡是鉛花咖啡。繼續往下，可以看見原本的鵝寮如何成為咖啡館。',

        'slowsoul.html':
            '繼續往下，你會看見這間老屋咖啡館留下的空間與人物故事。',

        'yusen.html':
            '繼續往下，你會看見這間老屋咖啡館留下的空間與人物故事。',

        'beans.html':
            '點擊任一張處理法卡片，就能開啟完整的咖啡知識展牌。',

        'about.html':
    '這裡記錄了《23.5°N 的回甘》的製作團隊與創作理念。',

        'feedback.html':
    '看完展覽後，歡迎留下一句話。你的回饋會先私下送到製作團隊。'
    };

    const currentMessage =
        pageMessages[currentPage] ||
        '你想先看看網站的哪一個部分呢？';

    /* =========================================================
       3. 建立導覽角色與對話框
       ========================================================= */

    const guide = document.createElement('div');

    guide.className = 'guide-assistant';

    guide.innerHTML = `
        <section
            class="guide-panel"
            aria-label="網站導覽"
            aria-live="polite"
        >
            <button
                class="guide-close"
                type="button"
                aria-label="關閉導覽"
            >
                ×
            </button>

            <p class="guide-kicker">
                EXHIBITION GUIDE
            </p>

            <h2>需要我帶路嗎？</h2>

            <p class="guide-message">
                ${currentMessage}
            </p>

            <p class="guide-question">
                你現在想看什麼？
            </p>

            <div class="guide-actions">
                <a href="${routes.game}">
                    我想了解遊戲
                </a>

                <a href="${routes.cafes}">
                    我想看看咖啡館
                </a>

                <a href="${routes.beans}">
                    我想認識咖啡處理法
                </a>

                <a href="${routes.about}">
                    我想知道製作團隊
                </a>

                <a href="${routes.feedback}">
                    我想留下觀展心得
                </a>

                <button
                    class="guide-later"
                    type="button"
                >
                    我先自己看看
                </button>
            </div>
        </section>

        <button
            class="guide-character"
            type="button"
            aria-label="開啟網站導覽"
            aria-expanded="false"
        >
            <img
                class="guide-character-image"
                src="${guideImagePath}"
                alt="《23.5°N 的回甘》展覽引路人"
            >

            <span class="guide-character-label">
                需要帶路嗎？
            </span>
        </button>
    `;

    document.body.appendChild(guide);

    /* =========================================================
       4. 取得需要操作的元素
       ========================================================= */

    const character =
        guide.querySelector('.guide-character');

    const closeButton =
        guide.querySelector('.guide-close');

    const laterButton =
        guide.querySelector('.guide-later');

    const guidePanel =
        guide.querySelector('.guide-panel');

    /* =========================================================
       5. 開啟與關閉導覽
       ========================================================= */

    function openGuide() {
        guide.classList.add('is-open');

        character.setAttribute(
            'aria-expanded',
            'true'
        );

        character.setAttribute(
            'aria-label',
            '收起網站導覽'
        );
    }

    function closeGuide() {
        guide.classList.remove('is-open');

        character.setAttribute(
            'aria-expanded',
            'false'
        );

        character.setAttribute(
            'aria-label',
            '開啟網站導覽'
        );
    }

    function toggleGuide() {
        if (guide.classList.contains('is-open')) {
            closeGuide();
        } else {
            openGuide();
        }
    }

    character.addEventListener(
        'click',
        toggleGuide
    );

    closeButton.addEventListener(
        'click',
        closeGuide
    );

    laterButton.addEventListener(
        'click',
        closeGuide
    );

    /* =========================================================
       6. 按下 Escape 關閉對話框
       ========================================================= */

    document.addEventListener(
        'keydown',
        function (event) {
            if (
                event.key === 'Escape' &&
                guide.classList.contains('is-open')
            ) {
                closeGuide();
                character.focus();
            }
        }
    );

    /* =========================================================
       7. 點擊導覽框以外的位置時關閉
       ========================================================= */

    document.addEventListener(
        'click',
        function (event) {
            if (
                !guide.classList.contains('is-open')
            ) {
                return;
            }

            if (
                guidePanel.contains(event.target) ||
                character.contains(event.target)
            ) {
                return;
            }

            closeGuide();
        }
    );

    /* =========================================================
       8. 圖片載入失敗時顯示替代圖示
       ========================================================= */

    const guideImage =
        guide.querySelector(
            '.guide-character-image'
        );

    guideImage.addEventListener(
        'error',
        function () {
            guideImage.style.display = 'none';

            const fallback =
                document.createElement('span');

            fallback.className =
                'guide-character-fallback';

            fallback.setAttribute(
                'aria-hidden',
                'true'
            );

            fallback.textContent = '📷';

            character.prepend(fallback);
        }
    );

    /* =========================================================
       9. 第一次進入網站時自動開啟一次
       ========================================================= */

    try {
        const hasSeenGuide =
            localStorage.getItem(
                '235n-guide-seen'
            );

        if (!hasSeenGuide) {
            window.setTimeout(
                function () {
                    openGuide();

                    localStorage.setItem(
                        '235n-guide-seen',
                        'true'
                    );
                },
                1000
            );
        }
    } catch (error) {
        /*
         瀏覽器禁止 localStorage 時，
         導覽角色仍然可以正常點擊使用。
        */
    }
})();