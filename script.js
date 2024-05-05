// Define the Mosque class
class Mosque {
    constructor(longitude, latitude, name, shortName, address) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.shortName = shortName;
        this.address = address;
    }
}

// Create a list of mosques
const mosques = [
    new Mosque(49.10512650844402, 55.79834156721693, "Qolşärif Mosque", "Qolşärif", "Kremlyovskaya St., 12"),
    new Mosque(49.118017639153784, 55.77987771782562, "Marcani Mosque", "Marcani", "Bulak River Embankment"),
    new Mosque(49.11425398745822, 55.78302694044884, "Nurullah", "Nurullah", ""),
    new Mosque(49.13276398028107, 55.81890102004069, "Kazan Nury", "KN", "улица Фатыха Амирхана, 3 к2"),
    // Add more mosques as needed
];

var kazanBorders = [
    [55.89670179610725, 49.01898860994611],
    [55.90674391295058, 48.973460475245716],
    [55.91084467072306, 48.96520134992352],
    [55.9077334996786, 48.949243205990676],
    [55.88378212817871, 48.960184938543904],
    [55.88614130532301, 48.86468137223918],
    [55.81381919094829, 48.85595209329542],
    [55.79305997498288, 49.08613658585457],
    [55.68971340386627, 49.08054684229466],
    [55.68771729262367, 49.21156971269412],
    [55.73559584445494, 49.396890350316845],
    [55.78244446450697, 49.33432988110822],
    [55.83683597242877, 49.34377297109063],
    [55.87195103253807, 49.28593404633018],
    [55.91431184141561, 49.15018963006658],
    [55.90571104468519, 49.039233324600744],
    [55.89670179610725, 49.01898860994611]
];
// Coordinates of Kazan city borders
// var kazanBorders = [
//     [55.89670179610725, 49.01898860994611],
//     [55.90674391295058, 48.973460475245716],
//     [55.91084467072306, 48.96520134992352],
//     // [55.9077334996786], 48.949243205990676,
//     // [55.88378212817871, 48.960184938543904],
//     [55.817204, 49.091022],
//     [55.812845, 49.098476],
//     // Add more coordinates as needed
//     [55.825101, 49.119896]
// ];

// Initialize the map
var map = L.map('map').setView([55.796127, 49.106405], 13); // Coordinates for Kazan city

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create polygon with blue color
L.polygon(kazanBorders, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.5
}).addTo(map);

// Create an array to hold references to all circles
var circles = [];

// Function to create circles for each mosque
function createCircles() {
    mosques.forEach(mosque => {
        var circle = L.circle([mosque.latitude, mosque.longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500 // Initial radius
        }).addTo(map);
        circles.push(circle);

        // Create text label inside circle
        var text = L.marker([mosque.latitude, mosque.longitude], {
            icon: L.divIcon({
                className: 'text-label',
                html: `<div>${mosque.shortName}</div>`
            })
        }).addTo(map);

    });
}

// Create circles for each mosque
createCircles();

// You can add more circles or customize this one further as needed

// Function to update circle properties based on user input
function updateCircle() {
    var radius = parseInt(document.getElementById('radius').value);
    var opacity = parseFloat(document.getElementById('opacity').value);

    circles.forEach(circle => {
        circle.setRadius(radius);
        circle.setStyle({ fillOpacity: opacity });
    });

    // Update displayed values
    document.getElementById('radiusValue').textContent = radius;
    document.getElementById('opacityValue').textContent = opacity;
}

// Event listeners to update circle when input values change
document.getElementById('radius').addEventListener('input', updateCircle);
document.getElementById('opacity').addEventListener('input', updateCircle);

// Initial update to display default values
updateCircle();