const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//Eventos

listaCursos.addEventListener('click', AgregarCurso)
carrito.addEventListener('click', EliminarCurso)
vaciarCarrito.addEventListener('click', function(){
    articulosCarrito = [];
    LimpiarHTML();
})


//Funciones

function AgregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        LeerDatosCurso(cursoSeleccionado);
    }
    
}

function LeerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Verificar existencia
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id )
    if(existe){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id===infoCurso.id){
                curso.cantidad++
                return curso
            }
            else{
                return curso
            }
            
        })
        articulosCarrito = [...cursos]
    }
    else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(articulosCarrito);
    AgregarAlHTML();
}

function AgregarAlHTML(){
    
    LimpiarHTML();

    articulosCarrito.forEach( curso => {

        //Descontruir objeto
        const {imagen, titulo, precio, id, cantidad} = curso

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src = "${imagen}" width="100"</td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class="borrar-curso" data-id="${id}">X</a></td>
        `
        contenidoCarrito.appendChild(row);
    })
}

function EliminarCurso(e)
{
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        articulosCarrito = articulosCarrito.filter(curso=>curso.id!==cursoId)
        AgregarAlHTML();
    }
}

function LimpiarHTML(){
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }
}
