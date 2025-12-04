var map = L.map('map').setView([10.762622, 106.660172], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


let control;


document.getElementById('calcBtn').addEventListener('click', async () => {
const from = document.getElementById('from').value;
const to = document.getElementById('to').value;
const vehicle = document.getElementById('vehicle').value;


if (!from || !to) return alert('Nhập đầy đủ điểm đón và đến');


try {
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
        
        // --- LOGIC TÍNH GIÁ ĐỒNG BỘ ---
        const bikeMin = 10000, carMin = 20000;
        const bikePerKm = 6000, carPerKm = 10000;

        let price = 0;
        if (vehicle === 'bike') {
            price = Math.max(Math.round(distance * bikePerKm), bikeMin);
        } else if (vehicle === 'car') {
            price = Math.max(Math.round(distance * carPerKm), carMin);
        }
        // ------------------------------

        document.getElementById('result').innerHTML = `
            Quãng đường: ${distance.toFixed(2)} km<br>
            Loại xe: ${vehicle === 'bike' ? 'Xe máy' : 'Ô tô'}<br>
            Giá tiền ước tính: ${price.toLocaleString()} đ
        `;

        // Đã bỏ hàm saveTrip để tránh trùng lặp với rider.html
    });

} catch (error) {
    alert(error.message);
    document.getElementById('result').innerHTML = '';
}
});


async function getCoords(address) {
const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
const res = await fetch(url);
const data = await res.json();
if (!data.length) throw new Error('Không tìm thấy địa điểm: ' + address);
return data[0];
}
