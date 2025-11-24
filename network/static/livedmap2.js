// city data
const cityData = [
  { city: "Cape Town", lat: -33.9249, lon: 18.4241, people: ["John Doe"] },
  { city: "London", lat: 51.5072, lon: -0.1276, people: ["Jane Doe"] },
  { city: "New York", lat: 40.730610, lon: -73.935242, people: ["James Doe"] },
  { city: "Perth", lat: -31.953512, lon: 115.857048, people: ["Julie Doe"] }
];

document.addEventListener("DOMContentLoaded", () => {


// fetch world countries GeoJSON
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then(worldData => {
        const countries = ChartGeo.topojson.feature(worldData, worldData.objects.countries).features;

        const ctx = document.getElementById('livedMap').getContext('2d');

        const livedMapChart = new Chart(ctx, {
          type: 'bubbleMap',
          data: {
            datasets: [{
              label: "Cities Lived In",
              outline: {type: 'FeatureCollection', features: countries},
              showOutline: true,
              showGraticule: false,
              data: cityData.map(c => ({...c, x: c.lon, y: c.lat})),
              pointRadius: 6,
              pointHoverRadius: 10,
              borderColor: 'rgb(175,33,61)',
              borderWidth: 1,
              pointBackgroundColor: ctx => {
                const numPeople = ctx.raw.people.length;
                const minOpacity = 0.35;
                const maxOpacity = 1;
                const minPeople = Math.min(...cityData.map(c => c.people.length));
                const maxPeople = Math.max(...cityData.map(c => c.people.length));
                const opacity = minOpacity + (numPeople - minPeople) / (maxPeople - minPeople) * (maxOpacity - minOpacity);
                return `rgba(175,33,61,${opacity})`;
              }
            }]
          },
          options: {
            maintainAspectRatio: false,
            plugins: {
              legend: {display: false},
              tooltip: {
                callbacks: {
                  title: ctx => ctx[0].raw.city,
                  label: ctx => `People: ${ctx.raw.people.join(', ')}`
                }
              },
            },
            scales: {projection: {axis: 'xy', projection: 'equalEarth'}}
          },
        });

      });
});