console.log("Welcome to Spotify!");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Alone", filePath: "songs/1.mp3"},
    {songName: "Dreamer's Highway", filePath: "songs/2.mp3"},
    {songName: "Moonlit Serenade", filePath: "songs/3.mp3"},
    {songName: "Neon Dreams", filePath: "songs/4.mp3"},
    {songName: "Sugar and Strings", filePath: "songs/5.mp3"},
    {songName: "Sunshine from the Sky", filePath: "songs/6.mp3"},
    {songName: "Whispered Prayer", filePath: "songs/7.mp3"},
    {songName: "Whispered Prayers", filePath: "songs/8.mp3"}
];                                                      

songItem.forEach((element, i) => {
    console.log(element, i);
    //element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
})

// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime<=0){
        // If the audio is paused or at the beginning, play it
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show the gif when playing
        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');
    }
        
        
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide the gif when paused
        makeAllPlays();
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () =>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


// Handle Play/Pause Click for songItemPlay
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const target = e.target;

        if (audioElement.src.includes(`songs/${parseInt(target.id) + 1}.mp3`)) {
            if (!audioElement.paused) {
                // If the clicked song is already playing, pause it
                audioElement.pause();
                target.classList.remove('fa-pause-circle');
                target.classList.add('fa-play-circle');
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0; // Hide the gif when paused
            } else {
                  // Resume the paused song
                  audioElement.play();
                  target.classList.remove('fa-play-circle');
                  target.classList.add('fa-pause-circle');
                  masterPlay.classList.remove('fa-play-circle');
                  masterPlay.classList.add('fa-pause-circle');
                  gif.style.opacity = 1; // Show the gif when playing
}
            
        } else {
            // Play the clicked song
            makeAllPlays(); // Reset all other songItemPlay buttons to play icons
            songIndex = parseInt(target.id);
            target.classList.remove('fa-play-circle');
            target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1; // Show the gif when playing
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

document.getElementById('next').addEventListener('click', () => {

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');

    if (songIndex >= 7){ // Assuming there are 8 songs indexed from 0 to 7
        // Reset to the first song if the current index exceeds the last song
        songIndex = 0;
    }
    else {
        songIndex += 1;
        
    }

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

})

document.getElementById('previous').addEventListener('click', () => {

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-pause-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');

    if (songIndex <= 0){
        songIndex = 7;
    }
    else {
        songIndex -= 1;
    }

    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-pause-circle');

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();    
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})