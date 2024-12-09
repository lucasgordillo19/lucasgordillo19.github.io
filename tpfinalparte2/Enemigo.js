class Enemigo{
  constructor(posX, posY){
    this.posX = posX;
    this.posY = posY;
    this.vivo = true;
  }
  
  dibujar(){
    if(this.vivo){
      imagenes[3].resize(50, 90);
      image(imagenes[3], this.posX, this.posY);
      this.correr();
      if(this.posX <= -30){
        this.reciclar();
      }
    } 
  }
  
  estaVivo(){
    return this.vivo;
  }
  
  correr(){
    this.posX-=3;
  }
  
  reciclar(){
    this.posX = random(640, 1500);
   
  }
  
  morir(){
    this.vivo = false;
  }
  
  balaTocada(bala){
    if(dist(this.posX, this.posY, bala.posX, bala.posY) < 30){
      this.morir();
    }
  }
}
