// Capturo los ID
const input = document.getElementById('search');
const button = document.getElementById('btnsearch');
const panelKey = document.getElementById('keyword');

// Deshabilito el boton buscar
button.disabled = true;

// Habilito el boton de busqueda, cuando toco una tecla
input.addEventListener('keyup', () => {
    button.disabled = false;
    panelKey.style.display = 'block';
    console.log('addevent de input');
});