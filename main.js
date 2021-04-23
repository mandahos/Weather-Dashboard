fetch (
    'http://api.openweathermap.org/data/2.5/forecast?q=bluffdale&units=imperial&us&mode=&appid=04f110a92c4a584f67fb0f945cc1f6e0'
)

.then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });

var searchEl = document.querySelector('#search');
var citySearch = document.querySelector('#city-search');
var cityHistory = document.querySelector('#city-history');

searchEl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (citySearch.value.length === '') return;
    cityHistory.innerHTML += '<li>' + citySearch.value + '</li>';

    citySearch.value = '';
    
    localStorage.setItem('citySearch', cityHistory.innerHTML);
}, false);

var saved = localStorage.getItem('citySearch');

if (saved) {
    cityHistory.innerHTML = saved;
}
