
var Config;
var Banca;
var TableroJuego;
var Controlador = null;
var TurnoJugador = 1;

var socket = io.connect('http://localhost:8080', { 'forceNew': true, transport : ['websocket']  });
document.body.onload = CrearTablero;

var btnAceptar = document.getElementById("AceptarConfiguracion");
btnAceptar.addEventListener("click", IniciarJuego);
var NumeroTurno = 1;
document.getElementById("lanzarCaña").disabled=true;
socket.on("TurnoJugador", function (datos) {
	TurnoJugador = datos.SigTurno;
	document.getElementById("tablero").innerHTML = datos.Tablero;

	if (TurnoJugador != NumeroTurno) {
		document.getElementById("lanzarCaña").disabled = true;
	} else {
		document.getElementById("lanzarCaña").disabled = false;
	}
	document.getElementById("ApuestaJugador"+datos.Jugador.idJugador).innerHTML="Apuesta: "+ datos.Jugador.Credito;
	document.getElementById("CantidadBanco").innerHTML=datos.Banco.Cantidad;
	Controlador.getBanco().setCantidad(Number(datos.Banco.Cantidad));

});


socket.on("NumeroJugador", function (datos) {
	NumeroTurno = datos;
	if(NumeroTurno==1)
	{


		document.getElementById("btnJugador").style.setProperty("display","inline");
	
	}
	document.getElementById("txtJugador").innerHTML="Jugador "+ NumeroTurno;
	document.getElementById("Jugador" + NumeroTurno).style.setProperty("display", "inline")
});
socket.on("NuevosJugadores", function (datos) {
	console.log(datos);
	document.getElementById("J"+NumeroTurno+datos.ValidarColor).disabled=true;
	document.getElementById("LJ"+NumeroTurno+datos.ValidarColor).style.setProperty("border-Color","darkgray");
	document.getElementById("btnJugador").style.setProperty("display","inline");
	document.getElementById("lanzarCaña").disabled=false;
	if (Controlador != null) {
		
		Controlador.LimpiarJugadores();
		Controlador.getConfiguracion().setNumeroJugadores(datos.ListaJugadores.length);
		Controlador.getConfiguracion().setCantidadFichas(datos.Configuracion.CantidadFichas);
		Controlador.getConfiguracion().setCreditoJugadores(datos.Configuracion.CreditoJugadores);
		var Casillas= new Array(56);
		Controlador.getBanco().setCantidad(Controlador.getConfiguracion().getNumeroJugadores()*Controlador.getConfiguracion().getCreditoJugadores());
		datos.Tablero.Casillas.map(function (datos,i){
			Casillas[i]=new Casilla(datos.idCasilla, "Comun");
		});

		xTab=new Tablero(Casillas);
		Controlador.setTablero(xTab);
		Banca.setCantidad(Controlador.getConfiguracion().getNumeroJugadores()*Controlador.getConfiguracion().getCreditoJugadores());
		datos.ListaJugadores.map(function (dat, i) {
			var Fichas = new Array(dat.Fichas.length);
			dat.Fichas.map(function (datosFicha, ind) {
				var NFicha = new Ficha(datosFicha.idFicha, datosFicha.EnUso);
				NFicha.setIdCasilla(datosFicha.idCasilla);

				NFicha.EsPrincipal = datosFicha.EsPrincipal;

				Fichas[ind] = NFicha;
			});


			var JugadorNuevo = new Jugador(dat.idJugador, Fichas, dat.Color,Number( Controlador.getConfiguracion().getCreditoJugadores()), dat.Puntos, dat.EnJuego, dat.Nombre);
			Controlador.AgregarJugador(JugadorNuevo);
			document.getElementById("NJugador" + dat.idJugador).innerHTML = dat.Nombre;
			document.getElementById("NJugador" + dat.idJugador).style.setProperty("background-Color", dat.Color);
			document.getElementById("ApuestaJugador" + dat.idJugador).innerHTML = "Apuesta: "+Controlador.getConfiguracion().getCreditoJugadores();
		});
		
		document.getElementById("CantidadBanco").innerHTML = Banca.getCantidad();
	}
});
socket.on("AlguienGano",function(datos){
	alert("Gano "+datos.Nombre+"!");
	document.getElementById("ApuestaJugador" + datos.idJugador).innerHTML="Gano: "+Banca.getCantidad();
	document.getElementById("lanzarCaña").disabled=true;
	document.getElementById("CantidadBanco")="0";
})

