let music = document.querySelector('audio')
let img = document.querySelector('img')

let title = document.querySelector('#title')
let artist = document.querySelector('#artist')
let play = document.querySelector('#play')
let prev = document.querySelector('#prev')
let next = document.querySelector('#next')

let progress = document.querySelector('#progress')
let progress_div = document.querySelector('#progress_div')
let total_duration = document.querySelector('#duration')
let total_current_time = document.querySelector('#current_time')

let songs = [{
        name: 'jibon-1',
        title: 'Bewafa Tera',
        artist: 'Rohak Kohli'
    },
    {
        name: 'jibon-2',
        title: 'Sargam',
        artist: 'Anish Giri'
    },

    {
        name: 'jibon-3',
        title: 'Marshmello',
        artist: 'Anne Marie'
    },
    {
        name: 'jibon-4',
        title: 'English Enna',
        artist: 'Kety Perry'
    }

]
// for play functionality

let isPlaying = false;

const playMusic = () => {                                                           
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('anime')
}


// for pause functionality

const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause', 'fa-play');
    img.classList.remove('anime')
}


play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})


const loadSong = (songs) => {
    title.textContent = songs.title
    artist.textContent = songs.artist
    music.src = `musics/${songs.name}.mp3`
    img.src = `images/${songs.name}.png`
}


// song change functionality

var songsIndex = 0;
const nextSong = () => {
    songsIndex = (songsIndex + 1) % songs.length
    loadSong(songs[songsIndex])
    playMusic()
}

const prevSong = () => {
    songsIndex = (songsIndex - 1 + songs.length) % songs.length
    loadSong(songs[songsIndex])
    playMusic()
}


// progress functionality

music.addEventListener('timeupdate', (event) => {
    const {
        currentTime,
        duration
    } = event.target;
    let progress_time = (currentTime / duration) * 100
    progress.style.width = `${progress_time}% `

    //  music duration update functionality

    let min_duration = Math.floor(duration / 60)
    let sec_duration = Math.floor(duration % 60)
    let tot_duration = `${min_duration}:${sec_duration}`

    if (duration) {
        total_duration.textContent = tot_duration
    }

    // music current time update functionality

    let min_currentTime = Math.floor(currentTime / 60)
    let sec_currentTime = Math.floor(currentTime % 60)

    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`
    }

    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`
    total_current_time.textContent = tot_currentTime

});

    // play your song as your desire position

    progress_div.addEventListener('click', (e) => {
        let {duration} = music
        let move_progress = (e.offsetX / e.target.clientWidth) * duration
        music.currentTime = move_progress
        
        // let jibon = (move_progress / duration) * 100
        // progress.style.width = `${jibon}%`

    })



// if music end call next song

music.addEventListener('ended', nextSong)

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)