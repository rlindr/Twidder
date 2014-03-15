var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }


function loadView(viewid){  
  
  document.getElementById("welcomeView").innerHTML = document.getElementById("welcomeBody").innerHTML;
  document.getElementById("profileView").innerHTML = document.getElementById("profileBody").innerHTML;
  
  viewid = localStorage.test;
  //alert(viewid); // av någon konstig anledning byter den värde på denna igen undersök!

  if(viewid==undefined){
  startview();
  }


  if(viewid!="undefined"){
  homeview();
  }

}


var emailToName = function(email){



}

var changepassword = function(formData){

var check ={

          "oldPassword" : formData.oldPassword.value,
          "newPassword" : formData.newPassword.value,
          
          }

          if(check.oldPassword == "" || check.newPassword == "" ){

            if(check.oldPassword == "" ){
              alert("You have to write your old password");
            }

            if(check.newPassword == "" ){
              alert("You have to write a new password");
            }

          }
          else{

          var result = serverstub.changePassword(localStorage.getItem("currentUser"), check.oldPassword, check.newPassword);
          alert(result.message);
          }
}

var logout = function(){

  function call1(token){
        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
            grabdata(JSON.parse(req.responseText));
            }
          } 
         req.open("POST","http://127.0.0.1:5000/signout",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("token="+token);

        
          //funktion som hämtar datan
                 
          function grabdata(data) {
            alert(data.message);
            if(data.message = "Successfully signed out."){
            localStorage.setItem("currentUser", undefined);
            localStorage.setItem("activeProfile", undefined);    
            localStorage.test = undefined;
            loadView(undefined);
            }
            else{
              alert("Try to log out again");
            }

          }
        }


        call1(localStorage.getItem("currentUser"));


  // gammal kod


  /*var utloggad = serverstub.signOut(localStorage.getItem("currentUser")); 
    if(utloggad.message = "Successfully signed out."){
    localStorage.setItem("currentUser", undefined);
    localStorage.setItem("activeProfile", undefined);    
    localStorage.test = undefined;
    loadView(undefined);
    }
    else{
      alert("Try to log out again");
    }*/
}


function retype(){

          if(document.getElementById("email1").value != "") {
             document.getElementById("email1").style.borderColor = "initial";
          }
          if(document.getElementById("password1").value != "") {
            document.getElementById("password1").style.borderColor = "initial";
          }
          
          if(document.getElementById("firstname").value != "") {
           document.getElementById("firstname").style.borderColor = "initial";
          }

          if(document.getElementById("familyname").value != "") {
           document.getElementById("familyname").style.borderColor = "initial";
          }


          if(document.getElementById("city").value != "") {
           document.getElementById("city").style.borderColor = "initial";
          }
          

          if(document.getElementById("country").value != "") {
           document.getElementById("country").style.borderColor = "initial";
          }

          
          if(document.getElementById("email").value != "") {
           document.getElementById("email").style.borderColor = "initial";
          }
          

          if(document.getElementById("password").value != "") {
           document.getElementById("password").style.borderColor = "initial";
          }
          

          if(document.getElementById("repeatpsw").value != "") {
           document.getElementById("repeatpsw").style.borderColor = "initial";
          }

    }



var checksignin = function(formData){  

          var userid ={

          "email1" : formData.email1.value,
          "password1" : formData.password1.value,
          
          }



        if( document.getElementById("email1").value == "" || document.getElementById("password1").value == "") {
            if(document.getElementById("email1").value == "") {
             document.getElementById("email1").style.borderColor = "red";
             alert("You have to write an email-adress as user name");
            }
            
            if(document.getElementById("email1").value != "") {
             document.getElementById("email1").style.borderColor = "initial";
            }

            if(document.getElementById("password1").value == "") {
              document.getElementById("password1").style.borderColor = "red";
              alert("You have to write a password");

            }

            if(document.getElementById("password1").value != "") {
              document.getElementById("password1").style.borderColor = "initial";
            }

          }
        else{


        function call1(){
        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
            grabdata(JSON.parse(req.responseText));
            }
          } 
         req.open("POST","http://127.0.0.1:5000/signin",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("email="+userid.email1+"&password="+userid.password1);

        
          //funktion som hämtar datan
                 
          function grabdata(data) {

          alert(document.getElementById("in").innerHTML = data.message);
          localStorage.setItem("currentUser", data.data);
          localStorage.setItem("activeProfile", "v");  // denna behöver vi ändra så den sätter activeProfile generiskt DENNA ÄR INSTÄLLD TILL ROBINS LOGIN
          localStorage.test = data.data;
          loadView(data.data);
          reloadwall();
      
          }
        }


        call1();



      // här ligger kod som vi kan använda till get data by token
        
      /*function call2(token1){

        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
              console.log(this.responseText);
            grabdata(JSON.parse(req.responseText));
            }
          }
          
         req.open("POST","http://127.0.0.1:5000/getuserdatabytoken",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("token="+token1);

                 
          function grabdata(data) {

          localStorage.setItem("activeProfile", data.data);   
          }
        }*/


          //gamla servern


          //validid = serverstub.signIn(userid.email1,userid.password1);
          //alert(document.getElementById("in").innerHTML = validid.message);
          //localStorage.setItem("currentUser", validid.data);
          //localStorage.setItem("activeProfile", serverstub.getUserDataByToken(validid.data).data.email);
          //localStorage.test = validid.data;
          //loadView(validid.data);
          //reloadwall()
        }
   

}

