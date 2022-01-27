class ControladorPatolli{
    constructor(Configuracion,Banco,Tablero)
    {
        this.Modelo=new Patolli(Configuracion,Banco,Tablero);
    }

    InsertarFicha(idFicha,idCasilla)
    {
        this.Modelo.Tablero.InsertarFicha(idFicha,idCasilla);
    }
    AgregarJugador(xJugador)
    {
        this.Modelo.AgregarJugador(xJugador);
    }
    AgregarJugadores(xJugador)
    {
        this.Modelo.AgregarJugadores(xJugador);
    }
    Apostar(idJugador,Cantidad)
    {
        this.Modelo.Jugadores[idJugador].Credito=Cantidad;
    }
    EliminarJugador(idJugador)
    {
        this.Modelo.EliminarJugador(idJugador);
    }
    LanzarCañas()
    {
        return this.Modelo.LanzarCañas();
    }
    CobrarApuesta(idJugador)
    {
        this.Modelo.CobrarApuesta(idJugador);
    }
    getJugadores()
    {
        return this.Modelo.getJugadores();
    }
    getMod()
    {
        return this.Modelo;
    }
    LimpiarJugadores()
    {
        this.Modelo.LimpiarJugadores();
    }
    getConfiguracion()
    {
        return this.Modelo.Configuracion;
    }
    getBanco()
    {
        return this.Modelo.getBanco();
    }
    setTablero(Tablero)
    {
        this.Modelo.setTablero(Tablero);
    }
    getTablero()
    {
        return this.Modelo.getTablero();
    }
}