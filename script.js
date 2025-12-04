var map = L.map('map').setView([10.762622, 106.660172], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


let control;


document.getElementById('calcBtn').addEventListener('click', async () => {
const from = document.getElementById('from').value;
const to = document.getElementById('to').value;
const vehicle = document.getElementById('vehicle').value;


if (!from || !to) return alert('Nhập đầy đủ điểm đón và đến');


const fromCoords = await getCoords(from);
const toCoords = await getCoords(to);


if (control) map.removeControl(control);


control = L.Routing.control({
waypoints: [
L.latLng(fromCoords.lat, fromCoords.lon),
L.latLng(toCoords.lat, toCoords.lon)
],
routeWhileDragging: false
}).addTo(map);


control.on('routesfound', function(e) {
const distance = e.routes[0].summary.totalDistance / 1000; // km
if (distance > 3) {
document.getElementById('result').innerHTML = 'Khoảng cách: ' + distance.toFixed(2) + ' km<br>Không nhận cuốc (quá 3km)';
return;
}


let price = 0;
if (vehicle === 'bike') price = 10000;
if (vehicle === 'car') price = 20000;


document.getElementById('result').innerHTML = `
Quãng đường: ${distance.toFixed(2)} km<br>
Loại xe: ${vehicle === 'bike' ? 'Xe máy' : 'Ô tô'}<br>
Giá tiền: ${price.toLocaleString()} đ
`;


saveTrip(from, to, distance, vehicle, price);
});
});


async function getCoords(address) {
const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
const res = await fetch(url);
const data = await res.json();
if (!data.length) throw new Error('Không tìm thấy địa điểm');
return data[0];
}
