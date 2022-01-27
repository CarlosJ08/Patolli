class Ficha{
    
    constructor(idFicha,EnUso){
        this.idFicha=idFicha;
        this.EnUso=EnUso;
        this.idCasilla;
        this.Avance=0;
        this.EsPrincipal=false;
        this.TerminoRecorrido=false;
    }

    getIdFicha()
    {
        return this.idFicha;
    }
    setEnUso(EnUso)
    {
        this.EnUso=EnUso;
    }
    getEnUso()
    {
        return this.EnUso;
    }
    setIdCasilla(idCasilla)
    {
        this.idCasilla=idCasilla;
    }
    getIdCasilla()
    {
        return this.idCasilla;
    }
    Mover(Cantidad)
    {
        this.Avance=this.Avance+Cantidad;

    }
    getAvance()
    {
        return this.Avance;
    }
    ConvertirEnPrincipal()
    {
        this.EsPrincipal=true;
    }
    QuitarPrincipal()
    {
        this.EsPrincipal=false;
    }
    getEsPrincipal()
    {
        return this.EsPrincipal;
    }
    setTerminoRecorrido(TerminoRecorrido)
    {
        this.TerminoRecorrido=TerminoRecorrido;
    }
    getTerminoRecorrido()
    {
        return this.TerminoRecorrido;
    }
}