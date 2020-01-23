// Consumo de API (GHIPY)

let apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH';

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnsearch").addEventListener("click", ev => {
        ev.preventDefault(); // stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                // data , pagination , meta
                console.log(content.data);
                console.log('META', content.meta);
                let fig = document.createElement('figure');
                let img = document.createElement('img');
                let fc = document.createElement('figcaption');
                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img);
                fig.appendChild(fc);
                let out = document.querySelector('.out');
                out.insertAdjacentElement('afterbegin', fig);
                document.querySelector('#search').value = '';
            })
            .catch(err => {
                console.log(err);
            })
    });
}


// dropdown tema

$(document).on('ready', function() {

    var submenu = $('#submenu')

    $('#btn-sub').click(function() {
        // Mostrar submenu
        submenu.slideToggle();
    })
});


//  Dark Mode

const btnDay = document.querySelector('#day');
const btnNight = document.querySelector('#night');

// inicializo la clase active
btnDay.classList.add('active');


// cuando hago click en modo dia pasa lo siguiente:
btnDay.addEventListener('click', () => {
    document.body.classList.add('active');
    document.body.classList.remove('dark');
    btnDay.classList.add('active');
    btnNight.classList.remove('dark');
});

// cuando hago click en modo noche pasa lo siguiente:
btnNight.addEventListener('click', () => {
    document.body.classList.add('dark');
    document.body.classList.remove('active');
    btnNight.classList.add('dark');
    btnDay.classList.remove('active');

});