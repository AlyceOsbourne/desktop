function Genre(title, stations) {
    this.title = title;
    this.stations = stations;
}

function Station(title, src) {
    this.title = title;
    this.src = src;
}

            
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
        const play = !audio.paused;
        audio.src = e.target.value;
        window.setTimeout(() => {
            if (play) {
                audio.play();
            }
        }, 10);
    });
    
});