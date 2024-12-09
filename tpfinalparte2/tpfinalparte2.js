//https://youtu.be/18nR1_q0Pbs
let jueguito;
let pantallas;
let imagenes = [7];
let estado;
let esquinaXcred = 20;
let esquinaYcred = 420;
let esquinaXcentro = 260;
let esquinaYcentro = 420;
let ancho = 160;
let alto = 40;
let font;
let song;

function preload(){
  imagenes[1] = loadImage('data/fondo.PNG');
  imagenes[2] = loadImage('data/calam.PNG');
  imagenes[3] = loadImage('data/bob.PNG');
  imagenes[4] = loadImage('data/nota.PNG');
  imagenes[5] = loadImage('data/fondo2.PNG');
  imagenes[6] = loadImage('data/fondo3.PNG');
  imagenes[7] = loadImage('data/fondo4.PNG');
  imagenes[8] = loadImage('data/fondo5.PNG');
  
  font = loadFont('data/KrabbyPatty.TTF');
  
  soundFormats('MP3');
  song = loadSound("data/dancing.MP3");
}

function setup() {
  createCanvas(640, 480);
  pantallas = new Pantallas();
  jueguito = new Juego(15);  

  textFont(font);
  strokeWeight(4);
}


function draw() {
  song.setVolume(0.6);
  pantallas.dibujar(); 
  if(pantallas.estado === "menu"){ //música se detiene al regresar al menú
    song.stop();
  }
}

function keyPressed(){
  jueguito.teclaPresionada(keyCode);
}

function mousePressed(){
  
  esquinaXcentro = 260;
  esquinaYcentro = 420;
  ancho = 160;
  alto = 40;
  
  if (pantallas.estado === "menu" && mouseX > esquinaXcentro && mouseX < esquinaXcentro + ancho && mouseY > esquinaYcentro && mouseY < esquinaYcentro + alto) {
    pantallas.cambiarEstado("jueguito"); //menu a estado 1, minijuego
    jueguito = new Juego(15);
    song.play();
  }
  else if (pantallas.estado === "menu" &&  mouseX > esquinaXcred && mouseX < esquinaXcred + ancho && mouseY > esquinaYcred && mouseY < esquinaYcred + alto) {
    pantallas.cambiarEstado("creditos");  // creditos
  }
  else if (pantallas.estado === "creditos" && mouseX > esquinaXcred && mouseX < esquinaXcred + ancho && mouseY > esquinaYcred && mouseY < esquinaYcred + alto) {
    pantallas.cambiarEstado("menu");  // vuelta a menu desde creditos
  }
  else if (pantallas.estado === "gameover" && mouseX > esquinaXcentro && mouseX < esquinaXcentro + ancho && mouseY > esquinaYcentro && mouseY < esquinaYcentro + alto) {
    pantallas.cambiarEstado("creditos");
  }
  else if (pantallas.estado === "ganaste" && mouseX > esquinaXcentro && mouseX < esquinaXcentro + ancho && mouseY > esquinaYcentro && mouseY < esquinaYcentro + alto) {
    pantallas.cambiarEstado("creditos");
  }
}
