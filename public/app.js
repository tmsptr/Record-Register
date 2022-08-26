const form = document.querySelector('#searchForm');
const body = document.querySelector('body');
const results = document.querySelector('#results');
const header1 = document.createElement('h2');
header1.innerText = 'DESCRIPXION';
const header2 = document.createElement('h2');
header2.innerText = 'RECORDS';

//body.style.backgroundColor = '#f9dcc4';
const descriptionList = document.createElement('ul');
const recordsList = document.createElement('ul');

// const title = document.querySelector('#title');
// const year = document.querySelector('#year');
//const recordSchema = mongoose.model('Record', RecordSchema);

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

function capitalize(input) {
    const words = input.split(' ');
    const CapitalizedWords = [];
    words.forEach(element => {
    CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));
    });
    return CapitalizedWords.join(' ');
    }

const loadDescription = async(name) => {
    const config = {params: {s: name}};
    const records = await axios.get('https://theaudiodb.com/api/v1/json/2/search.php?', config)
    .then(function(records) {
        for(let i = 0; i < records.data.artists.length; i++) {
            console.log(records.data.artists[i]);
            if(records.data.artists[i].strArtistBanner) {
                const img = document.createElement('img');
                img.src = records.data.artists[i].strArtistBanner;
                descriptionList.append(img);
            }
            const li = document.createElement('li');
            li.innerText = records.data.artists[i].strBiographyEN;
            descriptionList.append(li);
            results.append(descriptionList);
        }
    })
}
const loadRecords = async(name) => {
    const config = {params: {s: name}};
    const records = await axios.get('https://theaudiodb.com/api/v1/json/2/discography.php?', config)
    .then(function(records) {
        for(let i = 0; i < records.data.album.length; i++) {
            console.log(records.data.album[i]);
            const form = document.createElement('form');
            form.setAttribute('action', 'index');
            form.setAttribute('method', 'POST');
            
            const band = document.createElement('input');
            band.setAttribute('name', 'music[artistName]');
            const title = document.createElement('input');
            title.setAttribute('name', 'music[recordName]')
            const year = document.createElement('input');
            year.setAttribute('name', 'music[recordYear]')
            const btn = document.createElement('button');
            btn.textContent = 'SAVE';
            band.value = capitalize(name);
            title.value = `${records.data.album[i].strAlbum}`;
            year.value = `${records.data.album[i].intYearReleased}`;
            form.append(band);
            form.append(title);
            form.append(year);
            form.append(btn);
            body.append(form);
        }
    })    
}

const loadAll = async(name) => {
    results.append(header1);
    await loadDescription(name);
    results.append(header2);
    await loadRecords(name);
}
