/**
 * Template Name: Gp - v4.7.0
 * Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

//Get Today's Date and set as minimum date
n = new Date();
y = n.getFullYear();
m = (n.getMonth() + 1).toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false
});
d = (n.getDate()).toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false
});
var today_date = y + '-' + m + '-' + d;
console.log('todays  date  ', today_date);
document.getElementById("date").setAttribute("min", today_date);
document.getElementById("date").setAttribute("class", "form-control");


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
var db = firebase.firestore();

//Function to reset Database
//resetAll();
function resetAll() {
  db.collection("vehicles").where("available", "==", false).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      doc.ref.update({
        available: true
      })
    })
  })
  db.collection("drivers").where("available", "==", false).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      doc.ref.update({
        available: true
      })
    })
  })
  /*db.collection("bookings").where("status","==","ongoing").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        doc.ref.update({
            status : "aborted"
        })
    })
})*/
  db.collection("bookings").where("status", "==", "ongoing").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      doc.ref.delete();
    })
  })
  alert("reset complete");
  return;
}


(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()
/*
var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

*/

const auth =  firebase.auth();
function signOut(){
  auth.signOut();
  alert("Signed Out Successfully from the System");
  window.location.href = 'login.html';
}

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

function clickBookRide(){
  document.getElementById('loadCheck').style="display:block;color: white;"
}

console.log(dateTime);

var push_to_firebase = function (data, section, docName) {
  confirm("Request received.")


  if (section == 1) {
    db.collection("bookings").doc(dateTime).set({
        id: data["id"],
        cust_name: data["name"],
        cust_phn: data["phn"],
        date: data["date"],
        num_of_days: data["days"],
        vehicleType: data["vehicleType"],
        time: data["time"],
        numOfPpl: data["numOfPpl"],
        tripType: data["tripType"],
        startLat: data["startLat"],
        startLon: data["startLon"],
        destLat: data["destLat"],
        destLon: data["destLon"]
      })
      .then(function (docRef) {
        console.log("Message sent, ID: ", docRef.id);
        //location.reload();
      })
      .catch(function (error) {
        console.error("Message could not be sent: ", error);
      });

  } else if (section == 2) {
    db.collection("vehicles").doc(docName).set({
        id: data["id"],
        regNo: data["regNo"],
        make: data["make"],
        model: data["model"],
        vehicleClass: data["class"],
        numOfSeats: data["numOfSeats"],
        available: data["available"]
      })
      .then(function (docRef) {
        console.log("Message sent, ID: ", docRef.id);
        //location.reload();
      })
      .catch(function (error) {
        console.error("Message could not be sent: ", error);
        window.location.reload();
      });
  } else if (section == 3) {
    db.collection("drivers").doc(docName).set({
        id: data["id"],
        name: data["name"],
        phn: data["phn"],
        age: data["age"],
        exp: data["exp"],
        available: data["available"]
      })
      .then(function (docRef) {
        console.log("Message sent, ID: ", docRef.id);
        //location.reload();
      })
      .catch(function (error) {
        console.error("Message could not be sent: ", error);
        //window.location.reload();
      });
  }

}

var booking_submit = function () {
  document.getElementById("error-label").innerHTML = "...";
  document.getElementById("error-label").style.display = "none";
  
  db.collection("bookings").get().then((snapshot) => {

    var x = snapshot.size + 1;
    
    //console.log(startLoc[0], startLoc[1], destLoc[0], destLoc[1]);


    var name = document.getElementById("name");
    var phn = document.getElementById("phn");
    var date = document.getElementById("date");
    var days = document.getElementById("days");
    var vehicleType = document.getElementById("vehicleType");
    var time = document.getElementById("time");
    var num = document.getElementById("numOfPpl");
    var trip = document.getElementById("tripType");

    

    var startLat = startLoc[1];
    var startLon = startLoc[0];
    var destLat = destLoc[1];
    var destLon = destLoc[0];


    var booking_data = {
      "id": x,
      "name": name.value,
      "phn": phn.value,
      "date": date.value,
      "days": days.value,
      "vehicleType": vehicleType.value,
      "time": time.value,
      "numOfPpl": num.value,
      "tripType": trip.value,
      "startLat": startLat,
      "startLon": startLon,
      "destLat": destLat,
      "destLon": destLon
    }
    //var val = checkforErrors(booking_data)
    //console.log(val)
    //if(val=="false")
    checkforErrors(booking_data).
    then(
      function(){
        console.log('errors found')
    },function()
    {
      document.getElementById("error-label").style.display = "none";
      console.log('no errors!')

      push_to_firebase(booking_data, 1, null);
      assignRideAuto(x, vehicleType.value, num.value);
    })
    //console.log('in submit')
  })
}

//assignRideAuto(1, "Luxury", "4");

function assignRideAuto(booking_id, Vclass, numOfPpl) {
  // var Vclass = document.getElementById("vehicleType");

  document.getElementById('collapseExample2').style="display:block;"
  db.collection("vehicles").orderBy("numOfSeats").
  orderBy("id").where("vehicleClass", "==", Vclass).
  where("numOfSeats", ">=", numOfPpl).
  where("available", "==", true).
  limit(1).get().then((snapshot) => {
    var size = snapshot.size;

    //console.log(size);
    if (size == 0) {
      var label1 = document.getElementById("assignedVehicle");
      label1.innerHTML = "Sorry no vehicle is free. Please try again after sometime :/";
      db.collection("bookings").where("id", "==", booking_id).get().then((snap) => {
        snap.docs.forEach(doc => {
          doc.ref.update({
            status: "pending"
          })
        })
      })
      return;
    }
    snapshot.docs.forEach(doc => {
      //Updating availablity to false
      doc.ref.update({
          available: false
        })
        .then(() => {
          console.log("Vehicle successfully updated!");
          var vID = doc.data().id;
          db.collection("bookings").where("id", "==", booking_id).get().then((snap) => {
            snap.docs.forEach(doc => {
              doc.ref.update({
                assignedVehicleID: vID
              })
            })
          })
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          return;
        });
      var label1 = document.getElementById("assignedVehicle");
      var str = doc.data().make + ' ' + doc.data().model;
      label1.innerHTML = str;

    })
  })



  db.collection("drivers").orderBy("id").where("available", "==", true).limit(1).get().then((snapshot) => {
    var size = snapshot.size;
    console.log(size);
    if (size == 0) {
      var label2 = document.getElementById("assignedDriver");
      label2.innerHTML = "Sorry no driver is free. Please try again after sometime :/";
      db.collection("bookings").where("id", "==", booking_id).get().then((snap) => {
        snap.docs.forEach(doc => {
          doc.ref.update({
            status: "pending"
          })
        })
      })
      return;
    }
    snapshot.docs.forEach(doc => {

      //Updating availablity to false
      doc.ref.update({
          available: false
        })
        .then(() => {
          console.log("Driver successfully updated!");
          var dID = doc.data().id;
          db.collection("bookings").where("id", "==", booking_id).get().then((snap) => {
            snap.docs.forEach(doc => {
              doc.ref.update({
                assignedDriverID: dID
              })
            })
          })

        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          return;
        })
      var label2 = document.getElementById("assignedDriver");
      label2.innerHTML = doc.data().name;
    })

  })
  db.collection("bookings").where("id", "==", booking_id).get().then((snap) => {
    snap.docs.forEach(doc => {
      doc.ref.update({
        status: "ongoing"
      })
    })
  })
}
var add_vehicle = function () {
  db.collection("vehicles").get().then((snapshot) => {

    var x = snapshot.size + 1;
    //console.log(x);
    var regNo = document.getElementById("regNo");
    var make = document.getElementById("vehicleMake");
    var model = document.getElementById("vehicleModel");
    var vehicleClass = document.getElementById("vehicleClass");
    var numOfSeats = document.getElementById("numOfSeats");
    //var availability = "true";

    var vehicle_data = {
      "id": x,
      "regNo":regNo.value,
      "make": make.value,
      "model": model.value,
      "class": vehicleClass.value,
      "numOfSeats": numOfSeats.value,
      "available": true,
      "distance": "0",
      "amount": "0"
    }
    var vehicleName = make.value + ' ' + model.value;

    if(checkforErrors1(vehicle_data,"Vlabel") == false){
      console.log(checkforErrors1(vehicle_data))
      push_to_firebase(vehicle_data, 2, vehicleName);
    }
    else console.log(true)
  })

  //location.reload();
}


var add_driver = function () {
  db.collection("drivers").get().then((snapshot) => {

    var x = snapshot.size + 1;
    var name = document.getElementById("Dname");
    var phn = document.getElementById("Dphn");
    var age = document.getElementById("age");
    var exp = document.getElementById("exp");
    //var availability = "true";

    var driver_data = {
      "id": x,
      "name": name.value,
      "phn": phn.value,
      "age": age.value,
      "exp": exp.value,
      "available": true,
      "distance": "0",
      "amount": "0"
    }
    if(checkforErrors1(driver_data,"Dlabel")==false)
      push_to_firebase(driver_data, 3, name.value);
  })

}

function Collapse() {
  var x = document.getElementById("collapseExample");
  if (x.style.display == "block")
    x.style.display = "none";
  else
    x.style.display = "block";

}

function dcollapse() {
  var x = document.getElementById("collapseExample1");
  if (x.style.display == "block")
    x.style.display = "none";

  else
    x.style.display = "block";
}

function remVcollapse() {
  var x = document.getElementById("collapseExample3");
  if (x.style.display == "block")
    x.style.display = "none";

  else
    x.style.display = "block";
}

function remDcollapse() {
  var x = document.getElementById("collapseExample4");
  if (x.style.display == "block")
    x.style.display = "none";

  else
    x.style.display = "block";
}
//Retrieve Vehicles data

db.collection("vehicles").orderBy('id').get().then((snapshot) => {
  var size = snapshot.size;
  //console.log(size);
  snapshot.docs.forEach(doc => {
    renderVehicle(doc, vehicleList);
  })
})


renderRemoveVehicle();
function renderRemoveVehicle(){
  db.collection("vehicles").orderBy('id').get().then((snapshot) => {
    var size = snapshot.size;
    //console.log(size);
    snapshot.docs.forEach(doc => {
      let opt = document.createElement('option');
      opt.textContent = doc.data().make + ' ' + doc.data().model;
      document.getElementById('remVehicleList').append(opt);
    })
  })
}

renderRemoveDriver();
function renderRemoveDriver(){
  db.collection("drivers").orderBy('id').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      let opt = document.createElement('option');
      opt.textContent = doc.data().name;
      document.getElementById('remDriverList').append(opt);
    })
  })
}

