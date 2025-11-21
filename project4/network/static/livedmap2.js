// city data
const cityData = [
  { city: "Cape Town", lat: -33.9249, lon: 18.4241, people: ["Kelly MacDevette","Megan Marx","Emma Chapman","Meghan Hitchcock","Santhuri Padayachee","Megan Manley","Robyn Blessie","Cathy Lohrentz","Aimee Houghting"] },
  { city: "Johannesburg", lat: -26.2041, lon: 28.0473, people: ["Kate de Gruchy","Claire Martin","Nicky Harraway","Jordan Magrobi","Sesetu Holomisa","Nicole Player","Samantha Lategan","Catherine Barrett", "Nolubabalo Da Trindade", "Anna Tchalov"] },
  { city: "London", lat: 51.5072, lon: -0.1276, people: ["Lizzy Platt","Caitlin Militz","Sarah te Riele", "Kristine Davies"] },
  { city: "Pietermaritzburg/Hilton", lat: -29.37044, lon: 30.233401, people: ["Tarah Wright","Chelsea Meiring","Lisha Govender","Kirsten Couling","Ashley Richardson","Chloë Begg"] },
  { city: "Istanbul", lat: 41.0082, lon: 28.9784, people: ["Aviwe Cingo"] },
  { city: "Bloomfield Hills", lat: 42.5836, lon: -83.248009, people: ["Brittany Dorning"] },
  { city: "Provo", lat: 40.233845, lon: -111.658531, people: ["Caylin LeFevre"] },
  { city: "New York", lat: 40.730610, lon: -73.935242, people: ["Chenéy Zimmerman","Michaela Schoeman","Alex Neumann"] },
  { city: "Pretoria", lat: -25.731340, lon: 28.218370, people: ["Hannah Ireland","Kelly Reinstorf"] },
  { city: "Harare", lat: -17.824858, lon: 31.053028, people: ["Nicole Kahari"] },
  { city: "Perth", lat: -31.953512, lon: 115.857048, people: ["Yasmin Boullé"] },
  { city: "Ballito/Durban", lat: -29.5390, lon: 31.2144, people: ["Ali Wolhuter","Sarah Thornton"] },
  { city: "Denver", lat: 39.742043, lon: -104.991531, people: ["Michelle Hammar"] },
  { city: "Cardiff", lat: 51.481583, lon: -3.179090, people: ["Abbie Sauter"] },
  { city: "Hillcrest", lat: -29.789614, lon: 30.741924, people: ["Kaylee Dyall","Bailey Squires"] },
  { city: "Amsterdam", lat: 52.377956, lon: 4.897070, people: ["Nina Holzbach","Violet Comrie"] },
  { city: "Wartburg", lat: -29.4330, lon: 30.5743, people: ["Katie Barry"] },
  { city: "Utrecht", lat: 52.092876, lon: 5.104480, people: ["Holly Wasserman"] },
  { city: "Barcelona", lat: 41.390205, lon: 2.154007, people: ["Sasha Robinson"] },
  { city: "Maseru", lat: -29.3151, lon: 27.4869, people: ["Kelebone Sello"] },
  { city: "Hasselt", lat: 50.9311, lon: 5.33781, people: ["Ros Elmer-English"] },
  { city: "Mainz", lat: 49.992863, lon: 8.247253, people: ["Joanna Michowicz"] },
  { city: "Toronto", lat: 43.651070, lon: -79.347015, people: ["Amanda Peake"] },
  { city: "Newcastle", lat: -27.7580, lon: 29.9318, people: ["Minenhle Chiliza"] }
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