let estadoActual = 1;
let trazos = [];
let imagenes = [];
let imagenesOrbita = [];
let imagenesRojo = [];
let anguloGlobal = 0;
let opacidadFilas = [];

let radioEspiral = 40;
let anguloEspiral = 0;
let radioMaximo = 0;

//------Configuración.
let amp_min = 0.015; //Umbral mínima de sonido que supera el ruido de fondo.
let amp_max = 0.3;
let amortiguacion = 0.9;
let gestorAmp; //para la amplitud
let altoGestor = 100;
let anchoGestor = 400;
//Amortiguación de la amplitud del micrófono, es un valor entre cero (sin amortiguación) y uno (amortiguación total)

let frec_min = 30;
let frec_max = 500;
let pitch;
let gestorPitch; //para la frecuencia
let audioContext;
const pitchModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'; // modelo entrenado para reconocer frecuencia

let mic; //Micrófono.
let amplitud;
let haySonido = false; //cómo esta el sonido en cada momento
let antesHabiaSonido = false; // memoria del estado anterior del sonido
let imprimir = true; //Eso es para ver la amplitud en el sketch.

//GRAVE = ONDAS.
//AGUDO = PEGARSE AL EXTREMO.
//HAY SONIDO= DESAPARECEN FILAS.
//SIN SONIDO = VUELVE AL INICIAL.

function preload() {
  for (let i = 0; i < 4; i++) {
    imagenes[i] = loadImage('data/trazo0' + i + '.PNG');
  }
  for (let i = 4; i < 26; i++) {
    let num = i < 10 ? '0' + i : i;
    imagenesOrbita.push(loadImage('data/trazo0' + num + '.PNG'));
  }
  for (let i = 26; i < 30; i++) {
    let num = i < 10 ? '0' + i : i;
    imagenesRojo.push(loadImage('data/trazo0' + num + '.PNG'));
  }
}

function setup() {
  createCanvas(600, 500);
  audioContext = getAudioContext(); //inicia el motor de audio
  mic = new p5.AudioIn(); //Esto comunica con la entrada del micrófono.
  mic.start(startPitch); //Esto inicializa el flujo del audio, y le trasmito el analisis de frecuencia (pitch) al micrófono
  gestorAmp = new GestorSenial (amp_min, amp_max) //inicializo el gestor
  gestorAmp. f = amortiguacion;
  gestorPitch = new GestorSenial(frec_min, frec_max);
  userStartAudio();
  generarEstado1();
}