var CasillasIniciales = [8, 36, 19, 47];
var RecorridoJ1 = [8, 9, 10, 60, 11, 12, 13, 27, 26, 25, 61, 24, 23, 22, 35, 36, 37, 38, 62, 39, 40, 41, 55, 54, 53, 63, 52, 51, 50, 49, 19, 18, 17, 64, 16, 15, 14, 0, 1, 2, 65, 3, 4, 5, 48, 47, 46, 45, 66, 44, 43, 42, 28, 29, 30, 67, 31, 32, 33, 34, 8];
var RecorridoJ2 = [36, 37, 38, 62, 39, 40, 41, 55, 54, 53, 63, 52, 51, 50, 49, 19, 18, 17, 64, 16, 15, 14, 0, 1, 2, 65, 3, 4, 5, 48, 47, 46, 45, 66, 44, 43, 42, 28, 29, 30, 67, 31, 32, 33, 34, 8, 9, 10, 60, 11, 12, 13, 27, 26, 25, 61, 24, 23, 22, 35, 36];
var RecorridoJ3 = [19, 18, 17, 64, 16, 15, 14, 0, 1, 2, 65, 3, 4, 5, 48, 47, 46, 45, 66, 44, 43, 42, 28, 29, 30, 67, 31, 32, 33, 34, 8, 9, 10, 60, 11, 12, 13, 27, 26, 25, 61, 24, 23, 22, 35, 36, 37, 38, 62, 39, 40, 41, 55, 54, 53, 63, 52, 51, 50, 49, 19];
var RecorridoJ4 = [47, 46, 45, 66, 44, 43, 42, 28, 29, 30, 67, 31, 32, 33, 34, 8, 9, 10, 60, 11, 12, 13, 27, 26, 25, 61, 24, 23, 22, 35, 36, 37, 38, 62, 39, 40, 41, 55, 54, 53, 63, 52, 51, 50, 49, 19, 18, 17, 64, 16, 15, 14, 0, 1, 2, 65, 3, 4, 5, 48, 47];
var Recorrido = [RecorridoJ1, RecorridoJ2, RecorridoJ3, RecorridoJ4];

socket.on("TableroInicio", function (datos) {
	document.getElementById("tablero").innerHTML = datos;

});
function IniciarJuego() {

	var visConfig = new visConfiguracion();
	Config = visConfig.ObtenerInformacion();
	
	Banca = new Banco((Config.getCreditoJugadores() * Config.getNumeroJugadores()));
	Controlador = new ControladorPatolli(Config, Banca, TableroJuego);
	socket.emit("IniciarJuego", Controlador);
	var Fichas = Config.getCantidadFichas();
	console.log("Jugador " + NumeroTurno);
	var ColorJugador = document.getElementById("NJugador" + NumeroTurno).style.backgroundColor;

	var FichasJugador = new Array(Fichas);
	console.log(Config.getCantidadFichas());
	console.log(FichasJugador);

	for (let j = 0; j < Fichas; j++) {
		FichasJugador[j] = new Ficha(j, false);

	}
	console.log(FichasJugador);
	console.log(document.getElementById("tablero"));
	var NuevoJugador = new Jugador(NumeroTurno, FichasJugador, ColorJugador, Config.CreditoJugadores, 0, true, document.getElementById("NombreJugador" + NumeroTurno).value);
	NuevoJugador.getFichas()[0].setIdCasilla(CasillasIniciales[NumeroTurno - 1]);

	NuevoJugador.getFichas()[0].ConvertirEnPrincipal();
	NuevoJugador.getFichas()[0].setEnUso(true);

	document.getElementById(CasillasIniciales[NumeroTurno - 1]).style.setProperty("background-color", ColorJugador);
	Controlador.setTablero(TableroJuego);
	var DatosInicio = {
		Tablero: document.getElementById("tablero").innerHTML,
		NuevoJ: NuevoJugador,
		xConfiguracion: Config,
		xBanco: Banca,
		ValidarColor:ValidarColor,
		xTablero:TableroJuego
	}

	socket.emit("NuevoJugador", DatosInicio);
	document.getElementById("btnJugador").disabled=true;

}

