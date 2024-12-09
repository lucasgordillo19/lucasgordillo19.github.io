class Personaje{
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
    this.bala = new Bala()
  }
  
  dibujar(){
    this.bala.dibujar();
    imagenes[2].resize(80, 130);
    image(imagenes[2], this.posX, this.posY);
    if(this.posX < 0 || this.posX > width || this.posY < 0 || this.posY > height){
      this.morir();
    }
  }
  
  
  teclaPresionada(keyCode){
    if(keyCode == 87){
      this.moverUp();
    }else if(keyCode == 83){
      this.moverDo();
    }else if(keyCode == 68){
      this.moverRi();
    }else if(keyCode == 65){
      this.moverLe();
    }else if(keyCode == 38 ){
      this.dispararUp();
    }else if(keyCode == 40 ){
      this.dispararDo();
    }else if(keyCode == 37 ){
      this.dispararLe();
    }else if(keyCode == 39 ){
      this.dispararRi();
    }
  }
  
  moverUp(){
    this.posY -=25;
  }
  
  moverDo(){
    this.posY +=25;
  }
  
  moverLe(){
    this.posX -=25;
  }
  
  moverRi(){
    this.posX +=25;
  }

  morir(){
   if(pantallas){
     pantallas.cambiarEstado("gameover");
    }
  }
  
  dispararUp(){
    this.bala = new Bala(this.posX, this.posY);
    this.bala.dispararUp();
  }
  
  dispararDo(){
    this.bala = new Bala(this.posX, this.posY);
    this.bala.dispararDo();
  }
  
  dispararLe(){
    this.bala = new Bala(this.posX, this.posY);
    this.bala.dispararLe();
  }
  
  dispararRi(){
    this.bala = new Bala(this.posX, this.posY);
    this.bala.dispararRi();
  }
  
  haDisparadoUp(){
    return this.bala.disparadaUp;
  }
  
  haDisparadoDo(){
    return this.bala.disparadaDo;
  }
  
  haDisparadoLe(){
    return this.bala.disparadaLe;
  }
  
  haDisparadoRi(){
    return this.bala.disparadaRi;
  }
}
