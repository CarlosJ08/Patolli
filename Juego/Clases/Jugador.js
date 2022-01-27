class Jugador{
    
    constructor(idJugador,Fichas,Color,Credito,Puntos,EnJuego,Nombre){
        this.idJugador=idJugador;
        this.Fichas=Fichas;
        this.Color=Color;
        this.Credito=Credito;
        this.Puntos=Puntos;
        this.EnJuego=EnJuego;
        this.Nombre=Nombre;
    }

    getIdJugador()
    {
        return this.idJugador;
    }
    getFichas()
    {
        return this.Fichas;
    }
    
    getColor()
    {
        return this.Color;
    }
    setColor(Color)
    {
        this.Color=Color;
    }
    getCredito()
    {
        return this.Credito;
    }
    setCredito(Credito)
    {
        this.Credito=Credito;
    }
    getPuntos()
    {
        return Puntos;
    }
    setPuntos(Puntos)
    {
        this.Puntos=Puntos;
    }
    getEnJuego()
    {
        return this.EnJuego;
    }
    setEnJuego(EnJuego)
    {
        this.EnJuego=EnJuego;
    }
    setFicha(idFicha,idCasilla)
    {
        this.Fichas[idFicha].setIdCasiila(idCasilla);
    }
    getFichaPrincipal()
    {
        for (let i = 0; i < this.Fichas.length; i++) {
            if(this.Fichas[i].getEsPrincipal())
            {
                console.log("ret "+ i);
                return i;
            }
                
        }
    }
    getFichasEnUso()
    {
        var contador=0;
        for (let i = 0; i < this.Fichas.length; i++) {
            if(this.Fichas[i].getEnUso())
            {
              
                contador++;
            }      
        }
        return contador;
    }
    setNombre(Nombre)
    {
        this.Nombre=Nombre;
    }

    VerificarSiGano()
    {
        var contador=0;
        for (let i = 0; i < this.Fichas.length; i++) {
            if(this.Fichas[i].getTerminoRecorrido())
            {
              
                contador++;
            }      
        }
        if(contador==this.Fichas.length){
            return true;
        }
        else{
            return false;
        }
    }

}