class Tablero{
    constructor(Casillas)
    {
        this.Casillas=Casillas;
    }
    getCasillas()
    {
        return this.Casillas;
    }
    setCasillas(Casillas)
    {
        this.Casillas=Casillas;
    }
    InsertarFicha(idFicha,idCasilla)
    {
        this.Casillas[idCasilla].idFicha=idFicha;
    }
}