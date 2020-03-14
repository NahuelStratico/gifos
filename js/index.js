// --------------------------------- Consumo de API (GHIPY)


// ----------- Buscador de GIF ---------------- ////////////

let searchForm = document.getElementById('search_form');
let searchInput = document.getElementById('search');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value;
    search(query);
});


function search(query) {
    const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
    const contenido = document.getElementById('contenido');
    fetch(path)
        .then(res => res.json())
        .then(json => {
            console.log(json.data[0].images.fixed_width.url);

            let resultadoHTML = '';
            json.data.forEach(function(obj) {
                console.log(obj);
                const url = obj.images.fixed_width.url;
                let width = obj.images.fixed_width.width;
                let height = obj.images.fixed_width.height;
                // let title = obj.title;
                resultadoHTML += `<img class="item" src="${url}" width="${width}" height="${height}">`;
            });

            contenido.innerHTML = resultadoHTML;
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
            console.log(object);
            const url = object.images.fixed_width.url;
            let width = object.images.fixed_width.width;
            let height = object.images.fixed_width.height;
            // let title = obj.title;
            resultadoHTML += `<img class="item" src="${url}" width="${width}" height="${height}">`;
        });
        trending.innerHTML = resultadoHTML;

    }).catch(function(error) {
        console.log(error.message);
    });






// document.addEventListener("DOMContentLoaded", init);

// function init() {
//     document.getElementById("btnsearch").addEventListener("click", ev => {
//         ev.preventDefault(); // stop the page reload
//         let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=`;
//         let str = document.getElementById("search").value.trim();
//         url = url.concat(str);
//         console.log(url);
//         fetch(url)
//             .then(response => response.json())
//             .then(content => {
//                 // data , pagination , meta
//                 console.log(content.data);
//                 console.log('META', content.meta);
//                 let fig = document.createElement('figure');
//                 let img = document.createElement('img');
//                 let fc = document.createElement('figcaption');
//                 img.src = content.data[0].images.downsized.url;
//                 img.alt = content.data[0].title;
//                 fc.textContent = content.data[0].title;
//                 fig.appendChild(img);
//                 fig.appendChild(fc);
//                 let out = document.querySelector('.out');
//                 out.insertAdjacentElement('afterbegin', fig);
//                 document.querySelector('#search').value = '';
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     });
// }


// 


// --------------------------------------  dropdown tema

$(document).on('ready', function() {

    var submenu = $('#submenu');

    $('#btn-sub').click(function() {
        // Mostrar submenu
        submenu.slideToggle();
    });
});


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








//  Dark Mode

// const btnDay = document.querySelector('#day');
// const btnNight = document.querySelector('#night');

// inicializo la clase active
// btnDay.classList.add('active');
// btnNight.classList.add('dark');


// cuando hago click en modo dia pasa lo siguiente:
// btnDay.addEventListener('click', () => {
// document.body.classList.add('active');
// document.body.classList.remove('dark');
//     btnDay.classList.add('active');
//     btnNight.classList.remove('dark');
// });

// // cuando hago click en modo noche pasa lo siguiente:
// btnNight.addEventListener('click', () => {
// document.body.classList.add('dark');
// document.body.classList.remove('active');
//     btnNight.classList.add('dark');
//     btnDay.classList.remove('active');

// });