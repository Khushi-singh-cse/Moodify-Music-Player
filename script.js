const playlists = {

    happy: [

        {
            title: "Golden Sunrise",
            file: "music/happy1.mp3",
            image: "photo/sunrise.jpg"
        },

        {
            title: "Joy Ride",
            file: "music/happy2.mp3",
            image: "photo/sunshine.avif"
        },

        {
            title: "Summer Bloom",
            file: "music/happy3.mp3",
            image: "photo/yellow flower.webp"
        }

    ],

    motivation: [

        {
            title: "Rise Again",
            file: "music/motivation1.mp3",
            image: "photo/run.jpg"
        },

        {
            title: "Limitless",
            file: "music/motivation2.mp3",
            image: "photo/hard work.jpg"
        },

        {
            title: "Victory Drive",
            file: "music/motivation3.mp3",
            image: "photo/mountain.jpg"
        }

    ],

    relax: [

        {
            title: "Ocean Dreams",
            file: "music/relax1.mp3",
            image: "photo/ocean.jpg"
        },

        {
            title: "Calm Horizon",
            file: "music/relax2.mp3",
            image: "photo/beach.webp"
        },

        {
            title: "Peaceful Journey",
            file: "music/relax3.mp3",
            image: "photo/road.jpg"
        }

    ],

    sad: [

        {
            title: "Silent Tears",
            file: "music/sad1.mp3",
            image: "photo/rain.avif"
        },

        {
            title: "Lost Memories",
            file: "music/sad2.mp3",
            image: "photo/dark sky.jpg"
        },

        {
            title: "Empty Streets",
            file: "music/sad3.mp3",
            image: "photo/road.jpg"
        }

    ]

};

// ==========================
// PLAYLIST IMAGES
// ==========================

const playlistImages = {

    happy: "photo/sunshine.avif",

    motivation: "photo/hard work.jpg",

    relax: "photo/ocean.jpg",

    sad: "photo/rain.avif"

};


// ==========================
// ELEMENTS
// ==========================

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const playBtn = document.getElementById("play");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");

const songList = document.getElementById("songList");

const playlistButtons =
document.querySelectorAll(".playlist-btn");


// ==========================
// VARIABLES
// ==========================

let currentPlaylist = "happy";

let currentSong = 0;

let isPlaying = false;


// ==========================
// LOAD SONG
// ==========================


function loadSong(){

    const song = playlists[currentPlaylist][currentSong];

    audio.src = song.file;

    cover.src = song.image;

    title.textContent = song.title;

    artist.textContent =
        currentPlaylist.charAt(0).toUpperCase() +
        currentPlaylist.slice(1) +
        " Playlist";

}


// ==========================
// LOAD PLAYLIST
// ==========================

function loadPlaylist(){

    songList.innerHTML = "";

    playlists[currentPlaylist].forEach((song,index)=>{

        const card = document.createElement("div");

        card.className = "song-card";

        if(index===currentSong){

            card.classList.add("active");

        }

        card.innerHTML = `

            <img src="${song.image}" class="song-image">

            <div class="song-info">

                <h4>${song.title}</h4>

                <p>${currentPlaylist.toUpperCase()}</p>

            </div>

        `;

        card.onclick = ()=>{

            currentSong = index;

            loadSong();

            loadPlaylist();

            playSong();

        };

        songList.appendChild(card);

    });

}

// ==========================
// INITIAL LOAD
// ==========================

loadSong();

loadPlaylist();

// ==========================
// PLAY SONG
// ==========================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("playing");

}

// ==========================
// PAUSE SONG
// ==========================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("playing");

}

// ==========================
// PLAY / PAUSE BUTTON
// ==========================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// ==========================
// NEXT SONG
// ==========================

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong >= playlists[currentPlaylist].length){

        currentSong = 0;

    }

    loadSong();

    loadPlaylist();

    playSong();

});

// ==========================
// PREVIOUS SONG
// ==========================

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong < 0){

        currentSong =
        playlists[currentPlaylist].length - 1;

    }

    loadSong();

    loadPlaylist();

    playSong();

});

// ==========================
// PROGRESS BAR
// ==========================

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime / audio.duration) * 100;

    }

});

progress.addEventListener("input",()=>{

    if(audio.duration){

        audio.currentTime =
        (progress.value / 100) * audio.duration;

    }

});

// ==========================
// VOLUME
// ==========================

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// ==========================
// PLAYLIST SWITCHING
// ==========================

playlistButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        playlistButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentPlaylist =
        button.dataset.playlist;

        currentSong = 0;

        loadSong();

        loadPlaylist();

        pauseSong();

    });

});

// ==========================
// AUTO NEXT SONG
// ==========================

audio.addEventListener("ended", () => {

    currentSong++;

    if(currentSong >= playlists[currentPlaylist].length){

        currentSong = 0;

    }

    loadSong();

    loadPlaylist();

    playSong();

});


// ==========================
// CURRENT TIME & DURATION
// ==========================




function formatTime(time){

    if(isNaN(time)) return "0:00";

    let minutes = Math.floor(time/60);

    let seconds = Math.floor(time%60);

    if(seconds<10){

        seconds="0"+seconds;

    }

    return `${minutes}:${seconds}`;

}


// ==========================
// KEYBOARD SHORTCUTS
// ==========================

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }

    if(e.code==="ArrowRight"){

        nextBtn.click();

    }

    if(e.code==="ArrowLeft"){

        prevBtn.click();

    }

});


// ==========================
// ACTIVE SONG HIGHLIGHT
// ==========================

function refreshQueue(){

    document.querySelectorAll(".song-card")
    .forEach((card,index)=>{

        card.classList.remove("active");

        if(index===currentSong){

            card.classList.add("active");

        }

    });

}


// ==========================
// CALL AFTER EVERY SONG
// ==========================

audio.addEventListener("play",()=>{

    refreshQueue();

});


// ==========================
// PLAYER READY
// ==========================

console.log("Moodify Loaded Successfully 🎵");