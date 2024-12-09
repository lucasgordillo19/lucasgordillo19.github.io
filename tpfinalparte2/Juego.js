class Juego{
  constructor(cantE){
    this.cantE = cantE;
    this.crearPersonaje();
    this.crearEnemigos();
    this.ganado = false;
  }

  dibujar(){
    if (this.ganado) {
      pantallas.cambiarEstado("ganaste");
      return;
    }
    image(imagenes[1], 0, 0, 640, 480);
    this.personaje.dibujar();
    for (let i = 0; i < this.enemigos.length; i++) {
      this.enemigos[i].dibujar();
    }
    this.verificarVictoria();
    this.verificarColisiones();
    this.balaVsEnemigosUp();
    this.balaVsEnemigosDo();
    this.balaVsEnemigosLe();
    this.balaVsEnemigosRi();
    
    
  }

  crearPersonaje(){
    this.personaje = new Personaje(50, height/2-80);
  }
  
  crearEnemigos(){
    this.enemigos = [];
    for(let i = 0; i < this.cantE;i++){
      this.enemigos.push(new Enemigo(random(640, 1500), random(40, 400)));
    }
  }
  
  verificarVictoria() {
    this.enemigos = this.enemigos.filter(enemigo => enemigo.estaVivo());
    this.cantE = this.enemigos.length;

    if (this.cantE === 0) {
      this.ganado = true;
    }
  }
    
  verificarColisiones() {
    for (let i = 0; i < this.enemigos.length; i++) {
      if (dist(this.enemigos[i].posX, this.enemigos[i].posY, this.personaje.posX, this.personaje.posY) < 60) {
        this.personaje.morir();
        break;
      }
    }
  }

  teclaPresionada(keyCode){
    this.personaje.teclaPresionada(keyCode);
  }
  
  balaVsEnemigosUp(){
    if(this.personaje.haDisparadoUp()){
      for(let i=0; i < this.cantE;i++){
        this.enemigos[i].balaTocada(this.personaje.bala);
      }
    }
  }
  
  balaVsEnemigosDo(){
    if(this.personaje.haDisparadoDo()){
      for(let i=0; i < this.cantE;i++){
        this.enemigos[i].balaTocada(this.personaje.bala);
      }
    }
  }
  
  balaVsEnemigosLe(){
    if(this.personaje.haDisparadoLe()){
      for(let i=0; i < this.cantE;i++){
        this.enemigos[i].balaTocada(this.personaje.bala);
      }
    }
  }
  
  balaVsEnemigosRi(){
    if(this.personaje.haDisparadoRi()){
      for(let i=0; i < this.cantE;i++){
        this.enemigos[i].balaTocada(this.personaje.bala);
      }
    }
  }
}
