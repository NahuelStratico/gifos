// let comenzar = document.getElementById('comenzar');

document.addEventListener("DOMContentLoaded", function() {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(stream => video.srcObject = stream)
        .catch(console.error);
});


document.getElementById('capturar').addEventListener('click', function() {
    canvas.getContext("2d").drawImage(video, 0, 0, 500, 377);
});