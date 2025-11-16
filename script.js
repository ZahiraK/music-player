//  My list of songs
const mySongs = [
    {
        title: "Friends",
        artist: "Chase Atlantic",
        filePath: "./songs/Friends - Chase Atlantic.mp3"
    },
    {
        title: "Fallen Star",
        artist: "The Neighbourhood",
        filePath: "./songs/Fallen Star.mp3"
    },
    {
        title: "Watch",
        artist: "Billie Eilish",
        filePath: "./songs/watch.mp3"
    }
];

// Getting all the HTML elements one by one
const listOfSongs = document.getElementById("playlist");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const audioPlayer = document.getElementById("audio");

const buttonBack = document.getElementById("prev-btn");
const buttonPlayPause = document.getElementById("play-btn");
const buttonNext = document.getElementById("next-btn");

const progress = document.getElementById("progress-bar");
const volume = document.getElementById("volume-slider");

const uploadMusic = document.getElementById("music-upload");

const switchTheme = document.getElementById("theme-toggle");

// Change theme when checkbox is clicked
switchTheme.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Starting with the first song
let whichSongNow = 0;

// Load a song by its number in the list
function showSong(songNumber) {
    const currentSong = mySongs[songNumber];
    audioPlayer.src = currentSong.filePath;
    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
}

//  Add all songs to the playlist area
mySongs.forEach((oneSong, number) => {
    const newItem = document.createElement("li");
    newItem.textContent = oneSong.title + " - " + oneSong.artist;
    newItem.dataset.index = number;
    listOfSongs.appendChild(newItem);
});

// Play a song when clicked from playlist
listOfSongs.addEventListener("click", (event) => {
    const songClicked = event.target.dataset.index;
    if (songClicked !== undefined) {
        whichSongNow = songClicked;
        showSong(whichSongNow);
        audioPlayer.play();
    }
});

// Go to previous song
function goBackSong() {
    if (whichSongNow === 0) {
        whichSongNow = mySongs.length - 1;
    } else {
        whichSongNow--;
    }
    showSong(whichSongNow);
    audioPlayer.play();
}

// Go to next song
function goNextSong() {
    if (whichSongNow === mySongs.length - 1) {
        whichSongNow = 0;
    } else {
        whichSongNow++;
    }
    showSong(whichSongNow);
    audioPlayer.play();
}

// Play or pause song when clicking the play button
buttonPlayPause.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

// Change volume using the slider
volume.addEventListener("input", () => {
    audioPlayer.volume = volume.value;
});

// Show song progress while it's playing
audioPlayer.addEventListener("timeupdate", () => {
    const howMuchPlayed = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.value = howMuchPlayed;
});

// Jump to another part of song by using the progress bar
progress.addEventListener("input", () => {
    audioPlayer.currentTime = (progress.value / 100) * audioPlayer.duration;
});

// Add click functions to buttons
buttonBack.addEventListener("click", goBackSong);
buttonNext.addEventListener("click", goNextSong);

// Load the first song in the beginning
showSong(whichSongNow);

// Upload your own music
uploadMusic.addEventListener("change", (event) => {
    const uploadedFiles = Array.from(event.target.files);
    uploadedFiles.forEach(oneFile => {
        const newSong = {
            title: oneFile.name.replace(/\.\w+$/, ""),
            artist: "Unknown Artist",
            filePath: URL.createObjectURL(oneFile)
        };

        mySongs.push(newSong);

        const listItem = document.createElement("li");
        listItem.textContent = newSong.title + " - " + newSong.artist;
        listItem.dataset.index = mySongs.length - 1;
        listOfSongs.appendChild(listItem);
    });
});
