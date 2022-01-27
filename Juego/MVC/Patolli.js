class Patolli{
    constructor(Configuracion,Banco,Tablero)
    {
        this.Jugadores= new Array();
        this.Configuracion=Configuracion;
        this.Banco=Banco;
        this.Tablero=Tablero;
    }
   
    InsertarFicha(idFicha,idCasilla)
    {
        this.Tablero.InsertarFicha(idFicha,idCasilla);
    }
    AgregarJugador(xJugador)
    {
     
        this.Jugadores.push(xJugador);
    }
    AgregarJugadores(Jugadores)
    {
        this.Jugadores=(Jugador)(Jugadores);
    }
    Apostar(idJugador,Cantidad)
    {
        this.Jugadores[idJugador].Credito=Cantidad;
    }
    EliminarJugador(idJugador)
    {
        this.Jugadores[idJugador].setEnJuego(false);
    }
    LanzarCañas()
    {
        var Resultado=new Array(5);
        for (let i = 0; i < Resultado.length; i++) {
            var random=Math.floor(Math.random()*2);
            Resultado[i]=random;
        }
        return Resultado;
    }
    CobrarApuesta(idJugador)
    {
        this.Jugadores[idJugador].Credito+=this.Banco.Cantidad;
    }
    getJugadores()
    {
        return this.Jugadores;
    }
    LimpiarJugadores()
    {
        this.Jugadores=new Array();
    }
   getConfiguracion()
   {
       return this.Configuracion;
   }
   getBanco()
   {
       return this.Banco;
   }
   setTablero(Tablero)
   {
       this.Tablero=Tablero;
   }
   getTablero()
   {
       return this.Tablero;
   }
}