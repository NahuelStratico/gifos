// ============== Tomo los ID

// Id Pantalla 1
const pantallaCrearG = document.getElementById('crearGifos');
const btnComenzar = document.getElementById('comenzar');

// Id Pantalla 2
const pantallaPrecaptura = document.getElementById('pantallaPrecaptura');
const btnCapturar = document.getElementById('recordButton');

// Id Pantalla 3
const pantallaListo = document.getElementById('pantallaCaptura');
const btnCaptura = document.getElementById('btnCaptura');

// Id Pantalla 4
const pantallaPrevia = document.getElementById('vistaPrevia');
const btnRepetir = document.getElementById('btnRepCap');
const btnSubir = document.getElementById('btnSubir');

// Id Pantalla 5 / Subida con Exito
const pantallaExito = document.getElementById('exito');
const btnListoExito = document.getElementById('btn_listoExito');



// ===================== Pantalla 1  / Inicio

btnComenzar.addEventListener('click', () => {
    pantallaCrearG.style.display = 'none';
    pantallaPrecaptura.style.display = 'block';

    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(stream => video.srcObject = stream)
        .catch(console.error);
});

// ====================== Pantalla 2  / Capturar

// btnCapturar.addEventListener('click', () => {
//     pantallaPrecaptura.style.display = 'none';
//     pantallaListo.style.display = 'block';


// });


// ======================  Pantalla 3 /   -- Subir || Repetir
// btnCaptura.addEventListener('click', () => {
//     pantallaListo.style.display = 'none';
//     pantallaPrevia.style.display = 'block';

// });


// ===================== Repetir Guifo

btnRepetir.addEventListener('click', () => {
    pantallaPrevia.style.display = 'none';
    pantallaPrecaptura.style.display = 'block';

    document.getElementById('parrafo').innerHTML = 'Un Chequeo Antes de Empezar';
    document.getElementById("recordButton").innerHTML = 'Capturar';
    document.getElementById("recordButton").style.background = '#F7C9F3';
    document.getElementById("camera").style.background = '#F7C9F3';
    document.getElementById('cronometro').style.display = 'none';

});

// ====================== Pantalla 4 /

// ===================== Pantalla Cargado con Exito
btnSubir.addEventListener('click',() => {

    pantallaPrevia.style.display = 'none';
    pantallaExito.style.display = 'block';

});


// ==================== Boton que te lleva a Pantalla de inicio
btnListoExito.addEventListener('click', () => {
    pantallaExito.style.display = 'none';
    pantallaCrearG.style.display = 'block';
});



// =========================== INICIANDO VIDEO =========================


var recording = false; //FLAG para indicar si se esta grabando, inicia como false.
var recorder; //objeto de la libreria de grabacion.
var video = document.getElementById("recording"); // elemento video para ver lo que se esta grabando.
var preview = document.getElementById("uploadedGIF"); // img que contendrá el preview.
const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&='; // key para usar la API de GIPHY.

video.style.display = 'block';


async function capturaGIF() {
    if (recording) { // si se esta grabando se detiene la grabacion
        result = await stopRecording();
        
        // console.log(data);


        // uploadGIF(result); // PASO 4 se carga el GIF grabado
    } else { // si no se esta grabando se inicia la grabacion

        startRecord();
    }
}

async function startRecord() {
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

    // Reemplazo boton Capturar por LISTO.
    let p = document.getElementById('parrafo').innerHTML = 'Capturando Tu Gifo';
    document.getElementById("recordButton").innerHTML = 'Listo';
    document.getElementById("recordButton").style.background = '#FF6161';
    document.getElementById("camera").style.background = '#FF6161';
    // document.getElementById('cronometro').style.display = 'block';

    video.srcObject = stream;
    video.play();
    //----------------FIN PASO 2---------------------------------

}

async function stopRecording() {
    recorder.stopRecording();
    recording = false; //el FLAG vuelve a FALSE para detener la grabación. 
    video.pause();
    pantallaPrecaptura.style.display = 'none';
    pantallaPrevia.style.display = 'block';
    //----------------PASO 3---------------------------------           
    let blob = await recorder.getBlob();
    let url = URL.createObjectURL(blob);
    
    console.log(url);

    let img = document.getElementById('resume');

    img.src = url;
    
    document.getElementById('cronometro').style.display ='block';

    recorder.destroy();
    return blob;

    //----------------FIN PASO 3---------------------------------

}



async function uploadGIF(recordedGIF) { //PASO 4----------------
    
    console.log('se esta ejecutando la funcion uploadGIF');
    
    let form = new FormData();
    form.append("file", recordedGIF, 'example.gif');
    let result = await fetch('https://upload.giphy.com/v1/gifs?api_key=' + apiKey, {
        method: 'POST',
        body: form
    });
    if (result.status == 200) {
        let parsedResult = await result.json();
        let gifId = parsedResult.data.id;
        alert("GIF cargado con exito");
        console.log(gifId);
        showUploadedGIF(gifId);
        video.style.display = 'none';
    } else {
        alert("hubo un error al cargar el GIF");
        console.log(result);
    }
}

async function showUploadedGIF(gifId) { //PASO 5---------------------------

    var uploadedGIF = await fetch('https://api.giphy.com/v1/gifs/' + gifId + '?api_key=' + apiKey);

    if (uploadedGIF.status == 200) {
        let uploadedGIFData = await uploadedGIF.json();
        localStorage.setItem('gif ' + gifId, JSON.stringify(uploadedGIFData));

        // A PARTIR DE ACA ES OPCIONAL

        preview.style.display = 'block';
        preview.src = uploadedGIFData.data.images.fixed_height.url;

        // document.getElementById('cronometro').style.display = 'none';

        // document.getElementById("recordButton").innerHTML = 'Repetir Captura';



    }
}


