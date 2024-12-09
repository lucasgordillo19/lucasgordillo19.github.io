class Bala{
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
    this.disparadaUp = false;
    this.disparadaDo = false;
    this.disparadaLe = false;
    this.disparadaRi = false;
  }
  
  dibujar(){
    if(this.disparadaUp === true){
      imagenes[4].resize(60, 70);
      image(imagenes[4], this.posX, this.posY);
      this.moverUp();
    } else if(this.disparadaDo === true){
      imagenes[4].resize(60, 70);
      image(imagenes[4], this.posX, this.posY);
      this.moverDo();
    } else if(this.disparadaLe === true){
      imagenes[4].resize(60, 70);
      image(imagenes[4], this.posX, this.posY);
      this.moverLe();
    } else if(this.disparadaRi === true){
      imagenes[4].resize(60, 70);
      image(imagenes[4], this.posX, this.posY);
      this.moverRi();
    }
  }
  moverUp(){
    this.posY-=15;
  }
  moverDo(){
    this.posY+=15;
  }
  moverLe(){
    this.posX-=15;
  }
  moverRi(){
    this.posX+=15;
  }
  
  dispararUp(){
    this.disparadaUp = true;
    this.disparadaDo = false;
    this.disparadaLe = false;
    this.disparadaRi = false;
  }
  dispararDo(){
    this.disparadaUp = false;
    this.disparadaDo = true;
    this.disparadaLe = false;
    this.disparadaRi = false;
  }
  dispararLe(){
    this.disparadaUp = false;
    this.disparadaDo = false;
    this.disparadaLe = true;
    this.disparadaRi = false;
  }
  dispararRi(){
    this.disparadaUp = false;
    this.disparadaDo = false;
    this.disparadaLe = false;
    this.disparadaRi = true;
  }
}
