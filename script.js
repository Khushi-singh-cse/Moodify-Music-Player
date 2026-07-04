// =======================================
// MOODIFY MUSIC PLAYER
// PART 1
// =======================================


// ==============================
// PLAYLIST DATA
// ==============================

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


// ==============================
// ELEMENTS
// ==============================

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

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.querySelector(".sidebar");


// ==============================
// VARIABLES
// ==============================

let currentPlaylist = "happy";

let currentSong = 0;

let isPlaying = false;


// ==============================
// LOAD SONG
// ==============================

function loadSong(){

    const song =
    playlists[currentPlaylist][currentSong];

    audio.src = song.file;

    cover.src = song.image;

    title.textContent = song.title;

    artist.textContent =
        currentPlaylist.charAt(0).toUpperCase() +
        currentPlaylist.slice(1) +
        " Playlist";

}


// ==============================
// LOAD PLAYLIST
// ==============================

function loadPlaylist(){

    songList.innerHTML = "";

    playlists[currentPlaylist].forEach((song,index)=>{

        const card =
        document.createElement("div");

        card.className = "song-card";

        if(index === currentSong){

            card.classList.add("active");

        }

        card.innerHTML = `

            <img src="${song.image}" alt="${song.title}">

            <div class="song-info">

                <h4>${song.title}</h4>

                <p>${currentPlaylist.toUpperCase()}</p>

            </div>

        `;

        card.addEventListener("click",()=>{

            currentSong = index;

            loadSong();

            loadPlaylist();

            playSong();

        });

        songList.appendChild(card);

    });

}


// ==============================
// INITIAL LOAD
// ==============================

loadSong();

loadPlaylist();

// =======================================
// PART 2
// PLAYER CONTROLS
// =======================================


// ==============================
// PLAY SONG
// ==============================

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}


// ==============================
// PAUSE SONG
// ==============================

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}


// ==============================
// PLAY / PAUSE
// ==============================

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});


// ==============================
// NEXT SONG
// ==============================

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong >= playlists[currentPlaylist].length){

        currentSong = 0;

    }

    loadSong();

    loadPlaylist();

    playSong();

});


// ==============================
// PREVIOUS SONG
// ==============================

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong < 0){

        currentSong =
        playlists[currentPlaylist].length-1;

    }

    loadSong();

    loadPlaylist();

    playSong();

});


// ==============================
// PROGRESS BAR
// ==============================

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime/audio.duration)*100;

    }

});


progress.addEventListener("input",()=>{

    if(audio.duration){

        audio.currentTime =
        (progress.value/100)*audio.duration;

    }

});


// ==============================
// VOLUME
// ==============================

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});


// ==============================
// PLAYLIST SWITCHING
// ==============================

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

        // Close mobile sidebar
        if(window.innerWidth<=768){

            sidebar.classList.remove("show");

        }

    });

});


// ==============================
// HAMBURGER MENU
// ==============================

menuBtn.addEventListener("click",()=>{

    sidebar.classList.toggle("show");

});


// ==============================
// CLOSE MENU IF CLICK OUTSIDE
// ==============================

document.addEventListener("click",(e)=>{

    if(window.innerWidth>768) return;

    if(

        !sidebar.contains(e.target)

        &&

        !menuBtn.contains(e.target)

    ){

        sidebar.classList.remove("show");

    }

});

// =======================================
// PART 3
// EXTRA FEATURES
// =======================================


// ==============================
// AUTO NEXT SONG
// ==============================

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong >= playlists[currentPlaylist].length){

        currentSong = 0;

    }

    loadSong();

    loadPlaylist();

    playSong();

});


// ==============================
// FORMAT TIME
// ==============================

function formatTime(time){

    if(isNaN(time)) return "0:00";

    const minutes = Math.floor(time/60);

    let seconds = Math.floor(time%60);

    if(seconds<10){

        seconds = "0"+seconds;

    }

    return `${minutes}:${seconds}`;

}


// ==============================
// KEYBOARD SHORTCUTS
// ==============================

document.addEventListener("keydown",(e)=>{

    // Ignore shortcuts while typing
    if(
        e.target.tagName==="INPUT" ||
        e.target.tagName==="TEXTAREA"
    ){
        return;
    }

    switch(e.code){

        case "Space":

            e.preventDefault();

            if(isPlaying){

                pauseSong();

            }

            else{

                playSong();

            }

            break;

        case "ArrowRight":

            nextBtn.click();

            break;

        case "ArrowLeft":

            prevBtn.click();

            break;

    }

});


// ==============================
// REFRESH ACTIVE SONG
// ==============================

function refreshQueue(){

    document
    .querySelectorAll(".song-card")
    .forEach((card,index)=>{

        card.classList.toggle(
            "active",
            index===currentSong
        );

    });

}

audio.addEventListener("play",refreshQueue);

audio.addEventListener("pause",refreshQueue);


// ==============================
// UPDATE QUEUE AFTER SONG CHANGE
// ==============================

audio.addEventListener("loadeddata",()=>{

    refreshQueue();

});


// ==============================
// KEEP PLAY BUTTON IN SYNC
// ==============================

audio.addEventListener("pause",()=>{

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

});

audio.addEventListener("play",()=>{

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

});


// ==============================
// PLAYER READY
// ==============================

console.clear();

console.log("%cMoodify Loaded Successfully 🎵",
"color:#1DB954;font-size:18px;font-weight:bold;"); 
