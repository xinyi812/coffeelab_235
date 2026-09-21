(function () {
    const form =
        document.querySelector('#feedback-form');

    if (!form) {
        return;
    }

    const message =
        form.querySelector('#feedback-message');

    const count =
        form.querySelector('#feedback-count');

    const status =
        form.querySelector('#feedback-status');

    const submitButton =
        form.querySelector('.feedback-submit');

    const submitText =
        form.querySelector('.feedback-submit-text');

    const defaultButtonText =
        submitText.textContent;

    function updateCount() {
        count.textContent =
            String(message.value.length);
    }

    function setStatus(type, text) {
        status.className =
            `feedback-status is-${type}`;

        status.textContent = text;
    }

    message.addEventListener(
        'input',
        updateCount
    );

    form.addEventListener(
        'submit',
        async function (event) {
            event.preventDefault();

            if (
                !form.reportValidity() ||
                submitButton.disabled
            ) {
                return;
            }

            submitButton.disabled = true;

            submitText.textContent =
                '正在送出……';

            setStatus(
                'sending',
                '正在把你的留言送往展覽團隊，請稍候。'
            );

            try {
                const response =
                    await fetch(
                        form.action,
                        {
                            method: 'POST',

                            body:
                                new FormData(form),

                            headers: {
                                Accept:
                                    'application/json'
                            }
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        'Form submission failed'
                    );
                }

                form.reset();
                updateCount();

                setStatus(
                    'success',
                    '已收到你的留言，謝謝你把這段記憶留給我們。'
                );

                submitText.textContent =
                    '留言已送出';
            } catch (error) {
                setStatus(
                    'error',
                    '目前沒有成功送出，請檢查網路後再試一次。'
                );

                submitButton.disabled = false;

                submitText.textContent =
                    defaultButtonText;
            }
        }
    );

    updateCount();
})();