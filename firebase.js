import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
databaseURL: "https://YOUR_PROJECT.firebaseio.com",
projectId: "YOUR_PROJECT",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "XXXX",
appId: "XXXX"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


window.saveTrip = function (from, to, distance, vehicle, price) {
push(ref(database, 'trips'), {
from,
to,
distance,
vehicle,
price,
time: new Date().toISOString()
});
};
