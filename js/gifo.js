var recording = false; //FLAG para indicar si se esta grabando, inicia como false.
var portador; // variable que almacenará el gif para paserselo al upload.
var url; // Guarda la URL del Guifo.
let gifId=''; // Variable que guarda el ID del Guifo.
var recorder; //objeto de la libreria de grabacion.
var video = document.getElementById("video-start"); // elemento video para ver lo que se esta grabando.
var preview = document.getElementById("uploadedGIF"); // img que contendrá el preview.
const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&='; // key para usar la API de GIPHY.
var title_header = document.getElementById('title_header');
var $start = document.getElementById('start-recording');
var $stop = document.getElementById('stop-recording');
var $upload = document.getElementById('stage-upload');
var $imgPrevia = document.getElementById('img-previa');
var $uploadRecording = document.getElementById('upload-gifo');
const gifContainer = document.getElementById('gifos_container');
const misGifos = document.getElementById('my-gifs-grid');
const cameraIcon = document.getElementById('camera');
const btn_final = document.getElementById('btn_exito__listo');
const btnCopiarEnlace = document.getElementById('copiarEnlace');
const btnRepCap = document.getElementById('repetir-gifo');
const loadingBar = document.getElementById('progress');



// ID STATE
const btnComenzar = document.getElementById('comenzar');
const state1 = document.getElementById('crearGifo');
const state2 = document.querySelector('.crear-gif');
const state3 = document.getElementById('captura');
const state4 = document.getElementById('subiendo');
const stateExito = document.getElementById('exito');
const img_final = document.getElementById('img_final');

// Ocultando y mostrando las pantallas
btnComenzar.addEventListener('click', () => {
    ocultar(state1);
    mostrar(state2);
    $stop.style.display = 'none';

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
    .then(stream => video.srcObject = stream)
    .catch(console.error);

});
// btn final
btn_final.addEventListener('click', () => {
    stateExito.style.display = 'none';
    state1.style.display = 'block';
    video.style.display = 'none';
});

// Boton que copia el enlace del gifo
btnCopiarEnlace.addEventListener('click',copiarEnlace);

// Boton repetir captura
btnRepCap.addEventListener('click', repeCap);


// =========================== VIDEO =========================


async function startRecord(){
    //----------------PASO 1---------------------------------
    var stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    //----------------FIN PASO 1---------------------------------
    video.style.display = 'block';
    preview.style.display = 'none';
    //----------------PASO 2---------------------------------
    recorder = new RecordRTCPromisesHandler(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 250
    });
    console.log(recording);
    recorder.startRecording();
    recording = true; //el FLAG cambia a true para indicar que se esta grabando.  
    console.log('diste click en START ', recording);
    video.srcObject = stream;
    video.play();
    //----------------FIN PASO 2---------------------------------
     // Reemplazo HTML.
     title_header.innerText = 'Capturando Tu Gifo';
     $start.style.display = 'none';
     $stop.style.display = 'block';
     cameraIcon.style.display= 'none';
}

async function stopRecording(){
    recorder.stopRecording();
    recording = false;
    console.log('diste click en STOP ', recording);
    video.pause();

    // Reemplazo HTML
    title_header.innerText = 'Vista previa';
    $stop.style.display = 'none';
    $upload.classList.remove('hidden');
    video.style.display = 'none';

     //----------------PASO 3---------------------------------           
    let blob = await recorder.getBlob();
    portador = blob;
    url = URL.createObjectURL(blob);
    console.log(url);
    $imgPrevia.classList.remove('hidden');
    $imgPrevia.src = url;
    recorder.destroy();
    return blob;
    //----------------FIN PASO 3---------------------------------
}

async function subir(){
    uploadGIF(portador);
}