function rem_vehicle(){
  var vName = document.getElementById('remVehicleList').value;
  document.getElementById('remVlabel').style="color:white";
  if(vName=="Select Vehicle..."){
    document.getElementById('remVlabel').style="color:red";
    document.getElementById('remVlabel').innerHTML="No vehicle selected!"
    return
  }
  var vArray = vName.split(' ');
  var vMake = vArray[0];
  var vModel = vArray[1];
  console.log(vMake,vModel)
  db.collection("vehicles").where("make","==",vMake).where("model","==",vModel).get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
      if(doc.data().available==false){
        alert("Looks like the vehicle is currently in a ride!")
        document.getElementById('remVlabel').style="color:red";
        document.getElementById('remVlabel').innerHTML="The vehicle is currently in a ride"
        return;
      }
      doc.ref.delete();
      alert('Deleted '+ vName+ ' successfully!')
    })
  })
  
}

function rem_driver(){
  var dName = document.getElementById('remDriverList').value;
  document.getElementById('remDlabel').style="color:white";
  if(dName=="Select Driver..."){
    document.getElementById('remDlabel').style="color:red";
    document.getElementById('remDlabel').innerHTML="No driver selected!"
    return
  }
  
  console.log(dName)
  db.collection("drivers").where("name","==",dName).get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
      if(doc.data().available==false){
        alert("Looks like the driver is currently in a ride!")
        document.getElementById('remDlabel').style="color:red";
        document.getElementById('remDlabel').innerHTML="The driver is currently in a ride"
        return;
      }
      doc.ref.delete();
    })
  })
  alert('Deleted '+ dName+ ' successfully!')
}

