// --------------------------------- Consumo de API (GHIPY)


// ----------- Buscador de GIF ---------------- ////////////

let searchForm = document.getElementById('search_form');
let searchInput = document.getElementById('search');

// GIF que cargan cuando el DOM este listo
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value;
    search(query);
    createTag(query); // Guardo en Array
    
    // Deshabilito el panel cuando se ejecuta una busqueda.
    document.getElementById('btnsearch').disabled = true;
    document.getElementById('keyword').style.display = 'none';

    searchInput.value ="";


});


function search(query) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
    const contenido = document.getElementById('contenido');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                // console.log(obj);
                const url = obj.images.fixed_width.url;
                // let width = obj.images.fixed_width.width;
                // let height = obj.images.fixed_width.height;
                let title = obj.title;
                resultadoHTML += `
            
                <div class="container_api_tendencia">
                    <img class="item" src="${url}"  width="286px" height="296px"/>
                    <p class="title_tendencia">${title}</p>
                </div>
                `;
            });

            contenido.innerHTML = resultadoHTML;
        }).catch(function(error) {
            console.log(error.message);
        });
}

// Funcion qu guarda la keyword en el array 
function createTag(keyword){
    let item = {
        valor:keyword
    }

    arrayTag.push(item);
    guardarTag();
    return item;
}

// Guardo en localStorage la keyword
function guardarTag(){
    localStorage.setItem('keyword', JSON.stringify(arrayTag));
    mostrarTag();
}

// Muestro el tag
function mostrarTag() {

    let resHTML="";
    arrayTag = JSON.parse(localStorage.getItem('keyword'));

    if(arrayTag === null){
        arrayTag = [];
    }else{
        arrayTag.forEach(indice => {
            resHTML += `
            <div class="tag_content">
               #${indice.valor}
            </div>
        `;
        })
        tagContainer.innerHTML = resHTML;
    }

}




// ===================== GIF Recomendados =====================

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const jonathan = 'Jonathan Vanness';
    const sailor = 'mercury';
    const fib = 'simpson';
    const unic = 'superman';

    jonVanness(jonathan);
    sailorMercury(sailor);
    fabFive(fib);
    unicornis(unic);
});

// #Vanness
function jonVanness(jonathan) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${jonathan}`;
    const vanness = document.getElementById('vanness');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                // console.log(obj);
                const url = obj.images.fixed_width.url;
                let title = obj.title;
                resultadoHTML += `
                
                <p>#${title}</p>
                <img class="img-vanness" src="${url}"/> 
                <button class="btnjonathan">
                    <a href="https://giphy.com/search/jonathan-van-ness" target="blank">Ver mas...</a>
                </button>
                
                `;
            });

            vanness.innerHTML = resultadoHTML;
        }).catch(function(error) {
            console.log(error.message);
        });

}

// #Sailor Mercury
function sailorMercury(sailor) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${sailor}`;
    const sailorM = document.getElementById('sailorM');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                // console.log(obj);
                const url = obj.images.fixed_width.url;
                // let width = obj.images.fixed_width.width;
                // let height = obj.images.fixed_width.height;
                let title = obj.title;
                resultadoHTML += `
                
                <p>#${title}</p>
                <img class="img-saylor" src="${url}"/> 
                <button class="btnSailor">
                    <a href="https://giphy.com/search/mercury" target="blank">Ver mas...</a>
                </button>
                
                `;
            });

            sailorM.innerHTML = resultadoHTML;
        }).catch(function(error) {
            console.log(error.message);
        });

}

// # Fab Fib
function fabFive(fib) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${fib}`;
    const fab = document.getElementById('fab');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                // console.log(obj);
                const url = obj.images.fixed_width.url;
                let width = obj.images.fixed_width.width;
                let height = obj.images.fixed_width.height;
                let title = obj.title;
                resultadoHTML += `
                
                <p>#${title}</p>
                <img class="img-fab" src="${url}"/> 
                <button class="btnFab">
                    <a href="https://giphy.com/search/simpson" target="blank">Ver mas...</a>
                </button>
                
                `;
            });

            fab.innerHTML = resultadoHTML;
        }).catch(function(error) {
            console.log(error.message);
        });
}

// # Unicorns
function unicornis(unic) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${unic}`;
    const unico = document.getElementById('unicorns');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            // console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                // console.log(obj);
                const url = obj.images.fixed_width.url;
                // let width = obj.images.fixed_width.width;
                // let height = obj.images.fixed_width.height;
                let title = obj.title;
                resultadoHTML += `
                
                <p>#${title}</p>
                <img class="img-uni" src="${url}"/> 
                <button class="btnUni">
                    <a href="https://giphy.com/search/superman" target="blank">Ver mas...</a>
                </button>
                
                `;
            });

            unico.innerHTML = resultadoHTML;
        }).catch(function(error) {
            console.log(error.message);
        });
}

// ------------- Tendencias ---------------- ////////////


const trendingApi = 'https://api.giphy.com/v1/gifs/trending?api_key=3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&limit=21&rating=G';
const trending = document.getElementById('trending');

fetch(trendingApi)
    .then(res => res.json())
    .then(json => {
        // console.log(json.data[0].images.fixed_width.url);

        let resultadoHTML = '';
        json.data.forEach(function(object) {
            // console.log(object);
            const url = object.images.fixed_width.url;
            // let width = object.images.fixed_width.width;
            // let height = object.images.fixed_width.height;
            let title = object.title;
            resultadoHTML += `
            <div class="container_api_tendencia">
                <img class="item" src="${url}" />
                <p class="title_tendencia">${title}</p>
            </div>
            `;
        });
        trending.innerHTML = resultadoHTML;

    }).catch(function(error) {
        console.log(error.message);
    });








// =============================== DARK MODE =========================================

// ------  dropdown tema

$(document).on('ready', function() {

    var submenu = $('#submenu');

    $('#btn-sub').click(function() {
        // Mostrar submenu
        submenu.slideToggle();
    });
});

// --------- Opciones Dark / Day

const btnDark = document.getElementById('night');
const btnDay = document.getElementById('day');

btnDark.addEventListener('click', () => {
    document.body.classList.add('dark');
    btnDark.classList.add('night');
    btnDay.classList.remove('active');
});

btnDay.addEventListener('click', () => {
    document.body.classList.remove('dark');
    btnDark.classList.remove('night');
    btnDay.classList.add('active');
});


// =============================== FIN #DARK MODE =========================================

// =============================== MIS GIFOS =======================================

const btnMisGifos = document.getElementById('btn_mis_gifos'); //Boton mis gifos
const body = document.querySelector('#contenedor_general'); // Contenedor de todo el body
const myGifos = document.getElementById('gifos_container');
const logo = document.getElementById('logo');
const img = document.getElementById('uploadedGIF');
const misGifos = document.getElementById('my-gifs-grid');

logo.addEventListener('click', () => {
    body.style.display = 'block';
    myGifos.classList.add('hidden');
});

btnMisGifos.addEventListener('click', () => {
    body.style.display = 'none';
    myGifos.classList.remove('hidden');
    getGif();
});

async function getGif(){

    // img.classList.remove('hidden');

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