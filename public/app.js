//const btn = document.querySelector('#button');
const form = document.querySelector('#searchForm');
const body = document.querySelector('body');
const results = document.querySelector('#results');
const header1 = document.createElement('h2');
header1.innerText = 'DESCRIPXION';
const header2 = document.createElement('h2');
header2.innerText = 'RECORDS';

body.style.backgroundColor = '#f9dcc4';
const descriptionList = document.createElement('ul');
const recordsList = document.createElement('ul');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    descriptionList.innerHTML = '';
    recordsList.innerHTML = '';

    //console.dir(form) // to look up query! and other elements
    const query = form.elements.query.value;
    //const query = document.querySelector("#query").value;
    
    form.elements.query.value = '';
    
    loadAll(query);

})

// const findShow = async(name) => {
    
//     const config = { params: {s : name}}
//     const res = await axios.get(`https://theaudiodb.com/api/v1/json/2/search.php?`, config);
//     const res2 = await axios.get(`https://theaudiodb.com/api/v1/json/2/discography.php?`, config);

    
//     for(let i = 0; i < res.data.artists.length; i++) {
//         console.log(res.data.artists[i]);
//         const li = document.createElement('li');
//         const img = document.createElement('img');
//         img.src = res.data.artists[i].strArtistBanner;
//         li.innerText = res.data.artists[i].strBiographyEN;
//         descriptionList.append(img);
//         descriptionList.append(li);
//         body.append(descriptionList);
//     }
   
//     for(let i = 0; i < res2.data.album.length; i++) {
//         console.log(res2.data.album[i]);
//         const li = document.createElement('li');
//         li.innerText = res2.data.album[i].strAlbum;
//         recordsList.append(li);
//         body.append(recordsList);
//     }
// }

const loadDescription = async(name) => {
    const config = {params: {s: name}};
    const res = await axios.get('https://theaudiodb.com/api/v1/json/2/search.php?', config)
    .then(function(res) {
        for(let i = 0; i < res.data.artists.length; i++) {
            console.log(res.data.artists[i]);
            if(res.data.artists[i].strArtistBanner) {
                const img = document.createElement('img');
                img.src = res.data.artists[i].strArtistBanner;
                descriptionList.append(img);
            }
            const li = document.createElement('li');
            li.innerText = res.data.artists[i].strBiographyEN;
            descriptionList.append(li);
            results.append(descriptionList);
        }
    })
}
const loadRecords = async(name) => {
    const config = {params: {s: name}};
    const res = await axios.get('https://theaudiodb.com/api/v1/json/2/discography.php?', config)
    .then(function(res) {
        for(let i = 0; i < res.data.album.length; i++) {
            console.log(res.data.album[i]);
            const li = document.createElement('li');
            li.innerHTML = `<a href='/details'>${res.data.album[i].strAlbum}</a> - ${res.data.album[i].intYearReleased}`;
            recordsList.append(li);
            results.append(recordsList);
        }
    })    
}

const loadAll = async(name) => {
    results.append(header1);
    await loadDescription(name);
    results.append(header2);
    await loadRecords(name);
}