function draw() {
  background(237, 229,206);
  gestorAmp.actualizar(mic.getLevel()) //gestiona y amortigua la amp cruda del microfono
  amplitud = gestorAmp.filtrada;
  haySonido = amplitud > amp_min; //primer umbral de ruido que define el estado haySonido

  //Captamos el estado de "hay sonido".
  //El sonido empieza si antes NO habia sonido y ahora SÍ.
  let empezoElSonido = haySonido && !antesHabiaSonido;
  //El sonido termina si antes SÍ habia sonido y ahora NO. 
  let terminaElSonido = !haySonido && antesHabiaSonido;
   
 if (haySonido) {
  let tono = gestorPitch.filtrada; // valor entre 0 y 1

  if (tono > 0.4) {
    // sonido GRAVE > estado 2
    if (estadoActual !== 2) {
      estadoActual = 2;
      generarEstado2();
    }
  } else if (tono < 0.2) {
    // sonido AGUDO > estado 3
    if (estadoActual !== 3) {
      estadoActual = 3;
      generarEstado3();
    }
  } else {
    // tono MEDIO > estado 1
    if (estadoActual !== 1) {
      estadoActual = 1;
      generarEstado1();
    }
  }
} else {
  // no hay sonido > estado 1
  if (estadoActual !== 1) {
    estadoActual = 1;
    generarEstado1();
  }
}
 
if (imprimir) {
  printData();
}

  if (estadoActual === 1) {
    for (let i = 0; i < trazos.length; i++) {
      trazos[i].moverIzquierda();

      let filaIndex = int(trazos[i].y / (trazos[i].alto + 5));
      if (opacidadFilas[filaIndex] > 0) {
        tint(255, opacidadFilas[filaIndex]);
        trazos[i].mostrar();
      }
    }
    noTint();

    if (empezoElSonido) {
    //Según la duración del sonido,
    //se pierde la opacidad de los trazos hasta
    //hacer desaparecer las filas pares.
    console.log("inicia el sonido");
      for (let i = 0; i < opacidadFilas.length; i++) {
        if (i % 2 !== 0) {
          opacidadFilas[i] = max(opacidadFilas[i] - 10, 0);
        } else {
          opacidadFilas[i] = min(opacidadFilas[i] + 10, 255);
        }
      }
    } else {
      for (let i = 0; i < opacidadFilas.length; i++) {
        opacidadFilas[i] = min(opacidadFilas[i] + 10, 255);
       
      }
    }
  }

    // Estado 2: aparecen desde la derecha
  if (estadoActual === 2) {
    for (let i = 0; i < trazos.length; i++) {
      trazos[i].moverDesdeDerecha(); // Mueve cada trazo hacia su destino desde la derecha
      
      // --- OPACIDAD SEGÚN POSICIÓN EN LA FILA ---

      // Determina en qué fila está este trazo, dividiendo su coordenada Y por la altura de fila (28)
      let filaIndex = int(trazos[i].y / 28);
      // Crea un nuevo arreglo con todos los trazos que pertenecen a esa misma fila
      let filaTrazos = trazos.filter(t => int(t.y / 28) === filaIndex);
      // Busca la posición de este trazo actual dentro de su fila
      let indexEnFila = filaTrazos.indexOf(trazos[i]);
      // Si el trazo está entre los últimos dos de su fila, se baja su opacidad
      // Si no, se mantiene opacidad completa
      let opacidad = (indexEnFila >= filaTrazos.length - 2) ? 150 : 255;
      // Aplica la opacidad a la imagen antes de mostrarla
      tint(255, opacidad);
      trazos[i].mostrar(); // Dibuja el trazo en pantalla
    }
    noTint(); // Elimina el tinte después del bucle para no afectar otros elementos
  }

  if (estadoActual === 3) {
    anguloGlobal += 0.005;

    if (radioEspiral < radioMaximo) {
      let x = width / 2 + cos(anguloEspiral) * radioEspiral;
      let y = height / 2 + sin(anguloEspiral) * radioEspiral;
      let img = random(imagenesOrbita);
      let trazo = new Trazo(x, y, img);
      trazo.radio = radioEspiral;
      trazo.anguloBase = anguloEspiral;
      trazos.push(trazo);

      anguloEspiral += 0.1;
      radioEspiral = 5 * anguloEspiral;
    }

    for (let i = 0; i < trazos.length; i++) {
      trazos[i].orbitar(anguloGlobal);
      trazos[i].mostrarRotado(20, 20); // Tamaño más chico solo acá
    }
  }
}

//-------- PITCH DETECTION ---------

function startPitch() {
  pitch = ml5.pitchDetection(pitchModel, audioContext , mic.stream, modelLoaded); // inicializa el modelo entrenado
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency)
      //console.log(frequency);
    } else {
    }
    getPitch();
  })
}

class Trazo {
  constructor(x, y, img, ancho = 70, alto = 30) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.ancho = ancho;
    this.alto = alto;
    this.radio = 0;
    this.anguloBase = 0;
    this.angulo = 0;
    this.destino = 0;
  }

  moverIzquierda() {
  this.x -= 1;
  
  // Si el trazo se fue completamente por la izquierda
  if (this.x < -this.ancho) {
    // Reposicionarlo al final de su fila
    let filaY = this.y;
    let desplazamientoX = (int(this.y / 35) % 2 === 1) ? this.ancho / 2 : 0;
    // Cantidad total de columnas generadas (debe coincidir con generarEstado1)
    let columnasTotales = int(width / this.ancho) + 3;

    this.x += columnasTotales * this.ancho;
  }
}

  moverDesdeDerecha() {
    if (this.x > this.destino) {
      this.x -= 15;
    }
  }

  orbitar(anguloGlobal) {
    this.angulo = anguloGlobal + this.anguloBase;
    this.x = width / 2 + cos(this.angulo) * this.radio;
    this.y = height / 2 + sin(this.angulo) * this.radio;
  }

  mostrar() {
    image(this.img, this.x, this.y, this.ancho, this.alto);
  }

  mostrarRotado(tamanoAncho = this.ancho, tamanoAlto = this.alto) {
    push();
    translate(this.x, this.y);
    rotate(this.angulo + HALF_PI);
    imageMode(CENTER);
    image(this.img, 0, 0, tamanoAncho, tamanoAlto);
    pop();
  }

  setDestino(dest) {
    this.destino = dest;
  }
}