const vehicleList = document.querySelector('#vehiclesDB');
const driversList = document.querySelector('#driversDB');

function renderVehicle(doc, vehiclesList, flag) {
  //console.log("in rendervehicle");
  let tr = document.createElement('tr');
  let td_id = document.createElement('td');
  let td_reg = document.createElement('td');
  let td_make = document.createElement('td');
  let td_model = document.createElement('td');
  let td_class = document.createElement('td');
  let td_seats = document.createElement('td');
  let td_available = document.createElement('td');

  // console.log(button.id);

  tr.setAttribute('data-id', doc.id);
  td_id.textContent = doc.data().id;
  td_reg.textContent = doc.data().regNo;
  td_make.textContent = doc.data().make;
  td_model.textContent = doc.data().model;
  td_class.textContent = doc.data().vehicleClass;
  td_seats.textContent = doc.data().numOfSeats;
  td_available.textContent = doc.data().available;

  tr.appendChild(td_id);
  tr.appendChild(td_reg);
  tr.appendChild(td_make);
  tr.appendChild(td_model);
  tr.appendChild(td_class);
  tr.appendChild(td_seats);
  tr.appendChild(td_available);

  /*
    if (flag == "assignRide") {
      let td_btn = document.createElement('td');
      let button = document.createElement('button');
      td_btn.appendChild(button);
      button.id = 'B' + doc.data().id;
      button.setAttribute('class', 'btn btn-outline-primary');
      tr.appendChild(td_btn);
    }
  */
  vehiclesList.appendChild(tr);
}



