export default function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}


