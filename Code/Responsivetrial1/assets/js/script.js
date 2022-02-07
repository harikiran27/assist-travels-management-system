 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  const auth =  firebase.auth();

  //signup function
  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var phone = document.getElementById("phnumber");
    var name = document.getElementById("name");
    document.getElementById("error-label").style.display="none";
    document.getElementById("error-label").style.color="red";
    document.getElementById("error-label").style.textAlign="center";

    if(email.value==''||password.value==''||phone.value==''||name.value==''||email.value==null||password.value==null||phone.value==null||name.value==null){
      document.getElementById("error-label").innerHTML="Enter all details";
      document.getElementById("error-label").style.display="block";
      return;
    }

    if(phone.value<=1000000000 || phone.value>=9999999999){
      document.getElementById("error-label").innerHTML="Enter a valid phone number!";
      document.getElementById("error-label").style.display="block";
      return;
    }

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value)
    .then((userCredential) => {
      alert("SignUp Successful");
      window.location.reload();
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("error-label").innerHTML=errorMessage;
      document.getElementById("error-label").style.display="block";


      /*
      if(errorCode == "auth/invalid-email"){
        document.getElementById("error-label").innerHTML="Enter a valid email address!";
        document.getElementById("error-label").style.display="block";
      }
      else if(errorCode == "auth/email-already-in-use"){
        document.getElementById("error-label").innerHTML="The provided email is already in use by an existing user";
        document.getElementById("error-label").style.display="block";
      }
      else if(errorCode == "auth/weak-password"){
        document.getElementById("error-label").innerHTML="Password invalid. Must be greater than 6 characters";
        document.getElementById("error-label").style.display="block";
      }
      else if(errorCode == "auth/wrong-passwrd"){
        document.getElementById("error-label").innerHTML="Password incorrect";
        document.getElementById("error-label").style.display="block";
      }
      else{
        document.getElementById("error-label").innerHTML="Authentication failed";
        document.getElementById("error-label").style.display="block";
      }*/
      console.log(errorCode,errorMessage);
    });
    //promise.catch(e=>alert(e.message));
    
  }

  function forgotPassword(){
    let email = prompt('Enter your email here to reset ypur password');
    let bar = confirm('Confirm or deny');
    console.log(email, bar);

    if(bar==true){
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert('Password reset email sent!');
    })
    .catch((error) => {
      alert('Entered email is invalid')
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });
  }
  }


  //signIN function
  function  signIn(){
    var email = document.getElementById("email1");
    var password  = document.getElementById("password1");
    document.getElementById("error-label1").style.display="none";
    document.getElementById("error-label1").style.color="red";
    document.getElementById("error-label1").style.textAlign="center";
    
    if(email.value==''||password.value==''||email.value==null||password.value==null){
      document.getElementById("error-label1").innerHTML="Enter all details";
      document.getElementById("error-label1").style.display="block";
      return;
    }

    const promise = auth.signInWithEmailAndPassword(email.value,password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = 'index.html';
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("error-label1").innerHTML=errorMessage;
      document.getElementById("error-label1").style.display="block";

      /*
      if(errorCode == "auth/invalid-email"){
        document.getElementById("error-label").innerHTML="Enter a valid email address!";
        document.getElementById("error-label").style.display="block";
      }
      else if(errorCode == "auth/invalid-password"){
        document.getElementById("error-label").innerHTML="Password invalid. Must be greater than 6 characters";
        document.getElementById("error-label").style.display="block";
      }
      if(errorCode == "auth/missing-email"){
        document.getElementById("error-label").innerHTML="Email address not found! Go to SignUp";
        document.getElementById("error-label").style.display="block";
      }
      else if(errorCode == "auth/wrong-password"){
        console.log("qwerty")
        document.getElementById("error-label").innerHTML="Password incorrect";
        document.getElementById("error-label").style.display="block";
      }
      else{
        document.getElementById("error-label").innerHTML="Authentication failed";
        document.getElementById("error-label").style.display="block";
      }*/
  
      console.log(errorCode,errorMessage);
    });
    //promise.catch(e=>alert(e.message));
    
   
  }


  //signOut

  function signOut(){
    auth.signOut();
    alert("SignOut Successfully from System");
    window.location.href = 'login.html';
  }

  //active user to homepage
  /*firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      var email = user.email;
      alert("Active user "+email);

    }else{
      alert("No Active user Found")
    }
  })*/