//Retrieve Driver data


db.collection("drivers").orderBy('id').get().then((snapshot) => {
  var size = snapshot.size;
  //console.log(size);
  snapshot.docs.forEach(doc => {
    renderDriver(doc, size);
  })
})

const driverList = document.querySelector('#driversDB');

function renderDriver(doc) {
  let tr = document.createElement('tr');
  let td_id = document.createElement('td');
  let td_name = document.createElement('td');
  let td_phn = document.createElement('td');
  let td_age = document.createElement('td');
  let td_exp = document.createElement('td');
  let td_available = document.createElement('td');


  tr.setAttribute('data-id', doc.id);
  td_id.textContent = doc.data().id;
  td_name.textContent = doc.data().name;
  td_phn.textContent = doc.data().phn;
  td_age.textContent = doc.data().age;
  td_exp.textContent = doc.data().exp;
  td_available.textContent = doc.data().available;

  tr.appendChild(td_id);
  tr.appendChild(td_name);
  tr.appendChild(td_phn);
  tr.appendChild(td_age);
  tr.appendChild(td_exp);
  tr.appendChild(td_available);


  driverList.appendChild(tr);
}

var colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];

/* 3 donut charts */
var donutOptions = {

};



var b1;

function getBookingsData() {
  var bookingsDict = [0, 0, 0];
  var bookingIDs = [];
  var amounts = [];
  db.collection("bookings").orderBy("id").get().then((snapshot) => {
    var size = snapshot.size;
    var i = 1;
    snapshot.docs.forEach(doc => {
      if (!doc.data().status.localeCompare("completed")) {
        bookingsDict[0] += 1;
      } else if (!doc.data().status.localeCompare("ongoing"))
        bookingsDict[1] += 1;
      else bookingsDict[2] += 1;

      bookingIDs.push(doc.data().id);
      amounts.push(doc.data().amount);

      b1 = bookingsDict;
      if (i == size) {
        var chDonut1 = document.getElementById("chDonut1");
        if (chDonut1) {
          new Chart(chDonut1, {
            type: 'doughnut',
            data: {
              labels: ['Completed', 'Ongoing', 'Pending'],
              datasets: [{
                backgroundColor: colors.slice(0, 3),
                borderWidth: 5,
                data: b1
              }]
            },
            options: {
              title: {
                display: true,
                text: "Bookings",
                fontSize: 25
              },
              cutoutPercentage: 50,
              legend: {
                position: 'bottom',
                padding: 5,
                labels: {
                  textAlign : 'left',
                  fontSize: 15,
                  pointStyle: 'circle',
                  usePointStyle: true
                }
              }
            }
          });
        }
        var chLine1 = document.getElementById("chLine1");
        if (chLine1) {
          new Chart(chLine1, {
            type: "line",

            data: {
              labels: bookingIDs,
              datasets: [{
                label: "Amount",
                fill: false,
                lineTension: 0.1,
                borderColor: "#007bff",
                data: amounts
              }]
            },
            options: {
              //title:{display: true, text:"Amount x Bookings", fontSize: 25},
              legend: {
                display: true
              }
            }
          });
        }
      }
      //return bookingsDict;
      i += 1;
    })
  })
}

