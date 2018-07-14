var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function(e) {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    cambiarColorSeleccionado(e);
  })
);

//Variables con los elementos Paleta y Grilla-Pixeles.
var paletaDOM = document.getElementById('paleta');
var grillaDOM = document.getElementById('grilla-pixeles');
var cantidadPixeles = 1750;
//Evento y variables para cambiar el color seleccionado.
var colorSeleccionadoDOM = document.getElementById('indicador-de-color-mensaje');
var colorSeleccionadoIconoDOM = document.getElementById('indicador-de-color');
paletaDOM.addEventListener('click',cambiarColorSeleccionado);
//Evento y variables para pintar grilla.
var estaApretado = false;
grillaDOM.addEventListener('mousedown',manternerApretado);
grillaDOM.addEventListener('mouseup', soltarApretado);
grillaDOM.addEventListener('click', pintarGrilla);
//Evento para borra todo.
document.getElementById('borrar').addEventListener('click',borrarGrillaEntera);
//Eventos para cargar los heroes.
document.getElementById('batman').addEventListener('click',function () {cargarSuperheroe(batman);});
document.getElementById('wonder').addEventListener('click',function () {cargarSuperheroe(wonder);});
document.getElementById('flash').addEventListener('click',function () {cargarSuperheroe(flash);});
document.getElementById('invisible').addEventListener('click',function () {cargarSuperheroe(invisible);});
//Eventos para guardar la imagen.
document.getElementById('guardar').addEventListener('click',guardarPixelArt);


//Función para agregar los colores.
function crearPaleta() {
  for (var i = 0; i < nombreColores.length; i++) {
    var nuevoElmento = document.createElement('div');
    nuevoElmento.classList.add('color-paleta') ;
    nuevoElmento.style.backgroundColor = nombreColores[i];
    paletaDOM.appendChild(nuevoElmento);
  }
}
//Función para crear la grilla.
function crearGrilla() {
  for (var i = 0; i < cantidadPixeles ; i++) {
    var nuevoElmento = document.createElement('div');
    grillaDOM.appendChild(nuevoElmento,);
  }
}

//Función para cambiar el color seleccionado.
function cambiarColorSeleccionado(e) {
  //Si el color es seleccionado de la paleta.
  if(e.target.classList == 'color-paleta')
  {
    colorSeleccionadoDOM.textContent = 'Pincel:' + window.getComputedStyle(e.target,null).getPropertyValue("background-color");
    colorSeleccionadoIconoDOM.style.backgroundColor = e.target.style.backgroundColor ;
  }
  else
  {
    //Si el color es personalizado(fue seleccionado de la rueda de colores).
    if(e.target.classList == 'input-color')
    {
      colorSeleccionadoIconoDOM.style.backgroundColor = e.target.value;
      colorSeleccionadoDOM.textContent = 'Pincel:' + window.getComputedStyle(colorSeleccionadoIconoDOM,null).getPropertyValue('background-color');
    }
  }
}

//Función para pintar grilla.
function pintarGrilla(e) {
  if (estaApretado || e.type == 'click')
  {
    e.target.style.backgroundColor = colorSeleccionadoIconoDOM.style.backgroundColor;
  }
}
function manternerApretado(e){
  estaApretado = true;
  grillaDOM.addEventListener('mousemove',pintarGrilla);
}
function soltarApretado() {
  estaApretado = false;
  grillaDOM.removeEventListener('mousemove',pintarGrilla);
}

//Borrar Grilla.
function borrarGrillaEntera() {
  var $grilla = $('#grilla-pixeles').find('div');
  $grilla.each(function () {
    $(this).animate({'backgroundColor' : 'white'},1000);
  });
}

//Ejecución de las Primeras funciones para dibujar grilla y paleta.
crearGrilla();
crearPaleta();