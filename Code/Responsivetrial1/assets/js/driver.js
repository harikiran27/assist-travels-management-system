
var firebaseConfig = {
    apiKey: "AIzaSyBa8vRcCNNemlygfvNahHvqekqOHkEcTHc",
    authDomain: "travel-management-8d45e.firebaseapp.com",
    projectId: "travel-management-8d45e",
    storageBucket: "travel-management-8d45e.appspot.com",
    messagingSenderId: "887011901504",
    appId: "1:887011901504:web:164674b504acff21179fa5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();

  mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaWtpcmFuMjciLCJhIjoiY2t5Y3owbGtsMHUycDJ3bzgzNDdlNXU5OSJ9.I4bFvoEA8s8I2A17V9Z2wg';

  // Create a Recaptcha verifier instance globally
      // Calls submitPhoneNumberAuth() when the captcha is verified


      // This function runs when the 'sign-in-button' is clicked
      // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
      function submitPhoneNumberAuth() {
        var phoneNumber = document.getElementById("phoneNumber").value;
        //IDsubmit();
        var appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "normal",
              callback: function(response) {
                submitPhoneNumberAuth();
              }
            }
          );
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function(confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById("enter-otp").style.display="block";
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      // This function runs when the 'confirm-code' button is clicked
      // Takes the value from the 'code' input and submits the code to verify the phone number
      // Return a user object if the authentication was successful, and auth is complete
      function submitPhoneNumberAuthCode() {
        var code = document.getElementById("code").value;
        confirmationResult
          .confirm(code)
          .then(function(result) {
            var user = result.user;
            console.log(user);
            console.log("USER LOGGED IN");
            document.getElementById("data-container").style="display:block";
            document.getElementById("signin-label").style="display:none";
            document.getElementById("tab-2").disabled="false";
            document.getElementById("tab-2").checked="true";
            document.getElementById("tab-1").disabled="true";
            IDsubmit();
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      function signOut(){
          window.location.reload();
      }

      //This function runs everytime the auth state changes. Use to verify if the user is logged in
      /*firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("USER LOGGED IN");
        } else {
          // No user is signed in.
          console.log("USER NOT LOGGED IN");
        }
      });*/

  function IDsubmit() {
    var dp = document.getElementById("phoneNumber").value;
    var driverPhn = dp.slice(3,dp.length);
    console.log(dp,driverPhn)
    var flag = 0;
    var booking_found = false;

    //  console.log(driverID.value);
  //.where("status","==","ongoing").where("assignedDriverID","==",driverID.value)

    db.collection("drivers").where("phn","==",driverPhn).get().then(snap =>{
        if(snap.size==0){
            alert("You are not registered as a driver. Please contact the admin.")
        }
        snap.docs.forEach( docu => {
            db.collection("bookings").onSnapshot((snapshot) => {
                /*if(snapshot.size==0){
                    alert("You don't have any ride currently assigned.");
                    window.open('Code/Responsivetrial1/driverPage.html')
                }*/
                
                snapshot.docs.forEach(doc => {
                    flag++;
                    if(doc.data().status=="ongoing" && doc.data().assignedDriverID==docu.data().id){
                    alert("Booking details received.");
                      renderBookingDetailsList(doc);
                      booking_found = true;
                      return
                    }
                    if(flag==snapshot.size && booking_found==false){
                        alert("You don't have any ride currently assigned.");
                        window.open('driverPage.html')
                        return
                    }
                /*if(flag==1)
                  alert("Booking details received.");*/
                  
                console.log(snapshot.size)
                
                    //else console.log("No booking yet")
              })
            })
        })
    })

  
}
function renderBookingDetailsList(doc)
{
    var startCoords = [doc.data().startLat,doc.data().startLon];
    var destCoords = [doc.data().destLat,doc.data().destLon];

    //For sharing coordinates data to routeMap.html
    localStorage.setItem('startCoords',startCoords);
    localStorage.setItem('destCoords',destCoords);

  
    document.getElementById("booking_id").innerHTML = doc.data().id;
    document.getElementById("cust_name").innerHTML = doc.data().cust_name;
    document.getElementById("cust_phn").innerHTML = doc.data().cust_phn;
    document.getElementById("date1").innerHTML = doc.data().date;
    document.getElementById("time").innerHTML = doc.data().time;
    document.getElementById("numOfPpl").innerHTML = doc.data().numOfPpl;
    document.getElementById("days").innerHTML = doc.data().num_of_days;
    document.getElementById("vehicleID").innerHTML = doc.data().assignedVehicleID;
    //fetch start location data
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${startCoords[1]},${startCoords[0]}.json?access_token=${mapboxgl.accessToken}`, {
          method: 'GET'
      }
    ).then(response => response.json()).then(data => {
    document.getElementById("startLocLabel").innerHTML = data.features[0].place_name;});
    
    //fetch dest location data
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destCoords[1]},${destCoords[0]}.json?access_token=${mapboxgl.accessToken}`, {
          method: 'GET'
      }
    ).then(response => response.json()).then(data => {
    document.getElementById("destLocLabel").innerHTML = data.features[0].place_name;});



    db.collection("vehicles").where("id","==",doc.data().assignedVehicleID).get().then((snap) => {
        snap.docs.forEach(doc => {
            var vName = doc.data().make+' '+doc.data().model;
            document.getElementById("vehicleName").innerHTML = vName;
          })
        }) 
    localStorage.setItem('value1', `${doc.data().id}`);
    
}

function rideComplete() {
  var bookingID = localStorage.getItem('value1');

  console.log(bookingID);
  db.collection("bookings").where("id", "==", parseInt(bookingID)).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          doc.ref.update({
              status: "completed"
          })

          db.collection("vehicles").where("id","==",doc.data().assignedVehicleID).get().then((snapshot) => {
            snapshot.docs.forEach(docu => {
              docu.ref.update({
                  available: true,
                  distance: (parseFloat(docu.data().distance) + parseFloat(localStorage.getItem("distance"))).toString(10)
              })
            })
            }) 

            db.collection("drivers").where("id","==",doc.data().assignedDriverID).get().then((snapshot) => {
              snapshot.docs.forEach(docu => {
                docu.ref.update({
                    available: true,
                    distance: (parseFloat(docu.data().distance) + parseFloat(localStorage.getItem("distance"))).toString(10)
                })
              })
              }) 
      })
  })
  
  var amountlabel = document.getElementById("enterAmount");
  amountlabel.style.display = "block";
}
function storeAmount() {
    var bookingID = localStorage.getItem('value1');
    var amt = document.getElementById("amountLabel").value;
    db.collection("bookings").where("id", "==", parseInt(bookingID)).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            doc.ref.update({
                amount: amt
            })
            db.collection("vehicles").where("id", "==", doc.data().assignedVehicleID).get().then((snapshot) => {
                snapshot.docs.forEach(docu => {
                    docu.ref.update({
                        amount: (parseInt(docu.data().amount) + parseInt(amt)).toString(10)
                    })
                })
            })
            db.collection("drivers").where("id", "==", doc.data().assignedDriverID).get().then((snapshot) => {
                snapshot.docs.forEach(docu => {
                    docu.ref.update({
                        amount: (parseInt(docu.data().amount) + parseInt(amt)).toString(10)
                    })
                })
            })
        })
    })
    window.open("driverPage.html")
}
/*
resetDandVAmount();
function resetDandVAmount(){
    db.collection("vehicles").get().then(snapshot =>{
        snapshot.docs.forEach(doc =>{
            doc.ref.update({amount:"0"})
        })
    })
    db.collection("drivers").get().then(snapshot =>{
        snapshot.docs.forEach(doc =>{
            doc.ref.update({amount:"0"})
        })
    })
}
*/

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaWtpcmFuMjciLCJhIjoiY2t5Y3owbGtsMHUycDJ3bzgzNDdlNXU5OSJ9.I4bFvoEA8s8I2A17V9Z2wg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [77.585721, 12.928575], // starting position
  zoom: 12
});
// set the bounds of the map
/*const bounds = [
  [-123.069003, 45.395273],
  [-122.303707, 45.612333]
];
map.setMaxBounds(bounds);
*/
// an arbitrary start will always be the same
// only the end or destination will changeus
//const start = [77.585721,12.928575];
const startArr = (localStorage.getItem('startCoords')).split(",");
const coordsArr = (localStorage.getItem('destCoords')).split(",");

