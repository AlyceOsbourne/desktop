
function Application(title, icon, src) {
    this.title = title;
    this.icon = icon;
    this.src = src;
}

function Genre(title, stations) {
    this.title = title;
    this.stations = stations;
}

function Station(title, src) {
    this.title = title;
    this.src = src;
}

const apps = [
    new Application("Mousetrap", "https://raw.githubusercontent.com/AlyceOsbourne/cast/main/src/favicon.ico", "https://alyceosbourne.github.io/cast/"),
    new Application("Repl", "https://raw.githubusercontent.com/AlyceOsbourne/repl/main/repl/favicon.ico", "https://alyceosbourne.github.io/repl/"),
];
            
const genres = [

    new Genre("Synth", [
        new Station("The '80s Guy - Darksynth Radio", "https://stream.nightride.fm/darksynth.ogg"),
        new Station("EBSM - Electro Body Synth Music", "https://stream.nightride.fm/ebsm.ogg"),
        new Station("ChillSynth FM", "https://stream.chillsynth.fm/chillsynth.ogg")
    ]),
    
    new Genre("Chiptunes", [
        new Station("CVGM.net - Oldschool Video Game And Demoscene Music", "http://69.195.153.34:80/cvgm192"),
        new Station("Gamesboro Radio", "https://radio.gamesboro.org/listen/gamesboro_radio/radio.mp3"),
        new Station("HYPERADIO", "https://hyperadio.ru:8000/live2"),
        new Station("Pixel Vibes", "https://alxq.org:8000/undrgnd")
    ]),
    
    new Genre("Lofi", [
        new Station("AStream", "https://astream.cf:9000/astream"),
        new Station("Label CANTROLL [HDR]", "https://harddanceradio.ddns.is74.ru:8000/labelcantroll"),
        new Station("24/7 Lofi Radio", "https://ec3.yesstreaming.net:3750/stream"),
        new Station("lofi420.com", "https://ec2.yesstreaming.net:4260/stream"),
        new Station("Yes", "https://ec6.yesstreaming.net:2240/stream")
    ]),
    
    new Genre("Fantasy", [
        new Station("Radio Rivendell", "https://play.radiorivendell.com/radio/8000/radio.mp3")
    ])
];

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
    const stationSelect = document.querySelector("#station");
    genres.forEach((genre) => {
        const optGroup = document.createElement("optgroup");
        optGroup.label = genre.title;
        genre.stations.forEach((station) => {
            const option = document.createElement("option");
            option.value = station.src;
            option.innerHTML = station.title;
            optGroup.appendChild(option);
        });
        stationSelect.appendChild(optGroup);
    });
    
    stationSelect.selectedIndex = 0;
    const audio = document.querySelector("audio");
    audio.src = stationSelect.value;
    
    stationSelect.addEventListener("change", (e) => {
        const audio = document.querySelector("audio");
        audio.src = e.target.value;
        if (!audio.paused) {
            audio.play();
            document.querySelector(".play-pause").classList.remove("fa-play");
            document.querySelector(".play-pause").classList.add("fa-pause");
        };
    });
    
    const desktop = document.querySelector(".desktop");
    apps.forEach((app) => {
        const icon = document.createElement("img");
        icon.src = app.icon;
        icon.classList.add("icon");
        icon.addEventListener("click", () => {
            const window = new CustomWindow(app.title, app.src);
            desktop.appendChild(window);
        });
        desktop.querySelector(".grid").appendChild(icon);
    });
});
