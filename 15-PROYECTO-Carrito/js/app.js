// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);
     // Elimina cursos del carrito 
     carrito.addEventListener('click', eliminarCurso)
}

//FUNCIONES 
function agregarCurso(e){
     if(e.target.classList.contains('agregar-carrito')){
          const cursoSeleccionado = e.target.parentElement.parentElement;
          leerDatosCurso(cursoSeleccionado);
}
}

//Elimina un curso del carrito 
function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso')) {
          const cursoId = e.target.getAttribute('data-id');
          // Elimina del arreglo de articulosCarrito por el data-id 
          articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

          console.log(articulosCarrito); 
     }

}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso 
function leerDatosCurso(curso){
     //console.log(curso);

     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'),
          cantidad: 1 

     }

     //revisa si un elemento ya existe en el carrito 
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
     if(existe) {          
          // Actualizamos la cantidad 
          const cursos = articulosCarrito.map (curso => { //iterar
               if(curso => curso.id === infoCurso.id) {// ver si hay un duplicado
                    curso.cantidad++; // cuando lo encuentra se duplica el resultado
                    return curso; //lo actualizamos
               } else {
                    return curso;//retorna los objetos que no estan repetidos. Si no están duplicados pasan a esta parte
               }
          });
          articulosCarrito = [...cursos];
     } else {
          //Agrega elementos al arreglo de carrito
          articulosCarrito = [...articulosCarrito, infoCurso];
 
     }
               
     
     

     console.log(articulosCarrito);

     carritoHTML();

}

//Muestra el carrito de compras en el HTML 

function carritoHTML (){

     // Limpiar el HTML 

     limpiarHTML();

     //Recorre el carrito y genera el HTML

     articulosCarrito.forEach(curso => {
          const { imagen, titulo, precio, cantidad, id } = curso; 
          const row = document.createElement('tr');
          row.innerHTML = `
          <td> <img src="${imagen}" width="100"></td>
          <td>${titulo}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td> 
               <a href="#" class="borrar-curso" data-id="${id}" > X </a>
          </td> 

          `;
          //agrega el HTML del carrito en el tbody 
          contenedorCarrito.appendChild(row);
          

     })

}

function limpiarHTML () {
     // Forma lenta 
     // contenedorCarrito.innerHTML= '';

     while (contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild)
     }

}