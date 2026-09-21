(function () {
    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    const topLevelLinks =
        document.querySelectorAll('.nav-links > li > a');

    // 先移除所有導覽列的粗體狀態
    topLevelLinks.forEach((link) => {
        link.classList.remove('active');
    });

    // 根據目前分頁決定哪個導覽名稱要粗體
    let activeSelector;

    if (currentPage === 'index.html') {
        activeSelector =
            '.nav-links > li > a[href$="index.html"]';
    } else if (currentPage === 'game.html') {
        activeSelector =
            '.nav-links > li > a[href$="game.html"]';
    } else if (
        [
            'cafes.html',
            'qianhua.html',
            'slowsoul.html',
            'yusen.html'
        ].includes(currentPage)
    ) {
        activeSelector =
            '.nav-links > li > .dropbtn';
    } else if (currentPage === 'beans.html') {
        activeSelector =
            '.nav-links > li > a[href$="beans.html"]';
    } else if (currentPage === 'about.html') {
        activeSelector =
            '.nav-links > li > a[href$="about.html"]';
    }

    if (activeSelector) {
        document
            .querySelector(activeSelector)
            ?.classList.add('active');
    }

    // 建立頁面載入轉場
    const overlay = document.createElement('div');

    overlay.className = 'exhibition-transition';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
        <div class="transition-door transition-door-left"></div>
        <div class="transition-door transition-door-right"></div>

        <div class="transition-copy">
            <span class="transition-logo">23.5°N</span>

            <p class="transition-message">
                歡迎走進《23.5°N 的回甘》
            </p>

            <span class="transition-line"></span>
        </div>
    `;

    document.body.prepend(overlay);

    const message =
        overlay.querySelector('.transition-message');

    const reduceMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    function revealPage() {
        window.setTimeout(() => {
            document.body.classList.add('page-ready');
        }, reduceMotion ? 0 : 220);
    }

    window.addEventListener('load', revealPage);
    window.addEventListener('pageshow', revealPage);
    // 手機版：點左側網頁或選單空白處時收起
document.addEventListener('click', function (event) {
    if (window.innerWidth > 768) return;

    const mobileNav =
        document.querySelector('.nav-links');

    const menuButton =
        document.querySelector('#mobile-menu');

    if (
        !mobileNav ||
        !menuButton ||
        !mobileNav.classList.contains('active')
    ) {
        return;
    }

    // 點漢堡按鈕時，交給原本的開關功能處理
    if (menuButton.contains(event.target)) {
        return;
    }

    // 點到選單文字時不要直接關閉
    if (event.target.closest('.nav-links li')) {
        return;
    }

    // 點左側網頁或選單空白處，收起選單
    mobileNav.classList.remove('active');
    menuButton.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');

    document
        .querySelector('.dropdown')
        ?.classList.remove('show', 'active-click');

    // 避免點左側時同時誤觸底下的按鈕
    event.preventDefault();
    event.stopImmediatePropagation();
});

    // 點擊站內連結時顯示轉場
    document.addEventListener('click', function (event) {
        const link = event.target.closest('a');

        if (!link || event.defaultPrevented) return;

        const href = link.getAttribute('href');

        if (
            !href ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')
        ) {
            return;
        }

        if (
            link.target === '_blank' ||
            link.hasAttribute('download')
        ) {
            return;
        }

        const destination = new URL(
            link.href,
            window.location.href
        );

        if (
            destination.origin !== window.location.origin
        ) {
            return;
        }

        if (
            destination.href === window.location.href
        ) {
            return;
        }

        event.preventDefault();

        const label = link.textContent
            .replace('▾', '')
            .trim();

        message.textContent = label
            ? `正在前往｜${label}`
            : '正在前往下一個展區';

        document.body.classList.remove('page-ready');
        document.body.classList.add('page-leaving');

        window.setTimeout(() => {
            window.location.href = destination.href;
        }, reduceMotion ? 0 : 850);
    });
})();