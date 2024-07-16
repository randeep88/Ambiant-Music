let audio = new Audio("./songs/1.mp3");
let songIndex = 0;
let seekbar = document.getElementById("seekbar");
let songlist = Array.from(document.getElementsByClassName("songdiv"));
let playbtn = document.getElementById("playbtn");
let listbtn = Array.from(document.getElementsByClassName("listbtn"));
let btndiv = document.getElementsByClassName("btndiv");
let mastersongname = document.getElementById("mastersongname");
let artistname = document.getElementById("artistname");
let album = document.getElementById("album");
let currentTime = document.getElementById("currentTime");
let duration1 = document.getElementById("duration");

let songs = [
  {
    name: "Dilemma",
    artist: "Sidhu Moose Wala",
    path: "./songs/1.mp3",
    coverpath: "cover/1.jpg",
  },
  {
    name: "60 Pound",
    artist: "Gulab Sidhu",
    path: "./songs/2.mp3",
    coverpath: "cover/2.jpg",
  },
  {
    name: "Air Hostess",
    artist: "Arjan Dhillon",
    path: "./songs/3.mp3",
    coverpath: "cover/3.jpg",
  },
  {
    name: "Car Culture",
    artist: "Parmish Verma",
    path: "./songs/4.mp3",
    coverpath: "cover/4.jpg",
  },
  {
    name: "Filter",
    artist: "Gulab Sidhu",
    path: "./songs/5.mp3",
    coverpath: "cover/5.jpg",
  },
  {
    name: "Goin Off",
    artist: "Karan Aujla",
    path: "./songs/6.mp3",
    coverpath: "cover/6.jpg",
  },
  {
    name: "Just Listen",
    artist: "Sidhu Moose Wala",
    path: "./songs/7.mp3",
    coverpath: "cover/7.jpg",
  },
  {
    name: "Tauba Tauba",
    artist: "Karan Aujla",
    path: "./songs/8.mp3",
    coverpath: "cover/8.jpg",
  },
];

songlist.forEach((element, i) => {
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].name;
  element.getElementsByClassName("artist")[0].innerHTML = songs[i].artist;
});

playbtn.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    playbtn.classList.remove("fa-play-circle");
    playbtn.classList.add("fa-pause-circle");
  } else {
    audio.pause();
    playbtn.classList.add("fa-play-circle");
    playbtn.classList.remove("fa-pause-circle");
  }
});

function toMinutes(){
if(audio.duration){
    let currentMin = Math.floor(audio.currentTime/60)
    let currentSec = Math.floor(audio.currentTime - currentMin * 60)
    let durationMin = Math.floor(audio.duration/60)
    let durationSec = Math.floor(audio.duration - durationMin * 60);

    if(durationMin < 10){
        durationMin = "0" + durationMin;
    }
    if(durationSec < 10){
        durationSec = "0" + durationSec;
    }
    if(currentMin < 10){
        currentMin = "0" + currentMin;
    }
    if(currentSec < 10){
        currentSec = "0" + currentSec;
    }
    currentTime.innerHTML = currentMin + ":" + currentSec;
    duration1.innerHTML = durationMin + ":" + durationSec;
}else{
    currentTime.innerHTML = "00" + ":" + "00";
    duration1.innerHTML = "00" + ":" + "00";
}
    
}

audio.addEventListener("timeupdate", () => {
  seekbar.value = parseInt((audio.currentTime / audio.duration) * 2000);
  toMinutes()
});

seekbar.addEventListener("change", () => {
  audio.currentTime = (seekbar.value * audio.duration) / 2000;
});

function iconChange() {
    Array.from(document.getElementsByClassName("listbtn")).forEach((element)=>{
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle")
    })
}

function icon2(){
    playbtn.classList.remove("fa-play-circle");
    playbtn.classList.add("fa-pause-circle");   
}

function icon3(){
    listbtn.target.classList.remove("fa-play-circle")
    listbtn.target.classList.add("fa-pause-circle")
}

listbtn.forEach((element, i) => {
  console.log(element, i);
  element.addEventListener("click", (e) => {
    iconChange();
    console.log(e.target.id);
    let songIndex = parseInt(e.target.id);
    audio.src = `./songs/${songIndex + 1}.mp3`;
    album.src = songs[songIndex].coverpath;
    mastersongname.innerHTML = songs[songIndex].name;
    artistname.innerHTML = songs[songIndex].artist;
    audio.currentTime = 0
    audio.play();
    console.log(audio.src);
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");  
    icon2()
  });
});



let previous = document.getElementById("previous");
let next = document.getElementById("next");

next.addEventListener("click", ()=>{
    if(songIndex >= 8){
        songIndex =  0;
    }else{
        songIndex += 1;
    }
    audio.src = `./songs/${songIndex + 1}.mp3`;
    album.src = songs[songIndex].coverpath;
    mastersongname.innerHTML = songs[songIndex].name;
    artistname.innerHTML = songs[songIndex].artist;
    audio.currentTime = 0
    audio.play();
    icon2();
})

previous.addEventListener("click", ()=>{
    if(songIndex <= 0){
        songIndex =  0;
    }else{
        songIndex -= 1;
    }
    audio.src = `./songs/${songIndex + 1}.mp3`;
    album.src = songs[songIndex].coverpath;
    mastersongname.innerHTML = songs[songIndex].name;
    artistname.innerHTML = songs[songIndex].artist;
    audio.currentTime = 0
    audio.play();
    icon2();
})