var checksignup = function(formData){


         var user ={

          "email" : formData.email.value,
          "password" : formData.password.value,
          "firstname" : formData.firstname.value,
          "familyname" : formData.familyname.value,
          "gender" : formData.gender.value,
          "city" : formData.city.value,
          "country" : formData.country.value
          
          }


        if(document.getElementById("firstname").value == "" || document.getElementById("familyname").value == "" ||  document.getElementById("city").value == "" || document.getElementById("country").value == "" ||  document.getElementById("email").value == "" || document.getElementById("password").value == "" || document.getElementById("repeatpsw").value == "" || (document.getElementById("password").value != document.getElementById("repeatpsw").value)) {
          if(document.getElementById("firstname").value == "") {
           document.getElementById("firstname").style.borderColor = "red";
           alert("You have to write a first name");
          }
          
          if(document.getElementById("firstname").value != "") {
           document.getElementById("firstname").style.borderColor = "initial";
          }

          if(document.getElementById("familyname").value == "") {
           document.getElementById("familyname").style.borderColor = "red";
          alert("You have to write a familyname");
          }

          if(document.getElementById("familyname").value != "") {
           document.getElementById("familyname").style.borderColor = "initial";
          }

          if(document.getElementById("city").value == "") {
           document.getElementById("city").style.borderColor = "red";
          alert("You have to write a city");
          }

          if(document.getElementById("city").value != "") {
           document.getElementById("city").style.borderColor = "initial";
          }
          
          if(document.getElementById("country").value == "") {
           document.getElementById("country").style.borderColor = "red";
          alert("You have to write a country");
          }

          if(document.getElementById("country").value != "") {
           document.getElementById("country").style.borderColor = "initial";
          }

          if(document.getElementById("email").value == "") {
           document.getElementById("email").style.borderColor = "red";
          alert("You have to write an email");
              
          }
          
          if(document.getElementById("email").value != "") {
           document.getElementById("email").style.borderColor = "initial";
          }
          
          if(document.getElementById("password").value == "") {
           document.getElementById("password").style.borderColor = "red";
           alert("You have to write a password");
              
          }

          if(document.getElementById("password").value != "") {
           document.getElementById("password").style.borderColor = "initial";
          }
          
          if(document.getElementById("repeatpsw").value == "") {
           document.getElementById("repeatpsw").style.borderColor = "red";
           alert("You have to repeat the password");
                 
          }

          if(document.getElementById("repeatpsw").value != "") {
           document.getElementById("repeatpsw").style.borderColor = "initial";
          }

          if(document.getElementById("password").value != document.getElementById("repeatpsw").value ) {
            document.getElementById("repeatpsw").style.borderColor = "red";
             document.getElementById("password").style.borderColor = "red";
             document.getElementById("repeatpsw").value = "";
             document.getElementById("password").value = "";
            alert("You have to write the same password");
          }

    }
    else
    {


      var signup = new XMLHttpRequest();
          signup.onreadystatechange=function()
          {
          if (signup.readyState==4 && signup.status==200)
            {
            grabdata(JSON.parse(signup.responseText));
            }
          } 
         signup.open("POST","http://127.0.0.1:5000/signup",true);
         signup.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         signup.send("firstname="+user.firstname+"&familyname="+user.familyname+"&gender="+user.gender+"&city="+user.city+"&country="+user.country+"&email="+user.email+"&password="+user.password);

        
          //funktion som hämtar datan
                 

        function grabdata(data) {

          document.getElementById("up").innerHTML = data.message;
          document.getElementById("firstname").value = "" ;
          document.getElementById("familyname").value = "" ;  
          document.getElementById("city").value = ""; 
          document.getElementById("country").value = "" ;
          document.getElementById("email").value = "" ;
          document.getElementById("password").value = "" ;
          document.getElementById("repeatpsw").value = "" ;
          
          }


    /*  var result = serverstub.signUp(user);
      document.getElementById("up").innerHTML = result.message;
      document.getElementById("firstname").value = "" ;
      document.getElementById("familyname").value = "" ;  
      document.getElementById("city").value = ""; 
      document.getElementById("country").value = "" ;
      document.getElementById("email").value = "" ;
      document.getElementById("password").value = "" ;
      document.getElementById("repeatpsw").value = "" ;*/

    }
  }



