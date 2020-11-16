let loader= `<h1 class='load'>LOADING...</h1>`
document.querySelector('#app').insertAdjacentHTML('afterbegin',loader)
fetch("https://restcountries.eu/rest/v2/all")
.then(response=>{
    if (response.ok){
    return response.json();
} else {
    return Promise.reject(response);
}

}).then(data=>{
    console.log(data);
    const countryData= data.map(country=>{
        return `
        <div class='card'>
        <img src=${country.flag} width='100px' height='100px'/>
        <p>Country Name: ${country.name}</p>
        <p>Population: ${country.population}</p>
        <p>Capital: ${country.capital}</p>
        <p>Continent: ${country.region}</p>
        <p>Top Currency (symbol): ${country.currencies.map(curr=>{return `${curr.name} (${curr.symbol})`})} </p>
        <p>Languages Spoken: ${country.languages.map(lang=> lang.name)}</p>
        </div>`;
    }).join('')
    document.querySelector('.load').remove()
    document.querySelector('#app').insertAdjacentHTML('afterbegin',countryData)
}).catch (err=>{
    console.log(err)
    window.alert(`Something went wrong: ${err.status} error`)
    document.querySelector('.load').remove()
    let errr= `<h1 class='error'> Something went wrong:  ${err.status} error</h1>`
    document.querySelector('#app').insertAdjacentHTML('afterbegin',errr)
})