getVehiclesData();


getBookingsData();

/*
function getVehicleAmounts(vID){
  localStorage.setItem("vehicleAmt","0");
  db.collection("bookings").where("assignedVehicleID","==",vID).get().then(snapshot =>{
    snapshot.docs.forEach(doc =>{
      console.log(doc.data().id);
      localStorage.setItem("vehicleAmt",toString( parseInt(localStorage.getItem("vehicleAmt")) + doc.data().amount)) ;
    })
  })
  console.log(localStorage.getItem("vehicleAmt"));
}
*/
function getVehiclesData() {
  db.collection("vehicles").orderBy("id").get().then((snapshot) => {
    var size = snapshot.size;
    var i = 1;
    var available = 0;
    var vClass = [];
    var num = [];
    var amounts = [];
    var distances = [];
    var vIDs = [];
    var vNames = [];
    snapshot.docs.forEach(doc => {
      var vName = doc.data().make + ' ' + doc.data().model;
      if (doc.data().available)
        available++;

      if (vClass.length == 0) {
        vClass.push(doc.data().vehicleClass)
        num.push(1);
      } else {
        var exists = false;
        var index = 0;
        while (index < size) {
          if (vClass[index] == doc.data().vehicleClass) {
            exists = true;
            num[index] += 1;
            break;
          }
          index++;
        }
        if (exists == false) {
          vClass.push(doc.data().vehicleClass)
          num.push(1);
        }
      }
      /*
      var sum1 = 0;
      db.collection("bookings").where("assignedVehicleID","==",doc.data().id).get().then(snap =>{
        var size1=snap.size;
        var j = 1;
        var sum = 0;
        snap.docs.forEach(docu =>{
          sum+=parseInt(docu.data().amount);
          console.log(sum);
          if(j==size){
            localStorage.setItem("vAmt",toString(sum));
            sum1 = sum;
          }
          j+=1;
        })
      })
      console.log(sum1);
      */
      vIDs.push(doc.data().id);
      amounts.push(doc.data().amount);
      distances.push(doc.data().distance);
      vNames.push(vName);

      if (i == size) {


        var chDonut2 = document.getElementById("chDonut2");
        if (chDonut2) {
          new Chart(chDonut2, {
            type: 'doughnut',
            data: {
              labels: ['Available', 'Unavailable'],
              datasets: [{
                backgroundColor: colors.slice(0, 2),
                borderWidth: 5,
                data: [available, (size - available)]
              }]
            },
            options: {
              title: {
                display: true,
                text: "Vehicle Availablity",
                fontSize: 25
              },
              cutoutPercentage: 50,
              legend: {
                position: 'bottom',
                padding: 10,
                labels: {
                  fontSize: 15,
                  pointStyle: 'circle',
                  usePointStyle: true
                }
              }
            }
          });
        }

        var chDonut3 = document.getElementById("chDonut3");
        if (chDonut3) {
          new Chart(chDonut3, {
            type: 'doughnut',
            data: {
              labels: vClass,
              datasets: [{
                backgroundColor: colors.slice(0, 3),
                borderWidth: 5,
                data: num
              }]
            },
            options: {
              title: {
                display: true,
                text: "Vehicle Class",
                fontSize: 25
              },
              cutoutPercentage: 50,
              legend: {
                position: 'bottom',
                padding: 10,
                labels: {
                  fontSize: 15,
                  pointStyle: 'circle',
                  usePointStyle: true
                }
              }
            }
          });
        }

        var chLine2 = document.getElementById("chLine2");
        if (chLine2) {
          new Chart(chLine2, {
            type: "line",

            data: {
              labels: vNames,
              datasets: [{
                label: "Amount",
                fill: false,
                lineTension: 0.1,
                borderColor: colors[0],
                data: amounts
              },
              {
                label: "Distance",
                  fill: false,
                  lineTension: 0.1,
                  borderColor: colors[1],
                  data: distances
              }]
            },
            options: {
              //title:{display: true, text:"Amount x Bookings", fontSize: 25},
              legend: {
                display: true
              }
            }
          });
        }

      }
      i += 1;
    })
  })
}

