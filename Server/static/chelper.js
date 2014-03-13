//syftet med denna fil är att underlätta kommunikationen med servern från klientsidan
//vi skulle även eventuellt kunna använda serverstub om vi får
//sista alternativet är att skriva koden direkt i client.js	 
var chelper = new Object();

chelper.getToken = function(){

        var signin = new XMLHttpRequest();
          signin.onreadystatechange=function()
          {
          if (signin.readyState==4 && signin.status==200)
            {
            login(JSON.parse(signin.responseText));
            }
          } 
         signin.open("POST","http://127.0.0.1:5000/signin",true);
         signin.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         signin.send("email="+userid.email1+"&password="+userid.password1);

        
          //funktion som hämtar datan
                 
          function login(data) {

          console.log(data.data);
          console.log(data.message);
          console.log(data.success);

          alert(document.getElementById("in").innerHTML = data.message);
          localStorage.setItem("currentUser", data.data);
          localStorage.test = data.data;
          loadView(data.data);
          reloadwall();
      
          }

    }


chelper.getEmail = function(){

          var call = new XMLHttpRequest();
          call.onreadystatechange=function()
          {
          if (call.readyState==4 && call.status==200)
            {
            grabdata(JSON.parse(call2.responseText));
            }
          } 
         call.open("POST","http://127.0.0.1:5000/getuserdatabytoken",true);
         call.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         call.send("token="+token);

        function grabdata(data) {

        localStorage.setItem("activeProfile", data.data);

        }
          


}











        v