var start = []
var coords = []

start[0] = (startArr[0]);
start[1] = (startArr[1]);

coords[0] = (coordsArr[0]);
coords[1] = (coordsArr[1]);
console.log(start);
console.log(coords);

// this is where the code for the next step will go

// create a function to make a directions request
async function getRoute(end) {
  // make a directions request using driving profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`, {
          method: 'GET'
      }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'LineString',
          coordinates: route
      }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
      map.addLayer({
          id: 'route',
          type: 'line',
          source: {
              type: 'geojson',
              data: geojson
          },
          layout: {
              'line-join': 'round',
              'line-cap': 'round'
          },
          paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
          }
      });
  }

  // add turn instructions here at the end
  // get the sidebar and add the instructions
  const instructions = document.getElementById('instructions');
  const steps = data.legs[0].steps;

  let tripInstructions = '';
  for (const step of steps) {
      tripInstructions += `<li>${step.maneuver.instruction}</li>`;
  }
  
  instructions.innerHTML =
      `<p><strong>Trip Distance : ${data.distance/1000} km</strong></p>
       <p><strong>Trip duration: ${Math.floor(data.duration / 60)} min 🚗 </strong></p><ol>${tripInstructions}</ol>
       <div style="padding: 0px 0px 10px 10px;">
          <p>Is the ride completed? </p><div style="text-align:center;padding-bottom:20px"><button type="button" class="btn btn-primary"
              onclick="rideComplete()">Ride Complete</button></div>
          <div id="enterAmount" style="display: none;"> <p>Enter amount : 
              <span>
                  <input type="text" id="amountLabel" value="0"></span></p>
                  <div style="text-align:center;"> <button type="button" class="btn btn-primary" onclick="storeAmount()">Submit</button> </div>
                  </div>
      </div>`;

  console.log(data.distance / 1000)
  localStorage.setItem("distance",data.distance/1000);
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
      id: 'point',
      type: 'circle',
      source: {
          type: 'geojson',
          data: {
              type: 'FeatureCollection',
              features: [{
                  type: 'Feature',
                  properties: {},
                  geometry: {
                      type: 'Point',
                      coordinates: start
                  }
              }]
          }
      },
      paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
      }
  });
  // this is where the code from the next step will go


  const end = {
      type: 'FeatureCollection',
      features: [{
          type: 'Feature',
          properties: {},
          geometry: {
              type: 'Point',
              coordinates: coords
          }
      }]
  };
  if (map.getLayer('end')) {
      map.getSource('end').setData(end);
  } else {
      map.addLayer({
          id: 'end',
          type: 'circle',
          source: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                          type: 'Point',
                          coordinates: coords
                      }
                  }]
              }
          },
          paint: {
              'circle-radius': 10,
              'circle-color': '#f30'
          }
      });
  }
  getRoute(coords);

});


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";

    document.getElementById("showNav").style.visibility = "hidden";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

    document.getElementById("showNav").style.visibility = "visible";
  }