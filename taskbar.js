document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector('.start-button');
    const menu = document.querySelector('.menu');

    startButton.addEventListener('click', function() {
        menu.classList.toggle('expanded');
    });
    
    function closeMenu(e) {
        if (!menu.contains(e.target) && !startButton.contains(e.target)) {
            menu.classList.remove('expanded');
        }
    }
    
    document.addEventListener('click', closeMenu);
    
    
    const time = document.querySelector('.time');
    
    setInterval(function() {
        time.innerHTML = new Date().toLocaleTimeString();
    }, 1000);
});