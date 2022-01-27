class Casilla{
  
    constructor(idCasilla,TipoCasilla){
        this.idCasilla=idCasilla;
        this.idFicha=0;
        this.TipoCasilla=TipoCasilla;
        this.Enuso=false;
    }

    getIdFicha()
    {
        return idFicha;
    }
    setIdFicha(idFicha){
        this.idFicha=idFicha;
    }
    getIdCasilla()
    {
        return idCasilla;
    }
    getTipoCasilla()
    {
        return TipoCasilla;
    }
    setTipoCasilla(TipoCasilla)
    {
        this.TipoCasilla=TipoCasilla;
    }
    setEnUso(EnUso)
    {
        this.EnUso=EnUso;
    }
    getEnUso()
    {
        return this.EnUso;
    }
}