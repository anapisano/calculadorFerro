let borrarStorage = document.getElementById("btn-borrar")
borrarStorage.onclick = borrarLocalStorage

function borrarLocalStorage() {
    localStorage.clear()
}

const btnMostrarAlert = document.getElementById("btn-mostrar-alert")
btnMostrarAlert.onclick = mostrarAlert

function mostrarAlert() {
    Swal.fire(
        'Gracias por confiar en Ferro',
        'Su presupuesto ha sido ingresado correctamente. <br> A la brevedad nos comunicaremos con usted',
        'success'
      )
}

let presupuestos = []
let materiales =[]

let formulario
let inputNombre
let inputAlto
let inputAncho
let inputProfundidad
let inputMaterial
let contenedorPresupuesto

class Material {
    constructor (id, nombre, precio) {
        this.id = id;
        this.nombre =nombre
        this.precio = precio;
    }
}

let laqueado = new Material (1, "MDF laqueado", 50)
let enchapado = new Material (2, "MDF enchapado", 60)
let poroAbierto = new Material (3, "Laqueado poro abierto", 80)

materiales.push (laqueado, enchapado, poroAbierto)

class Presupuesto {
    constructor(nombre, alto, ancho, profundidad, material) {
        this.nombre =nombre
        this.alto = alto;
        this.ancho = ancho;
        this.profundidad = profundidad;
        this.material = material;
    }

    area = () => (((this.alto * this.ancho) * 0.01) * 2 + ((this.alto * this.profundidad) * 0.01) * 2)
    costoTotal = () => { 
        let valorAMultiplicar = materiales.find((el) => el.nombre === "MDF laqueado")
        let resultado = valorAMultiplicar.precio * this.area()
        return resultado
}
        
}

function obtenerFoto () {
    fetch ("https://jsonplaceholder.typicode.com/photos")
    .then ((response) => response.json())
    .then((data) => {
        return data
    })
}

function inicializarElementos (){
    formulario = document.getElementById("formulario")
    inputNombre = document.getElementById("nombre")
    inputAlto = document.getElementById("alto")
    inputAncho = document.getElementById("ancho")
    inputProfundidad = document.getElementById("profundidad")
    inputMaterial = document.getElementById("material")
    contenedorPresupuesto = document.getElementById("contenedor-presupuesto")

}

function inicializarEventos () {
    formulario.onsubmit = (event) => validarFormulario (event)
}

function almacenarPresupuestoLocalStorage() {
    localStorage.setItem("presupuesto", JSON.stringify(presupuestos))

}

function obtenerPresupuestoLocalStorage() {
    let presupuestoAlmacenado = localStorage.getItem ("presupuesto")
    if (presupuestoAlmacenado != null){
        presupuestos = JSON.parse(presupuestoAlmacenado)
        presupuestos = presupuestos.map ((presupuesto) => new Presupuesto (presupuesto.nombre, presupuesto.alto, presupuesto.ancho, presupuesto.profundidad))
    }

}

function validarFormulario (event) {
    event.preventDefault()
    let nombre = inputNombre.value
    let alto = parseFloat(inputAlto.value)
    let ancho = parseFloat(inputAncho.value)
    let profundidad = parseFloat(inputProfundidad.value)
    let material = inputMaterial.value
    let presupuesto = new Presupuesto(nombre, alto, ancho, profundidad, material)
    presupuestos.push(presupuesto)
    formulario.reset()   
    calcularPresupuesto()
    almacenarPresupuestoLocalStorage()

}

function calcularPresupuesto () {
    contenedorPresupuesto.innerHTML =""
    presupuestos.forEach ((presupuesto) =>{
        let columna = document.createElement("div")
        columna.innerHTML =`
            <div class="card">
                <div class="card_body">
                    <p class="card_text">Presupuesto para: ${presupuesto.nombre}</p>
                    <p class="card_text">Las dimensiones de su mueble son: ${presupuesto.alto}cm * ${presupuesto.ancho}cm * ${presupuesto.profundidad}cm  </p>
                    <p class="card_text">Costo total: ${presupuesto.costoTotal()}  </p>
                    <p class="card_text">foto: ${obtenerFoto()} </p>
                    <p class="card_text"></p>
                    <p class="card_text">Material: ${presupuesto.material}</p>      
                </div>
            </div>
            `
        contenedorPresupuesto.append (columna)
    })
}


function main () {
    inicializarElementos()
    inicializarEventos()
    obtenerPresupuestoLocalStorage()
    obtenerFoto()
    calcularPresupuesto()
    
}

main()
