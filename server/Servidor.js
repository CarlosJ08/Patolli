var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var NumeroJugador=0;
var Turno=1;
var TopeJugadores=0;
var Jugadores=new Array();
var Configuracion;
var Tablero;
var xTablero;
var Controlador=null;
var Banco=null;
app.use(express.static('Juego'));
var cors = require('cors');


    
 io.on('connection', function(socket) { console.log(NumeroJugador);
        console.log('Un jugador se ha conectado');  
        NumeroJugador++;
        socket.emit("NumeroJugador", NumeroJugador);
        

        socket.on("IniciarJuego",function(datos){
                Controlador=datos;
                io.sockets.emit("JuegoIniciado",datos);
                TopeJugadores=NumeroJugador;
        });
        socket.on('NuevoJugador',function(datos){
                Jugadores.push(datos.NuevoJ);
                Tablero=datos.Tablero;
                if(datos.NuevoJ.idJugador==1)
                {
                Configuracion=datos.xConfiguracion;
                Banco=datos.xBanco;
                xTablero=datos.xTablero;
                 }
                var DatosInicio={
                        ListaJugadores:Jugadores,
                        Configuracion:Configuracion,
                        Banco:Banco,
                        ValidarColor:datos.ValidarColor,
                        Tablero:xTablero
                }

                io.sockets.emit("NuevosJugadores", DatosInicio);    
                io.sockets.emit("TableroInicio",Tablero);  
        }); 


        socket.on('Lanzar',function(datos){
                Turno++;
                if(Turno>TopeJugadores){
                        Turno=1;
                }
                console.log("Turno "+ Turno);
                var DatosLanzada={
                        Tablero:datos.xTablero,
                        SigTurno:Turno,
                        Jugador:datos.Jugador,
                        Banco:datos.xBanco
                }
                io.sockets.emit('TurnoJugador', DatosLanzada);
                
        });
        socket.on("UnGanador",function(datos){
                io.sockets.emit("AlguienGano",datos);
        })
        });

server.listen(8080,"0.0.0.0", function() {
        console.log('Servidor corriendo en http://localhost:8080');
    });







//./ngrok http 8080
//lt --port 8080