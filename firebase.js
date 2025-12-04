import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCUQpfPPlJqLRm9FyryfX2UOa82mUWbJrE",
  authDomain: "robotkitkat6-bee.firebaseapp.com",
  databaseURL: "https://robotkitkat6-bee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "robotkitkat6-bee",
  storageBucket: "robotkitkat6-bee.firebasestorage.app",
  messagingSenderId: "117130770804",
  appId: "1:117130770804:web:4827cc61a7c9df99549421",
  measurementId: "G-WMKP4GT930"
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
