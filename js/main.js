// Local variables
let videoRecorder;
let newGifId = "";
let gifRecorder;
let gifSrc;
let recording = false;

// Captando elementos del DOM
const parte1 = document.getElementById('parte1');
const parte2 = document.getElementById('parte2');
const parte3 = document.getElementById('parte3');
const parte4 = document.getElementById('parte4');
const titleHeader = document.getElementById("title_header");
const createGif = document.getElementById("createGifos");
const btnComenzar = document.getElementById('comenzar');
const startRecording = document.getElementById("start-recording");
const stopRecording = document.getElementById("stop-recording");
const againRecording = document.getElementById('again-recording');
const uploadGif = document.getElementById('upload-gif');
const videoPreview = document.getElementById('video-recording');


btnComenzar.addEventListener('click', () => {
    parte1.style.display = 'none';
    parte2.style.display = 'block';

    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(stream => videoPreview.srcObject = stream)
        .catch(console.error);
});

startRecording.addEventListener('click', () => {
    titleHeader.innerHTML = "Capturando tu Guifo";

   
});





// Funciones generales

function hideElements(...elements){
    elements.forEach(element => {
        element.classList.add('hidden');
    });
}

function showElements(...elements){
    elements.forEach(element => {
        element.classList.remove('hidden');
    })
}