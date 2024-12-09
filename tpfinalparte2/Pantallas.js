class Pantallas {
  constructor() {
    this.estado = "menu"; //Arranca en este estado
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  dibujar() {
    if (this.estado === "menu") {
      this.menu();
    } else if (this.estado === "creditos") {
      this.creditos();
    } else if (this.estado === "jueguito") {
      jueguito.dibujar();
    } else if (this.estado === "gameover") {
      this.gameOver();
    } else if (this.estado === "ganaste") {
      this.ganaste();
    }
  }

  menu() {
    image(imagenes[6], 0, 0, 640, 480);
    stroke(139, 10, 10);  // Rojo oscuro
    fill(232, 240, 27);
    rect(260, 420, 160, 40);
    fill(206, 75, 108);
    rect(esquinaXcred, esquinaYcred, 160, 40);
    textSize(40);
    stroke(73, 32, 198); // Azul
    fill(232, 240, 27); // Amarillo
    text('El Ultimo dia en Fondo de Bikini:\n            EL VIDEOJUEGO:\n               el minijuego', 45, 100);
    textSize(30);
    fill(191, 23, 174);
    stroke(216, 204, 250); // Celeste
    text('JUGAR', 290, 450);
    text('Creditos', 40, 450);
    textSize(20);
    text('Instrucciones:\nMoverse: W A S D\nDisparar: flechas\n \nTodos los Bobs deben morir para ganar.\nCuidado con salir de la zona!', 50, 260);
    song.stop();
  }

  creditos() {
    image(imagenes[7], 0, 0, 640, 480);
    stroke(216, 204, 250); // Celeste
    fill(73, 32, 198); // Azul
    textSize(50);
    text('Hecho por:', 30, 60);
    textSize(30);
    fill(206, 75, 108); // Rojo
    text('Lucas Gordillo\n 119050/3\n          y\nPablo Bautista\n 121435/8', 30, 130);
    textSize(17);
    text('OBRA ORIGINAL:\n Stephen Hillenburg\n nikelodeon', 450, 60);
    textSize(30);
    fill(206, 75, 108); // Rojo claro
    stroke(139, 10, 10);  // Rojo oscuro
    rect(esquinaXcred, esquinaYcred, ancho, alto);
    stroke(216, 204, 250); // Celeste
    fill(191, 23, 174);
    text('Menu', 40, 450);
  }

  gameOver() {
    image(imagenes[5], 0, 0, 640, 480);
    stroke(216, 204, 250); // Celeste
    fill(73, 32, 198); // Azul
    textSize(50);
    text('Game Over', 190, 150);
    textSize(29);
    stroke(73, 32, 198); // Azul
    fill(216, 204, 250); // Celeste
    text('Calamardo pasara el resto del dia\n             con Bob Esponja', 90, 270);
    fill(206, 75, 108); // Rojo claro
    stroke(139, 10, 10);  // Rojo oscuro
    rect(260, 420, ancho, alto);
    stroke(216, 204, 250); // Celeste
    fill(191, 23, 174);
    text('Creditos', 280, 450);
  }

  ganaste() {
    image(imagenes[8], 0, 0, 640, 480);
    stroke(216, 204, 250); // Celeste
    fill(73, 32, 198); // Azul
    textSize(50);
    text('Ganaste!', 190, 150);
    textSize(29);
    stroke(73, 32, 198); // Azul
    fill(216, 204, 250); // Celeste
    text('Calamardo esperara a que Bob\n             explote al atardecer', 90, 270);
    fill(206, 75, 108); // Rojo claro
    stroke(139, 10, 10);  // Rojo oscuro
    rect(260, 420, ancho, alto);
    stroke(216, 204, 250); // Celeste
    fill(191, 23, 174);
    text('Creditos', 280, 450);
  }
}
