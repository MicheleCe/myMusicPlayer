window.localStorage.getItem("artistValue");
let getArtist = localStorage.getItem("artistValue")
let artistID = JSON.parse(getArtist)
console.log(artistID);

console.log("1", artistID[0]);
console.log("2", artistID[1]);

let apiStrives = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistID[1]}`


const artistSearch = (input) => {
    fetch(input)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.error("la richiesta non e andata a buon fine");
        }
    })
    .then((jsonPromise) => {
        console.log(jsonPromise);
        console.log(jsonPromise.name);
        let listReference = document.querySelector('.artistContainer')
        listReference.innerHTML += containerArtist(
        jsonPromise.name,
        jsonPromise.picture_xl,
        jsonPromise.nb_fan,
        )
        return jsonPromise.tracklist})
    .then((tracklist) => {
        fetch(tracklist)
        .then((result) => {
            if (result.ok) {
                return result.json();
            } else {
                console.error("la richiesta non e andata a buon fine nella ricerca di brani");
            }
        })
        .then((listPromise) => {
            console.log("iiii", listPromise);
            listPromise.data.forEach((element, i) => {
                let listReference = document.querySelector('.innerSongContainer')
                listReference.innerHTML += containerSongs(
                    element.title,
                    element.album.cover_small,
                    element.duration/60,
                    element.rank,
                    element.preview,
                    element.artist.name,
                    i
                )
            });
        })

    })
}
artistSearch(apiStrives)

function containerArtist(artistName, artistBackground, numbersOfFans) {
    return `
    <div class="artistContainer col-12 text-white d-flex flex-column justify-content-between" style="background-image: url('${artistBackground}');">
        <div class="d-flex justify-content-between">
            <div>
                <i class="bi fs-1 bi-arrow-left-short">
                </i><i class="bi fs-1 bi-arrow-right-short"></i>
            </div>
            <div class="d-flex align-items-center"><i class="bi fs-1 me-2 bi-person-circle"></i>Pino Palladino<i class="bi fs-6 ms-2 bi-caret-down-fill"></i></div>
        </div>
        <div class="mb-3">
            <p class="m-0"><i class="bi me-2 text-primary bi-patch-check-fill"></i>Verified Artist</p>
            <h1 class="fw-bold m-0 mb-3 ">${artistName}</h1>
            <h5 class="fs-6 m-0">${numbersOfFans} ascoltatori mensili</h5>
        </div>
    </div>`
}

function containerSongs(songTitle, album, songDuration, rank, track, artistName, i) {
    return `
    <div class="songList text-white d-flex align-items-center">
        <p class="m-0 mx-2 ">${i + 1}</p>
        <button class="musicPlayButton mx-3 "onclick='playMusic("${track}", "${songTitle}", "${artistName}")'><i class="bi fs-2 playBB bi-play-circle-fill"></i></button>
        <div class="d-flex w-100 ms-3 align-items-center my-3">
            <div class="col-6 d-flex align-items-center"><img src="${album}"><h5 class="mx-2">${songTitle}</h5></div>
            <h5 class="col-3">${rank}</h5>
            <h5 class="col-3">${updateTime(songDuration*10)}</h5>
        </div>
    </div>`
}



let audio = new Audio()

function playMusic(song, title, artist) {
  document.querySelector(".SongTitle").innerText = title
  document.querySelector(".ArtistName").innerText = artist
  let m = song
  audio.src = m;
  audio.play();
  audio.addEventListener("loadedmetadata", () => {
    document.querySelector(".totalDuration").innerHTML = `${updateTime(audio.duration)}`;
    let maxVolume = audio.volume = 1
    // minVolume = (audio.volume = 0)
    // if (mouseIsDown === true) {
    //   let v = (volume.offsetWidth/volumeRange.offsetWidth) * (maxVolume +2)
    //   return 
    // }
    setInterval(() => {
      if (volume.offsetWidth > (volumeRange.offsetWidth*50)/100 && volume.offsetWidth !== 0){
        document.querySelector('.bi-volume-up').style.display = "block"
        document.querySelector('.bi-volume-up').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-down').style.display = "none"
        document.querySelector('.bi-volume-mute').style.display = "none"
      } else {              
        document.querySelector('.bi-volume-up').style.display = "none"
        document.querySelector('.bi-volume-down').style.display = "block"
        document.querySelector('.bi-volume-down').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-mute').style.display = "none"}
      if (volume.offsetWidth === 0){
        document.querySelector('.bi-volume-mute').style.display = "block"
        document.querySelector('.bi-volume-mute').onclick = () => {audio.volume = 0, volume.style.width = "0"}
        document.querySelector('.bi-volume-up').style.display = "none"
        document.querySelector('.bi-volume-down').style.display = "none"
      }
      if (mouseIsDownOnVolume === true) {
        console.log("pppppp");
        let x = ((volume.offsetWidth/volumeRange.offsetWidth)) * maxVolume
        return audio.volume = x
        // console.log("p", volume.offsetWidth);
        // console.log("t", volumeRange.offsetWidth);
      }
    },100)
    setInterval(() => {
      if (mouseIsDownOnPlayer === true) {
        console.log("pppppp");
        let x = (player.offsetWidth/playerRange.offsetWidth) *audio.duration
        return audio.currentTime = x
      }
      // console.log("q", player.offsetWidth);
      // console.log("e", playerRange.offsetWidth);
      // console.log("r", audio.duration);
      document.querySelector(".current-time").innerHTML = `${updateTime(audio.currentTime)}`;
      player.style.width = `${Math.round((audio.currentTime/audio.duration)*playerRange.offsetWidth)}px`
    }, 10)
  })  
}

let liked = document.querySelector(".liked")
let like = document.querySelector(".like")

let playing = document.querySelector(".play")
let paused = document.querySelector(".pause")


playing.onclick = () => {
  audio.play()
}
paused.onclick = () => {
  audio.pause()
}

audio.onpause= () => {
  playing.style.display = 'block'
  paused.style.display = 'none';
};

audio.onplay = () => {
  playing.style.display = 'none'
  paused.style.display = 'block';
};

let rep = document.querySelector(".repeat")
let rep1 = document.querySelector(".repeat1")

rep.onclick = () => {
    rep.style.display = 'none'
    rep1.style.display = 'block'
    rep1.style.color = 'green'
    audio.loop = false
}

function enableLoop() { 
  audio.loop = true;
} 

rep1.onclick = () => {
    enableLoop()
    rep.style.display = 'block'
    rep1.style.display = 'none'
}




// The mousemove event is fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it.
//Mousedown is fired while the button is initially pressed, mouseup is fired when the button is released.


const volume = document.querySelector('.volume');
const volumeRange = document.querySelector('.volume-range');
const volumeContainer = document.querySelector('.volume-container');
const volumeBtn = document.querySelector('.volume-button');
const volumeRangeWidth = volumeRange.getBoundingClientRect().width;

const player = document.querySelector('.player');
const playerRange = document.querySelector('.player-range');
const playerContainer = document.querySelector('.player-container');
const playerBtn = document.querySelector('.player-button');
const playerRangeWidth = playerRange.getBoundingClientRect().width;


volumeContainer.addEventListener("mouseup", up);
volumeContainer.addEventListener("mousedown", downOnVolume);
volumeContainer.addEventListener("mousedown", volumeSlide);
volumeContainer.addEventListener("mousemove", volumeSlide);

playerContainer.addEventListener("mouseup", up);
playerContainer.addEventListener("mousedown", downOnPlayer);
playerContainer.addEventListener("mousedown", playerSlide);
playerContainer.addEventListener("mousemove", playerSlide);


let mouseIsDownOnPlayer = false;
let mouseIsDownOnVolume = false

function downOnVolume() {
  mouseIsDownOnVolume = true;
}

function downOnPlayer() {
  mouseIsDownOnPlayer = true;
}

function up() {
  mouseIsDownOnPlayer = false;
  mouseIsDownOnVolume = false
}
function volumeSlide(event) {
  if (mouseIsDownOnVolume === true) {
    let x = Math.floor(event.offsetX );
    let pointer = volume.style.width = (x) + 'px';
    console.log(pointer);
  }
}

function playerSlide(event) {
  if (mouseIsDownOnPlayer === true) {
    let x = Math.floor(event.offsetX);
    let pointer = player.style.width = (x) + 'px';
    console.log(pointer);
  }
}

function updateTime(time) {
  const seconds = String(Math.floor(time % 60) || 0).padStart("2", "0");
  const minutes = String(Math.floor(time / 60) || 0).padStart('0');
  let timer = minutes + ":" + seconds
  return timer
}