getDriverData();

function getDriverData(){
  db.collection("drivers").get().then(snapshot =>{
    var size = snapshot.size;
    var i = 1;
    var available = 0;
    var amounts = [];
    var distances = [];
    var DNames = [];
    snapshot.docs.forEach(doc =>{
      if(doc.data().available)
        available++;
      console.log(available)

      amounts.push(doc.data().amount);
      distances.push(doc.data().distance);
      DNames.push(doc.data().name);

      if(i==size){
        console.log(distances);
        var chDonut4 = document.getElementById("chDonut4");
        if (chDonut4) {
          new Chart(chDonut4, {
            type: 'doughnut',
            data: {
              labels: ['Available', 'Unavailable'],
              datasets: [{
                backgroundColor: colors.slice(0, 2),
                borderWidth: 5,
                data: [available, (size - available)]
              }]
            },
            options: {
              title: {
                display: true,
                text: "Driver Availablity",
                fontSize: 25
              },
              cutoutPercentage: 50,
              legend: {
                position: 'bottom',
                padding: 10,
                labels: {
                  fontSize: 15,
                  pointStyle: 'circle',
                  usePointStyle: true
                }
              }
            }
          });
        }

        var chLine3 = document.getElementById("chLine3");
        if (chLine3) {
          new Chart(chLine3, {
            type: "line",

            data: {
              labels: DNames,
              datasets: [{
                label: "Amount",
                fill: false,
                lineTension: 0.1,
                borderColor: colors[0],
                data: amounts
              },
              {
                label: "Distance",
                  fill: false,
                  lineTension: 0.1,
                  borderColor: colors[1],
                  data: distances
              }]
            },
            options: {
              //title:{display: true, text:"Amount x Bookings", fontSize: 25},
              legend: {
                display: true
              }
            }
          });
        }

      }
      i++;
    })
  })
}




mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyaWtpcmFuMjciLCJhIjoiY2t5Y3owbGtsMHUycDJ3bzgzNDdlNXU5OSJ9.I4bFvoEA8s8I2A17V9Z2wg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [77.5946, 12.9716],
  zoom: 10
});


const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Start Location',
  mapboxgl: mapboxgl
});
const destGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  marker: {
    color: 'red'
  },
  placeholder: 'Destination Location',
  mapboxgl: mapboxgl
});

var startLoc = [];
var destLoc = [];

geocoder.on('result', function (result) {
  //console.log(result.result.center);
  startLoc = result.result.center;
})



destGeocoder.on('result', function (result) {
  // console.log(result.result.center);
  destLoc = result.result.center
})


document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
document.getElementById('destGeocoder').appendChild(destGeocoder.onAdd(map));

async function callReachable(){
  return (await reachable([startLoc[1],startLoc[0]],[destLoc[1],destLoc[0]]))
}