var reloadwall = function(){


function call(email){
        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
            grabdata(JSON.parse(req.responseText));
            }
          } 
         req.open("POST","http://127.0.0.1:5000/getusermessagesbyemail",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("email="+email);

         // funktion som hämtar datan
                 
          function grabdata(data) {

          var messages = data.data;
          console.log(messages);

          document.getElementById("wall").innerHTML = "";


          // måste modifera denna beroende på hur vi väljer att tolka datan.

          /*for (var i=0;i<messages.length;i++)
          {

          document.getElementById("wall").innerHTML +=  messages[i].writer +  " " +  "says" + ":" + " " + messages[i].content + "<br>";

          }*/
      
          }
        }

  call(localStorage.getItem("activeProfile"));


// gammal kod



/*var messages = serverstub.getUserMessagesByEmail(localStorage.getItem("currentUser"), localStorage.getItem("activeProfile")).data;

document.getElementById("wall").innerHTML = "";

for (var i=0;i<messages.length;i++)
{

document.getElementById("wall").innerHTML +=  messages[i].writer +  " " +  "says" + ":" + " " + messages[i].content + "<br>";

}*/


}

var finduser = function(formData){

  var useremail ={

    "emailinput" : formData.emailinput.value

  }
  localStorage.setItem("activeProfile", useremail.emailinput);
  homeview();
  home();
  reloadwall();

}

var postmessage = function(formData){

  var content ={
    "post" : formData.post.value
  }  
  

  function call(token, email, message){
        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
            grabdata(JSON.parse(req.responseText));
            }
          } 
         req.open("POST","http://127.0.0.1:5000/postmessage",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("token="+token+"&email="+email+"&message="+message);

        
          //funktion som hämtar datan
                 
          function grabdata(data) {

          //här ska vi hämta success eller fail

      
          }
        }

  call(localStorage.getItem("currentUser"), localStorage.getItem("activeProfile"), content.post);


  // gammal data

  //serverstub.postMessage(localStorage.getItem("currentUser"), content.post, serverstub.getUserDataByEmail(localStorage.getItem("currentUser"), localStorage.getItem("activeProfile")).data.email);
  reloadwall();

}

 
function popdata(email){

  function call(email){
        var req = new XMLHttpRequest();
          req.onreadystatechange=function()
          {
          if (req.readyState==4 && req.status==200)
            {
            grabdata(JSON.parse(req.responseText));
            }
          } 
         req.open("POST","http://127.0.0.1:5000/getuserdatabyemail",true);
         req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         req.send("email="+email);

        
          //funktion som hämtar datan
                 
          function grabdata(data) {

          document.getElementById("name").innerHTML = data.firstname + " " + data.familyname + " " + "(" +  data.gender + ")";
          document.getElementById("location").innerHTML = data.city + " " + data.country;
          document.getElementById("email2").innerHTML = data.email;
      
          }
        }

  call(email);


  // gammal kod

 //var user = serverstub.getUserDataByEmail(localStorage.getItem("currentUser"), email);
/*  document.getElementById("fn").innerHTML = user.data.firstname;
  document.getElementById("fmn").innerHTML = user.data.familyname;
  document.getElementById("gender1").innerHTML = user.data.gender;
  document.getElementById("city1").innerHTML = user.data.city;
  document.getElementById("country1").innerHTML = user.data.country;
  document.getElementById("email2").innerHTML = user.data.email;*/

 // document.getElementById("name").innerHTML = user.data.firstname + " " + user.data.familyname + " " + "(" +  user.data.gender + ")";
 // document.getElementById("location").innerHTML = user.data.city + " " + user.data.country;
 // document.getElementById("email2").innerHTML = user.data.email;




}


function home()
{
  document.getElementById("home").className = "show";
  document.getElementById("browse").className = "hidden";
  document.getElementById("account").className = "hidden";
}

function browse()
{
  document.getElementById("home").className = "hidden";
  document.getElementById("browse").className =  "show";
  document.getElementById("account").className =  "hidden";
}

function account()
{
  document.getElementById("home").className = "hidden";
  document.getElementById("browse").className = "hidden";
  document.getElementById("account").className = "show";
}



function startview()
{
  document.getElementById("startview").className = "show";
  document.getElementById("homeview").className = "hidden";
}

function homeview()
{
  popdata(localStorage.getItem("activeProfile"));
  document.getElementById("startview").className = "hidden";
  document.getElementById("homeview").className =  "show";

}


window.onload = function() {
  loadView(localStorage.test);
}




