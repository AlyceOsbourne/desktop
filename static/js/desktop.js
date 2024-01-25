function playPause(btn) {
    let audio = document.querySelector("audio");
    if (audio.paused) {
        audio.play();
        btn.classList.remove("fa-play");
        btn.classList.add("fa-pause");
    } else {
        audio.pause();
        btn.classList.remove("fa-pause");
        btn.classList.add("fa-play");
    }
}

function setVolume(volumeValue) {
    let audio = document.querySelector("audio");
    audio.volume = volumeValue / 100;
}

document.addEventListener("DOMContentLoaded", function() {
    const time = document.querySelector(".time");
    const desktop = document.querySelector(".desktop");
    const desktop_grid = desktop.querySelector(".grid");
    const icon_tray = document.querySelector(".icon-tray");
    
    for (let i = 0; i < 3; i++) {
        const icon = document.createElement("div");
        icon.classList.add("icon");
        desktop_grid.appendChild(icon);
    }
    
    for (let i = 0; i < 3; i++) {
        const icon = document.createElement("div");
        icon.classList.add("icon");
        icon_tray.appendChild(icon);
    }
    
    setInterval(function() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        time.innerHTML = (hours + ":" + minutes + ":" + seconds).toUpperCase();
    }, 1000);
    

    
    function openWindow(title, parent) {
        const createDivWithClass = className => {
            const div = document.createElement("div");
            div.classList.add(className);
            return div;
        };
        

    
        const window = createDivWithClass("window");
        const titleBar = createDivWithClass("title-bar");
        titleBar.style.cursor = 'move';
    
        const titleText = createDivWithClass("title-text");
        titleText.innerHTML = title;
    
        const buttonContainer = createDivWithClass("button-container");
    
        const minimizeButton = createDivWithClass("minimize-button");
        minimizeButton.innerHTML = "-";
        minimizeButton.addEventListener("click", () => window.classList.toggle("minimized"));
    
        const closeButton = createDivWithClass("close-button");
        closeButton.innerHTML = "X";
        closeButton.addEventListener("click", () => window.remove());
    
        buttonContainer.append(minimizeButton, closeButton);
    
        const content = document.createElement("iframe");

        content.style.width = "100%";
        content.style.height = "100%";
        content.style.border = "none";
        content.src = "https://devdocs.io/";
        
        titleBar.append(titleText, createDivWithClass("padding"), buttonContainer);
        window.append(titleBar, content);
        desktop.appendChild(window);
        
        const hoistWindow = (e) => {
            const window = e.target.closest('.window');
            const windows = Array.from(document.querySelectorAll('.window'));
            const maxZIndex = Math.max(...windows.map(w => w.style.zIndex));
            window.style.zIndex = maxZIndex + 1;
        };
    
        function dragMouseDown(e) {
            const windowElement = e.target.closest('.window');
        
            e.preventDefault();
            let rect = windowElement.getBoundingClientRect();
            windowElement.style.top = rect.top + 'px';
            windowElement.style.left = rect.left + 'px';
            windowElement.style.transform = 'none';
        
            let startPosX = e.clientX;
            let startPosY = e.clientY;
        
            function elementDrag(e) {
                e.preventDefault();
        
                let deltaX = e.clientX - startPosX;
                let deltaY = e.clientY - startPosY;
                startPosX = e.clientX;
                startPosY = e.clientY;
        
                let newLeft = windowElement.offsetLeft + deltaX;
                let newTop = windowElement.offsetTop + deltaY;
        
                newLeft = Math.max(0, Math.min(newLeft, desktop.clientWidth - windowElement.offsetWidth));
                newTop = Math.max(0, Math.min(newTop, desktop.clientHeight - windowElement.offsetHeight));
        
                windowElement.style.left = newLeft + 'px';
                windowElement.style.top = newTop + 'px';
            }
        
            function closeDragElement() {
                document.removeEventListener('mousemove', elementDrag);
                document.removeEventListener('mouseup', closeDragElement);
            }
        
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }
    
        titleBar.onmousedown = dragMouseDown;
        titleBar.addEventListener('mousedown', hoistWindow);
    }
    
    openWindow("My Computer");
    openWindow("My Computer");
});