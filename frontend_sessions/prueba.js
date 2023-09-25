/*
// Crear un nuevo div
var newDiv = document.createElement("div");

// Crear un elemento h1 y asignarle contenido
var newH1 = document.createElement("h1");

var newContent = document.createTextNode("Hola! ¿Qué tal?");
newH1.appendChild(newContent); // Añadir texto al h1

// Agregar el h1 como hijo del nuevo div
newDiv.appendChild(newH1);

// Obtener el elemento actual al que deseas agregar el nuevo div antes de él
var currentDiv = document.getElementById("div1");

// Insertar el nuevo div antes del elemento actual
document.body.insertBefore(newDiv, currentDiv);

*/
// Crear un nuevo div
var newDiv = document.createElement("div");

// Establecer el contenido HTML del nuevo div
let perro = "PERRO";
newDiv.innerHTML = `<h1>Prueba${perro}</h1>`;

// Obtener el elemento actual al que deseas agregar el nuevo div antes de él
var currentDiv = document.getElementById("div1");

// Insertar el nuevo div antes del elemento actual
document.body.insertBefore(newDiv, currentDiv);