function generarEstado1() {
  trazos = [];
  opacidadFilas = [];

  let filaAltura = 35;
  let columnaAncho = 70;
  let totalFilas = 20;

  for (let fila = 0; fila < totalFilas; fila++) {
    opacidadFilas[fila] = 255;
    let y = fila * filaAltura;
    let desplazamientoX = (fila % 2 === 1) ? columnaAncho / 2 : 0;

    // AUMENTAMOS LAS COLUMNAS para permitir un bucle sin cortes visuales
    let columnas = int(width / columnaAncho) + 3;

    for (let col = 0; col < columnas; col++) {
      let x = col * columnaAncho + desplazamientoX;
      let img = random(imagenes);
      trazos.push(new Trazo(x, y, img, columnaAncho, 30)); // Usamos columnaAncho como ancho real
    }
  }
}

function generarEstado2() {
  trazos = [];  // Limpia el arreglo 'trazos' para empezar desde cero

  let filas = 20;       // Define que habrá 20 filas
  let maxColumnas = 5;  // Máximo 5 columnas por fila
  let espacioX = 30;    // Espacio horizontal entre trazos

  // Bucle que recorre cada fila
  for (let i = 0; i < filas; i++) {
    // Define cuántas columnas tendrá esta fila, entre 1 y 5 (aleatorio)
    let columnas = int(random(1, maxColumnas + 1));

    // Bucle para crear los trazos de cada columna en esta fila
    for (let j = 0; j < columnas; j++) {
      let xDestino = j * espacioX; // Posición destino X del trazo en la fila (0, 30, 60, 90, ...)
      let y = i * 28;              // Posición Y según la fila, 28 píxeles de alto por fila

      let img = random(imagenesRojo); // Escoge una imagen aleatoria del arreglo 'imagenesRojo'

      // Crea un nuevo objeto Trazo que empieza fuera de pantalla (a la derecha),
      // con posición inicial en X = ancho del canvas + un número aleatorio entre 100 y 300,
      // y posición Y correspondiente a la fila
      let trazo = new Trazo(width + random(100, 300), y, img);

      trazo.setDestino(xDestino); // Define el destino X al que el trazo se moverá desde la derecha

      trazos.push(trazo); // Agrega este trazo al arreglo global 'trazos'
    }
  }
}

function generarEstado3() {
  trazos = [];
  radioEspiral = 0;
  anguloEspiral = 0;
  radioMaximo = dist(0, 0, width / 2, height / 2) + 300;
}

function printData() {

  textSize(12);
  fill(0);
  let texto;

  //texto = "Y la amplitud es de = " + amplitud;
  text(texto, 20, 20);
}

class GestorSenial{


	//----------------------------------------

	constructor( minimo_ , maximo_ ){

		this.minimo = minimo_;
		this.maximo = maximo_;

		this.puntero = 0;
		this.cargado = 0;
		this.mapeada = [];
		this.filtrada = 0;
		this.anterior = 0;
		this.derivada = 0;
		this.histFiltrada = [];		
		this.histDerivada = [];		
		this.amplificadorDerivada = 15.0;
		this.dibujarDerivada = false;

		this.f = 0.80;
	}
	//----------------------------------------


	actualizar( entrada_ ){

		this.mapeada[ this.puntero ] = map( entrada_ , this.minimo , this.maximo , 0.0 , 1.0 );
		this.mapeada[ this.puntero ] = constrain( this.mapeada[ this.puntero ] , 0.0 , 1.0 );

		this.filtrada = this.filtrada * this.f + this.mapeada[ this.puntero ] * ( 1-this.f );
		this.histFiltrada[ this.puntero ] = this.filtrada;

		this.derivada = ( this.filtrada - this.anterior ) * this.amplificadorDerivada;
		this.histDerivada[ this.puntero ] = this.derivada;

		this.anterior = this.filtrada;

		//console.log( entrada_ + "  " + "    " + 
		//	this.mapeada[this.puntero] + "     " + this.puntero );

		this.puntero++;
		if( this.puntero >= anchoGestor ){
			this.puntero = 0;			
		}
		this.cargado = max( this.cargado , this.puntero );

	}

}
