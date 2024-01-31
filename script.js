
function Application(title, icon, src) {
    this.title = title;
    this.icon = icon;
    this.src = src;
}


const apps = [
    new Application("Mousetrap", "https://raw.githubusercontent.com/AlyceOsbourne/cast/main/src/favicon.ico", "https://alyceosbourne.github.io/cast/"),
    new Application("Repl", "https://raw.githubusercontent.com/AlyceOsbourne/repl/main/repl/favicon.ico", "https://alyceosbourne.github.io/repl/"),
];


class CustomWindow extends HTMLElement {
    constructor(title, src) {
        super();
        this.createWindow(title, src);
    }

    createWindow(title, src) {
        const window = document.createElement("div");
        window.classList.add("window");

        const titleBar = this.createDivWithClass("title-bar");
        titleBar.style.cursor = "move";
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
        src = src.replace("http://", "https://");
        content.src = src;
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
        let offsetX = 0,
            offsetY = 0,
            mouseX = 0,
            mouseY = 0;
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            for (const element of document.querySelectorAll(".window")) {
                element.style.zIndex = 0;
            }
            element.style.zIndex = 1;
        }

        function elementDrag(e) {
            e.preventDefault();
            offsetX = mouseX - e.clientX;
            offsetY = mouseY - e.clientY;
            mouseX = e.clientX;
            mouseY = e.clientY;
            element.style.top = element.offsetTop - offsetY + "px";
            element.style.left = element.offsetLeft - offsetX + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

customElements.define("custom-window", CustomWindow);

document.addEventListener("DOMContentLoaded", function () {
    const desktop = document.querySelector(".desktop");
    apps.forEach((app) => {
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon-container");
        const icon = document.createElement("img");
        icon.src = app.icon;
        icon.classList.add("icon");
        const title = document.createElement("div");
        title.innerHTML = app.title;
        title.classList.add("title");
        iconContainer.appendChild(icon);
        iconContainer.appendChild(title);
        iconContainer.addEventListener("click", () => {
            const window = new CustomWindow(app.title, app.src);
            desktop.appendChild(window);
        });
        desktop.querySelector(".grid").appendChild(iconContainer);
    });
});


