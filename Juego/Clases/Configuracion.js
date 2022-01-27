class Configuracion{
    
    constructor(NumeroJugadores,CantidadFichas,CreditoJugadores){
        this.NumeroJugadores=NumeroJugadores;
        this.CantidadFichas=CantidadFichas;
        this.CreditoJugadores=CreditoJugadores;
       
    }

    getCantidadFichas()
    {
        return CantidadFichas;
    }
    setCantidadFichas(CantidadFichas){
        this.CantidadFichas=CantidadFichas;
    }
    setCreditoJugadores(CreditoJugadores)
    {
        this.CreditoJugadores=CreditoJugadores;
    }
    getCreditoJugadores()
    {
        return this.CreditoJugadores;
    }
    getNumeroJugadores()
    {
        return this.NumeroJugadores;
    }
    setNumeroJugadores(NumeroJugadores){
        this.NumeroJugadores=NumeroJugadores;
    }

}