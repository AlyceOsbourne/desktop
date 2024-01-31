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

class CustomWindow extends HTMLElement {
    constructor(title) {
        super();
        this.createWindow(title);
    }

    createWindow(title) {
        const window = document.createElement("div");
        window.classList.add("window");

        const titleBar = this.createDivWithClass("title-bar");
        titleBar.style.cursor = 'move';
        const titleText = this.createDivWithClass("title-text");
        titleText.innerHTML = title;

        const buttonContainer = this.createDivWithClass("button-container");
        const minimizeButton = this.createDivWithClass("minimize-button");
        minimizeButton.innerHTML = "-";
        minimizeButton.addEventListener("click", () => window.classList.toggle("minimized"));
        const closeButton = this.createDivWithClass("close-button");
        closeButton.innerHTML = "X";
        closeButton.addEventListener("click", () => window.remove());
        buttonContainer.append(minimizeButton, closeButton);

        const content = document.createElement("iframe");
        content.style.width = "100%";
        content.style.height = "100%";
        content.style.border = "none";
        content.src = "https://devdocs.io/";

        titleBar.append(titleText, document.createElement("div"), buttonContainer);
        window.append(titleBar, content);
        this.appendChild(window);

        this.makeDraggable(window, titleBar);
    }

    createDivWithClass(className) {
        const div = document.createElement("div");
        div.classList.add(className);
        return div;
    }

    makeDraggable(element, handle) {
        let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            offsetX = mouseX - e.clientX;
            offsetY = mouseY - e.clientY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            element.style.top = (element.offsetTop - offsetY) + "px";
            element.style.left = (element.offsetLeft - offsetX) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

// Register the custom element
customElements.define('custom-window', CustomWindow);

// Usage
document.addEventListener("DOMContentLoaded", function() {
    const desktop = document.querySelector(".desktop");
    const window1 = new CustomWindow("My Computer");
    const window2 = new CustomWindow("My Computer");
    desktop.appendChild(window1);
    desktop.appendChild(window2);
});