async function uploadGIF(recordedGIF) { //PASO 4----------------

    progress();
    
    
    state3.style.display='none';
    state4.style.display= 'block';
    
    let form = new FormData();
    form.append("file", recordedGIF, 'my.gif');
    console.log('recorderGif desde uploadGIF ', recordedGIF);
    let result = await fetch('https://upload.giphy.com/v1/gifs?api_key=' + apiKey, {
        method: 'POST',
        body: form
    });
    if (result.status == 200) {
        let parsedResult = await result.json();
        // let gifId = parsedResult.data.id;
        gifId = parsedResult.data.id;
        console.log("GIF subido con exito");
        console.log(gifId);
        showUploadedGIF(gifId);

        // Paso url a la img final
        let url_final = URL.createObjectURL(portador);
        // img_final.style.display = 'block';
        img_final.src = url_final;
        // Modifico HTML
        video.style.display = 'none';
        state4.style.display= 'none';
        stateExito.style.display = 'block';

    } else {
        alert("hubo un error al cargar el GIF");
        console.log(result);
    }
    console.log('termino la funcion uploadGIF....ya paso el ALERT');
}

async function showUploadedGIF(gifId) { //PASO 5---------------------------

    console.log('Se esta guardando en el LOCALSTORAGE');

    var uploadedGIF = await fetch('https://api.giphy.com/v1/gifs/' + gifId + '?api_key=' + apiKey);

    if (uploadedGIF.status == 200) {
        let uploadedGIFData = await uploadedGIF.json();
        localStorage.setItem('gif ' + gifId, JSON.stringify(uploadedGIFData));

        // preview.style.display = 'block';
        // preview.src = uploadedGIFData.data.images.fixed_height.url;
        
        getGif();
    }
}

async function getGif(){

    let misGifosStorage = "";
    for(let i=0; i < localStorage.length; i++){
        if (localStorage.key(i).indexOf("gif") >= 0){
            let clave = localStorage.key(i);
            let objGuifos = JSON.parse(localStorage.getItem(clave));

            misGifosStorage += `
                <div class="mis_gifos">
                    <img src="${objGuifos.data.images.fixed_height.url}" alt="${objGuifos.data.title}"/>
                </div>
            `
        } 
    }

misGifos.innerHTML += misGifosStorage;
}

// =========================== FIN VIDEO =========================





// =========================== Funciones generales =========================

// Funcion Ocultar
function ocultar(...elements){
    elements.forEach(element => {
        element.classList.add('hidden');
    });
}
// Funcion Mostrar
function mostrar(...elements){
    elements.forEach(element => {
        element.classList.remove('hidden');
    });
}

// Funcion Repetir captura
function repeCap(){
    state2.style.display = 'none';
    state1.style.display = 'block';
}

// Funcion para copiar el enlace del gif
// function copiarEnlace(url) {
//     console.log(url);
//     if (!navigator.clipboard) {
//         fallbackCopyTextToClipboard(url);
//         return;
//     }
//     navigator.clipboard.writeText(url).then(function () {
//         alert('El enlace de tu Gifo se copio con exito, pegalo donde quieras.');
//         console.log('Async: Copying to clipboard was successful!');
//     }, function (err) {
//         console.error('Async: Could not copy text: ', err);
//     });
// }

// Barra loading

function progress(){
    let width = 1;
    var id = setInterval(frame, 60);
    function frame(){
        if(width >= 100){
            clearInterval(id);
        }else{
            width++;
            loadingBar.style.width = width + '%';
        }
    }
}

// Copiar link
function copyGifLink() {
    const tempElement = document.createElement("textarea");
    tempElement.value = `https://giphy.com/gifs/${gifId}`;
    tempElement.setAttribute("readonly", "");
    tempElement.style = 'display: "none"';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    alert('El enlace de tu Gifo se copio con exito, pegalo donde quieras.');
    console.log("Copied data to clipboard!");
    document.body.removeChild(tempElement);
}

// Descargar Gif
async function downloadGif() {
    const downloadUrl = `https://media.giphy.com/media/${gifId}/giphy.gif`;
    const fetchedGif = fetch(downloadUrl);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    const saveImg = document.createElement("a");
    saveImg.href = urlGif;
    saveImg.download = "guifo-download.gif";
    saveImg.style = 'display: "none"';
    document.body.appendChild(saveImg);
    saveImg.click();
    document.body.removeChild(saveImg);
}