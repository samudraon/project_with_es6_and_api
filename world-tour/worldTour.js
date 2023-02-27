const loadAllData = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            showAllData(data.slice(0, 9));
        });
};

const showAllData = (countries) => {
    const sectionContainer = document.getElementById('countries-info');
    sectionContainer.innerHTML = '';
    countries.forEach(country => {
        console.log(country.cca2);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-96 w-full bg-base-100 shadow-2xl">
            <figure class="px-10 pt-10"><img src="${country.flags.png}" alt="Shoes" class="rounded-xl" /></figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${country.name.common}</h2>
                <p>Population: ${country.population}</p>
                <div class="card-actions">
                    <button onclick="showDetails('${country.cca2}')" class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
        `
        sectionContainer.appendChild(div);
    });
};

const showDetails = (id) => {
    const URL = `https://restcountries.com/v3.1/alpha/${id}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => console.log(data));
}

loadAllData();

const showAllDataTogether = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
            showAllData(data);
        });
}