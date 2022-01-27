
var ValidarColor;
var btnAceptar=document.getElementById("AceptarConfiguracion");
btnAceptar.addEventListener("click", function(){
    for (let i = 1; i <= NumeroJugadores; i++){
       console.log("J"+i+"Color4");
       if(document.getElementById("J"+i+"Color1").checked==true){
           document.getElementById("NJugador"+i).style.setProperty("background-color","#970000" );
           ValidarColor="Color1";
       }
       if(document.getElementById("J"+i+"Color2").checked==true){
           document.getElementById("NJugador"+i).style.setProperty("background-color", "#1c1fda");
           ValidarColor="Color2";
       }
       if(document.getElementById("J"+i+"Color3").checked==true){
           document.getElementById("NJugador"+i).style.setProperty("background-color", "#43db8f");
           ValidarColor="Color3";
       }
       if(document.getElementById("J"+i+"Color4").checked==true){
           document.getElementById("NJugador"+i).style.setProperty("background-color", "#482058");
           ValidarColor="Color4";
       }
       
       document.getElementById("NJugador"+i).innerHTML=document.getElementById("NombreJugador"+i).value;
       
    }
  
    CantidadFichas=document.getElementById("NumeroFichas").value;
    Credito= document.getElementById("Apuesta").value;
    
});

 var NumeroJugadores=4;

  var CantidadFichas=document.getElementById("NumeroFichas").value;
    var Credito;
    
 
class visConfiguracion{
    constructor()
    {

    }

    ObtenerInformacion()
    {
       return new Configuracion(NumeroJugadores,CantidadFichas,Credito);  
    }
}