async function reachable(start,end){
  if(start==null || end == null)
    return false;
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`, {
        method: 'GET'
    }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data;
  console.log(data)
  if(data == null || data["code"]=="InvalidInput"){
    console.log('unreachable in r')
    return false;
  }
  console.log('reachable in r')
  return true;
}



async function checkforErrors(booking_data){

  var dd = parseInt(booking_data['date'][8] + booking_data['date'][9])
  var mm = parseInt(booking_data['date'][5]+booking_data['date'][6])
  var yy = parseInt(booking_data['date'][0]+booking_data['date'][1]+booking_data['date'][2]+booking_data['date'][3])
  var cy = parseInt(y)
  var cd = parseInt(d)
  var cm = parseInt(m)
  var h1 = parseInt(booking_data['time'][0]+booking_data['time'][1])
  var m1 = parseInt(booking_data['time'][3]+booking_data['time'][4])

  var h = today.getHours();
  var min = today.getMinutes();


  console.log(d,m,y)
 
  for(var key in booking_data){
    if(booking_data[key]==null || booking_data[key]==''){ 
      if(key=='date'){
        document.getElementById("error-label").innerHTML="Please enter a valid date";
        document.getElementById("error-label").style.display="block";
        return true;
      }  
      if(key=='days'){
        document.getElementById("error-label").innerHTML="Please enter valid number of days";
        document.getElementById("error-label").style.display="block";
        return true;
      }
      if(key=='numOfPpl'){
        document.getElementById("error-label").innerHTML="Please enter valid number of passengers";
        document.getElementById("error-label").style.display="block";
        return true;
      }
    document.getElementById("error-label").innerHTML="Please enter all details";
    document.getElementById("error-label").style.display="block";  
    console.log('error')
      return true;
    }
  }
  if(booking_data['phn']<1000000000 || booking_data['phn']>9999999999){
    document.getElementById("error-label").innerHTML="Please enter a valid phone number";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(yy>(cy+2) || yy<cy){
    document.getElementById("error-label").innerHTML="Please enter a valid year. Bookings should be within 2 years from now.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(yy==cy && (mm<cm)){
    document.getElementById("error-label").innerHTML="Please enter a valid month.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(yy==cy && mm ==cm && (dd<cd)){
    document.getElementById("error-label").innerHTML="Please enter a valid day.";
    document.getElementById("error-label").style.display="block";
      return true;
  }
  else if(booking_data['days']<=0){
    document.getElementById("error-label").innerHTML="Please enter valid number of days.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(booking_data['vehicleType'] == "Select Vehicle Type..."){
    document.getElementById("error-label").innerHTML="Please select vehicle class.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if((yy==cy && mm==cm && dd==cd) && (h1<h || (h1==h && m1<min) )){
    document.getElementById("error-label").innerHTML="Please enter a valid time.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(booking_data['numOfPpl']<=0){
    document.getElementById("error-label").innerHTML="Please enter valid number of people.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(booking_data['tripType']=='Select Trip Type...'){
    document.getElementById("error-label").innerHTML="Please select trip type.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(booking_data['startLat'].length<2 || booking_data['destLat'].length<2){
    document.getElementById("error-label").innerHTML="Please enter valid locations and select from list.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  else if(await reachable([booking_data['startLat'],booking_data['startLon']],[booking_data['destLat'],booking_data['destLon']]) == false){
    console.log('unreachable in cfe')
    document.getElementById("error-label").innerHTML="Please enter valid locations that are reachable.";
    document.getElementById("error-label").style.display="block";
    return true;
  }
  console.log('no errors! in cfe')
  return Promise.reject();
}

//Error check for adding driver or vehicle
function checkforErrors1(data1,e){
  for(var key in data1){
    console.log(data1[key])
    if(data1[key]=='' || data1[key]==null){
      document.getElementById(e).innerHTML="Please enter all details";
      document.getElementById(e).style.color="red";
      console.log('error')
      return true;
  }
}
return false;
}