function CrearTablero() {
	var Casillas = new Array();
	for (var i = 0; i <= 55; i++) {
		if (i < 14) {
			var NuevaCasilla = new Casilla(i, "Comun");
			var horizontal = document.getElementById("horizontal");
			var vertical = document.getElementById("vertical");

			var divNuevo = document.createElement("div");
			divNuevo.setAttribute("title", i);
			divNuevo.setAttribute("class", "casillaTipo1");
			divNuevo.setAttribute("id", i);
			if (i == 0) {
				divNuevo.style.setProperty("border-top-right-radius", "20px");
				divNuevo.style.setProperty("border-top-left-radius", "20px");
			}
			else if (i == 13) {
				divNuevo.style.setProperty("border-bottom-right-radius", "20px");
				divNuevo.style.setProperty("border-bottom-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			horizontal.appendChild(divNuevo);
			if (i == 2 || i == 10) {
				divNuevo.setAttribute("title", i + "linear-gradient(45deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(45deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")
			}
			if (i == 3 || i == 11) {
				divNuevo.setAttribute("title", i + "linear-gradient(-225deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-225deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")

			}
			if (i == 6 || i == 7) {
				divNuevo.style.setProperty("border", "none");
			}
			Casillas.push(NuevaCasilla);
		}


		if (i >= 14 && i < 28) {
			var NuevaCasilla = new Casilla(i, "Comun");
			var divNuevo = document.createElement("div");
			divNuevo.setAttribute("title", i);
			divNuevo.setAttribute("class", "casillaTipo2");
			divNuevo.setAttribute("id", i);
			if (i == 14) {
				divNuevo.style.setProperty("border-top-right-radius", "20px");
				divNuevo.style.setProperty("border-top-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			else if (i == 27) {
				divNuevo.style.setProperty("border-bottom-right-radius", "20px");
				divNuevo.style.setProperty("border-bottom-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			if (i == 20 || i == 21) {
				divNuevo.style.setProperty("border", "none");
			}
			if (i == 16 || i == 24) {
				divNuevo.setAttribute("title", i + "linear-gradient(-45deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-45deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")
			}
			if (i == 17 || i == 25) {
				divNuevo.setAttribute("title", i + "linear-gradient(-135deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-135deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")

			}
			horizontal.appendChild(divNuevo);
			Casillas.push(NuevaCasilla);
		}
		if (i >= 28 && i <= 41) {
			var NuevaCasilla = new Casilla(i, "Comun");

			var divNuevo = document.createElement("div");
			divNuevo.setAttribute("title", i);
			divNuevo.setAttribute("class", "casillaTipo1");
			divNuevo.setAttribute("id", i);
			if (i == 28) {
				divNuevo.style.setProperty("border-top-right-radius", "20px");
				divNuevo.style.setProperty("border-top-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			if (i == 30 || i == 38) {
				divNuevo.setAttribute("title", i + "linear-gradient(45deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(45deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")
			}
			if (i == 31 || i == 39) {
				divNuevo.setAttribute("title", i + "linear-gradient(-225deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-225deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")

			}
			else if (i == 41) {
				divNuevo.style.setProperty("border-bottom-right-radius", "20px");
				divNuevo.style.setProperty("border-bottom-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			vertical.appendChild(divNuevo);
			Casillas.push(NuevaCasilla);
		}


		if (i > 41 && i <= 55) {
			var NuevaCasilla = new Casilla(i, "Comun");
			var divNuevo = document.createElement("div");
			divNuevo.setAttribute("title", i);
			divNuevo.setAttribute("class", "casillaTipo2");
			divNuevo.setAttribute("id", i);
			if (i == 42) {
				divNuevo.style.setProperty("border-top-right-radius", "20px");
				divNuevo.style.setProperty("border-top-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}
			if (i == 44 || i == 52) {
				divNuevo.setAttribute("title", i + "linear-gradient(-45deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-45deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")
			}
			if (i == 45 || i == 53) {
				divNuevo.setAttribute("title", i + "linear-gradient(-135deg,black 50%, white 50%)");
				divNuevo.style.setProperty("background", "linear-gradient(-135deg,black 50%, white 50%)");
				NuevaCasilla.setTipoCasilla("Triangulo")
			}
			else if (i == 55) {
				divNuevo.style.setProperty("border-bottom-right-radius", "20px");
				divNuevo.style.setProperty("border-bottom-left-radius", "20px");
				NuevaCasilla.setTipoCasilla("Esquina")
			}

			vertical.appendChild(divNuevo);
			Casillas.push(NuevaCasilla);
		}
	}

	TableroJuego = new Tablero(Casillas);

}

var boton = document.getElementById("lanzarCaña");
boton.addEventListener("click", Lanzar);

var txtAvanzar = document.getElementById("txtAvanzar");

function Lanzar() {

	var Resultado = Controlador.LanzarCañas();

	var Contador = 0;
	for (var i = 0; i < Resultado.length; i++) {

		var caña = document.getElementById("caña" + (i + 1));
		if (Resultado[i] == 0) {
			caña.style.setProperty("background-image", "url(Estilos/img/caña0.jpg)");
		} else {
			caña.style.setProperty("background-image", "url(Estilos/img/caña1.jpg)");
			Contador++;
		}
	}
	txtAvanzar.innerHTML = "Avanzas " + Contador + " casillas!";

	
	console.log(TurnoJugador);
	Avanzar(TurnoJugador, Contador, false);
}


function Avanzar(idJugador, Avance, EsOtro) {
if(Avance!=0){
	var idFicha;
	var CasillaAvance;
	var CasillaAvanzada;
	var CasillaAnterior;
	var AvanceAnterior;
	console.log("JUG " + TurnoJugador);
	console.log(Controlador.getJugadores());

		idJugador--;

	idFicha = Controlador.getJugadores()[idJugador].getFichaPrincipal();
	CasillaAnterior = Controlador.getJugadores()[idJugador].getFichas()[idFicha].getIdCasilla();
	AvanceAnterior = Controlador.getJugadores()[idJugador].getFichas()[idFicha].getAvance();
	Controlador.getJugadores()[idJugador].getFichas()[idFicha].Mover(Avance);
	CasillaAvance = Controlador.getJugadores()[idJugador].getFichas()[idFicha].getAvance();
	CasillaAvanzada = Recorrido[idJugador][CasillaAvance];
	console.log("c"+ CasillaAvance);
	console.log(Controlador.getTablero().getCasillas());	
	Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(Recorrido[Avance]);


	if (CasillaAvanzada < 60 && CasillaAvanzada != 10 && CasillaAvanzada != 11 && CasillaAvanzada != 25 && CasillaAvanzada != 24 && CasillaAvanzada != 38 && CasillaAvanzada != 39 && CasillaAvanzada != 53 && CasillaAvanzada != 52 && CasillaAvanzada != 17 && CasillaAvanzada != 16 && CasillaAvanzada != 2 && CasillaAvanzada != 3 && CasillaAvanzada != 45 && CasillaAvanzada != 44 && CasillaAvanzada != 30 && CasillaAvanzada != 31) {
		document.getElementById(CasillaAvanzada).style.setProperty("background-color", Controlador.getJugadores()[idJugador].getColor());
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);

	}
	else if (CasillaAvanzada == 10 || CasillaAvanzada == 2 || CasillaAvanzada == 38 || CasillaAvanzada == 30) {
		document.getElementById(CasillaAvanzada).style.setProperty("background", "linear-gradient(45deg,black 50%," + Controlador.getJugadores()[idJugador].getColor() + " 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
	}
	else if (CasillaAvanzada == 11 || CasillaAvanzada == 3 || CasillaAvanzada == 39 || CasillaAvanzada == 31) {
		document.getElementById(CasillaAvanzada).style.setProperty("background", "linear-gradient(-225deg,black 50%," + Controlador.getJugadores()[idJugador].getColor() + " 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
	}
	else if (CasillaAvanzada == 24 || CasillaAvanzada == 52 || CasillaAvanzada == 16 || CasillaAvanzada == 44) {
		document.getElementById(CasillaAvanzada).style.setProperty("background", "linear-gradient(-45deg,black 50%," + Controlador.getJugadores()[idJugador].getColor() + " 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
	}
	else if (CasillaAvanzada == 25 || CasillaAvanzada == 53 || CasillaAvanzada == 17 || CasillaAvanzada == 45) {
		document.getElementById(CasillaAvanzada).style.setProperty("background", "linear-gradient(-135deg,black 50%," + Controlador.getJugadores()[idJugador].getColor() + " 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
	}
	else if (CasillaAvanzada == 60 || CasillaAvanzada == 62 || CasillaAvanzada == 65 || CasillaAvanzada == 67) {
		document.getElementById(Recorrido[idJugador][CasillaAvance - 1]).style.setProperty("background", "linear-gradient(45deg," + Controlador.getJugadores()[idJugador].getColor() + " 50%,white 50%)");
		document.getElementById(Recorrido[idJugador][CasillaAvance + 1]).style.setProperty("background", "linear-gradient(-225deg," + Controlador.getJugadores()[idJugador].getColor() + " 50%,white 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
		Banca.setCantidad((Number(Banca.getCantidad())+Number(Controlador.getConfiguracion().getCreditoJugadores())));
		Controlador.getJugadores()[idJugador].setCredito((Number(Controlador.getJugadores()[idJugador].getCredito())+Number(Controlador.getConfiguracion().getCreditoJugadores())));
		document.getElementById("ApuestaJugador"+(idJugador+1)).innerHTML="Apuesta: "+ Controlador.getJugadores()[idJugador].getCredito();
	document.getElementById("CantidadBanco").innerHTML=Banca.getCantidad();
	}
	else if (CasillaAvanzada == 61 || CasillaAvanzada == 63 || CasillaAvanzada == 64 || CasillaAvanzada == 66) {
		document.getElementById(Recorrido[idJugador][CasillaAvance - 1]).style.setProperty("background", "linear-gradient(-135deg," + Controlador.getJugadores()[idJugador].getColor() + " 50%,white 50%)");
		document.getElementById(Recorrido[idJugador][CasillaAvance + 1]).style.setProperty("background", "linear-gradient(-45deg," + Controlador.getJugadores()[idJugador].getColor() + " 50%,white 50%)");
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setIdCasilla(CasillaAvanzada);
		Banca.setCantidad((Number(Banca.getCantidad())+Number(Controlador.getConfiguracion().getCreditoJugadores())));
		Controlador.getJugadores()[idJugador].setCredito((Number(Controlador.getJugadores()[idJugador].getCredito())+Number(Controlador.getConfiguracion().getCreditoJugadores())));
		document.getElementById("ApuestaJugador"+(idJugador+1)).innerHTML="Apuesta: "+ Controlador.getJugadores()[idJugador].getCredito();
	document.getElementById("CantidadBanco").innerHTML=Banca.getCantidad();
	}
	if(CasillaAvance>=61)
	{
		Controlador.getJugadores()[idJugador].getFichas()[idFicha].setTerminoRecorrido(true);
		txtAvanzar.innerHTML="¡Tu ficha llego al final!";
	}
	if (CasillaAnterior < 60 && CasillaAnterior != 10 && CasillaAnterior != 11 && CasillaAnterior != 25 && CasillaAnterior != 24 && CasillaAnterior != 38 && CasillaAnterior != 39 && CasillaAnterior != 53 && CasillaAnterior != 52 && CasillaAnterior != 17 && CasillaAnterior != 16 && CasillaAnterior != 2 && CasillaAnterior != 3 && CasillaAnterior != 45 && CasillaAnterior != 44 && CasillaAnterior != 30 && CasillaAnterior != 31) {
		document.getElementById(CasillaAnterior).style.setProperty("background", "rgb(197, 157, 97)");
	}

	else if (CasillaAnterior == 10 || CasillaAnterior == 2 || CasillaAnterior == 38 || CasillaAnterior == 30 && CasillaAvanzada < 60) {
		document.getElementById(CasillaAnterior).style.setProperty("background", "linear-gradient(45deg,black 50%, white 50%)");
	}
	else if (CasillaAnterior == 11 || CasillaAnterior == 3 || CasillaAnterior == 39 || CasillaAnterior == 31 && CasillaAvanzada < 60) {
		document.getElementById(CasillaAnterior).style.setProperty("background", "linear-gradient(-225deg,black 50%, white 50%)");
	}
	else if (CasillaAnterior == 24 || CasillaAnterior == 52 || CasillaAnterior == 16 || CasillaAnterior == 44 && CasillaAvanzada < 60) {
		document.getElementById(CasillaAnterior).style.setProperty("background", "linear-gradient(-45deg,black 50%, white 50%)");
	}
	else if (CasillaAnterior == 25 || CasillaAnterior == 53 || CasillaAnterior == 17 || CasillaAnterior == 45 && CasillaAvanzada < 60) {
		document.getElementById(CasillaAnterior).style.setProperty("background", "linear-gradient(-135deg,black 50%, white 50%)");
	}
	else if (CasillaAnterior == 60 || CasillaAnterior == 62 || CasillaAnterior == 65 || CasillaAnterior == 67 && CasillaAvanzada != Recorrido[idJugador][AvanceAnterior + 1]) {
		document.getElementById(Recorrido[idJugador][AvanceAnterior - 1]).style.setProperty("background", "linear-gradient(45deg,black 50%,white 50%)");
		document.getElementById(Recorrido[idJugador][AvanceAnterior + 1]).style.setProperty("background", "linear-gradient(-225deg,black 50%,white 50%)");
		
		
	}
	else if (CasillaAnterior == 61 || CasillaAnterior == 63 || CasillaAnterior == 64 || CasillaAnterior == 66 && CasillaAvanzada != Recorrido[idJugador][AvanceAnterior + 1]) {
		document.getElementById(Recorrido[idJugador][AvanceAnterior - 1]).style.setProperty("background", "linear-gradient(-135deg,black 50%,white 50%)");
		document.getElementById(Recorrido[idJugador][AvanceAnterior + 1]).style.setProperty("background", "linear-gradient(-45deg,black 50%,white 50%)");
		
	}

	if (Avance == 1 && Controlador.getJugadores()[idJugador].getFichasEnUso() < Config.getCantidadFichas() && !EsOtro) {
		var NuevaFicha = (Controlador.getJugadores()[idJugador].getFichaPrincipal() + 1);
		Controlador.getJugadores()[idJugador].getFichas()[Controlador.getJugadores()[idJugador].getFichaPrincipal()].QuitarPrincipal();
		Controlador.getJugadores()[idJugador].getFichas()[NuevaFicha].ConvertirEnPrincipal();
		Controlador.getJugadores()[idJugador].getFichas()[NuevaFicha].setEnUso(true);
		Controlador.getJugadores()[idJugador].getFichas()[NuevaFicha].setIdCasilla(CasillasIniciales[NumeroTurno - 1]);
		document.getElementById(CasillasIniciales[NumeroTurno - 1]).style.setProperty("background-color", Controlador.getJugadores()[idJugador].getColor());
		
	}
	else if (Controlador.getJugadores()[idJugador].getFichaPrincipal() < Controlador.getJugadores()[idJugador].getFichasEnUso() - 1 && !EsOtro) {
		if(!Controlador.getJugadores()[idJugador].getFichas()[Controlador.getJugadores()[idJugador].getFichaPrincipal() + 1].getTerminoRecorrido()){
		Controlador.getJugadores()[idJugador].getFichas()[Controlador.getJugadores()[idJugador].getFichaPrincipal() + 1].ConvertirEnPrincipal();
		Controlador.getJugadores()[idJugador].getFichas()[Controlador.getJugadores()[idJugador].getFichaPrincipal()].QuitarPrincipal();
		}
	}
	else if (Controlador.getJugadores()[idJugador].getFichaPrincipal()!=0 && Controlador.getJugadores()[idJugador].getFichaPrincipal() >= Config.getCantidadFichas() - 1 && !EsOtro) {
		if(!Controlador.getJugadores()[idJugador].getFichas()[0].getTerminoRecorrido()){
		Controlador.getJugadores()[idJugador].getFichas()[Controlador.getJugadores()[idJugador].getFichaPrincipal()].QuitarPrincipal();
		Controlador.getJugadores()[idJugador].getFichas()[0].ConvertirEnPrincipal();
		}
	}

}

if(Controlador.getJugadores()[idJugador].VerificarSiGano())
	{
		socket.emit("UnGanador",Controlador.getJugadores()[idJugador]);
	}

	
console.log("v"+idJugador);
	if (!EsOtro) {
		var Datos={
			xTablero: document.getElementById("tablero").innerHTML,
			Jugador:Controlador.getJugadores()[idJugador],
			xBanco:Banca
		}
		socket.emit('Lanzar',Datos);
	}
	
	// RecorridoJ1[Avance]!=10 && RecorridoJ1[Avance]!=11 && RecorridoJ1[Avance]!=25 && RecorridoJ1[Avance]!=24 && RecorridoJ1[Avance]!=38 && RecorridoJ1[Avance]!=39 && RecorridoJ1[Avance]!=53 && RecorridoJ1[Avance]!=52 && RecorridoJ1[Avance]!=17 && RecorridoJ1[Avance]!=16 && RecorridoJ1[Avance]!=2 && RecorridoJ1[Avance]!=3 && RecorridoJ1[Avance]!=45 && RecorridoJ1[Avance]!=46 && RecorridoJ1[Avance]!=30 && RecorridoJ1[Avance]!=31

}


