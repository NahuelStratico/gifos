// Capturo los ID
const input = document.getElementById('search');
const button = document.getElementById('btnsearch');
const panelKey = document.getElementById('keyword');
const tag = document.getElementById('search-tags');
const apiKey = '3JTbGwFdhczzKFywhzOWVOWUJjsAtfzH&=';

// Deshabilito el boton buscar
button.disabled = true;

// Habilito el boton de busqueda, cuando toco una tecla
input.addEventListener('keyup', () => {
    button.disabled = false;
    
    panelKey.style.display = 'block';

    if(document.body.classList =='dark'){
        button.classList.add('btn_bg_night');
        button.classList.remove('btn_bg_day');
    }else{
        button.classList.add('btn_bg_day');
        button.classList.remove('btn_bg_night');
    }

    if(input.value == ''){
        button.classList.remove('btn_bg_day');
        button.classList.remove('btn_bg_night');
        panelKey.style.display = 'none';
    }
});

input.addEventListener('keyup', searchTag);
// searchTag();

function searchTag(input){

    const keyword = input.value;
    const path = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=3`;

    fetch(path)
        .then(res => res.json())
        .then(json => {
            console.log(json.data[0].title);

        let resultadoHTML = '';
        json.data.forEach(function(obj) {
            console.log(obj);
            const title = obj.title;
            const url = obj.images.fixed_width.url;
        
            resultadoHTML += `
                <li class="keysugerida">
                   <a href="${url}" class="key"> ${title}</a>
                </li>
            `;
        });

        panelKey.innerHTML = resultadoHTML;
    }).catch(function(error) {
        console.log(error.message);
    });
}



// async function searchTag(input){
    
//     const keyword = input.value;
//     fetchURL(`https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${apiKey}&limit=10`);
    
//     fetch(path)
//         .then(res => res.json())
//         .then(json => {
//             console.log(json.data[0].images.fixed_width.url);
//     searchResults.data.map(element => {
//         element.title && element.title !== " " && element.title !== "&emsp;"
//             ? $searchTags.appendChild(`
//             <div>
//                 <button type="button" class="btn_tag">
//                     <span class="btn__text-container">
//                         ${element.title}
//                     </span>
//                 </button>
//             </div>
//             `)
//             : null;
//     });

// }

