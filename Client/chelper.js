//syftet med denna fil är att underlätta kommunikationen med servern från klientsidan
//vi skulle även eventuellt kunna använda serverstub om vi får
//sista alternativet är att skriva koden direkt i client.js	 


function gettoken(){

        var call = new XMLHttpRequest();
          call1.onreadystatechange=function()
          {
          if (call.readyState==4 && call1.status==200)
            {
            grabdata(JSON.parse(call1.responseText));
            }
          } 
         call.open("POST","http://127.0.0.1:5000/signin",true);
	       call.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         call.send("email="+userid.email1+"&password="+userid.password1);

        function grabdata(data) {

          return data; // måste returna ut ur funktionen
      
        }

    }


function getemail(token){

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

        return data;   // måste returna ut ur funktionen

        }
          


}











        v