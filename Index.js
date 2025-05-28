const nav = document.getElementById('navbar');
const items = document.querySelectorAll("nav li");
const loginBtn = document.getElementById("login");

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
      items.forEach((i) => {i.classList.add("scrolledItem")})
      loginBtn.classList.remove("scrolledLogin")
      
    } else {
      nav.classList.remove('scrolled');
      items.forEach((i) => {i.classList.remove("scrolledItem")})
      loginBtn.classList.add('scrolledLogin');
    }
});


//Para ir cambiando la imagen de la presentacion cada 6 segundos
//fijarse si se puede resolver con promesas

const presentacionFondo = document.getElementById("presentacion-fondo")
const imagenesParaFondo = [
    "Images/20250508_2005_Colaboración en Oficina Moderna_simple_compose_01jts27ezvexqa25hnwhzcjbts.png",
    'Images/20250508_2007_Trabajo Tecnológico Visualizado_simple_compose_01jts2cd6yfa2a82ymzeh4sg3f.png',
    'Images/20250508_2011_Cierre de Proyecto Exitoso_simple_compose_01jts2j9dae3pvke59vff8f2f8.png'
]

const alternadorImagenes = (contenedor, arrayImagenes, segundos, conDesvanecimiento) => {
  let indice = 0;
  setInterval(() => {
    if (conDesvanecimiento) contenedor.style.opacity = 0;
    setTimeout(() => {
        console.log("inicio")
        indice = (indice + 1) % arrayImagenes.length;
        contenedor.src = arrayImagenes[indice];
        if (conDesvanecimiento) contenedor.style.opacity = 1; 
      }, 300);
  }, segundos); // cambia cada 6 segundos
}

alternadorImagenes(presentacionFondo, imagenesParaFondo, 6000, true)

//Cargo los servicios disponibles en la lista y los muestro en la lista

const serviciosContenedor = document.getElementById("servicios-lista")
let servicios = []

const cargarServicios = async () => {
  try{
    const response = await fetch("./data/Servicios.json")
    if (!response.ok){
      throw new Error("Error en la respuesta de la API");
    }
    const data = await response.json();
    servicios = data
    mostrarServicios()
    const contenedorImg = document.getElementById("img-servicio");
    const imagenes = servicios.map((servicio) => servicio.imagen);
    alternadorImagenes(contenedorImg, imagenes, 5000, false);
  }
  catch (error){
    console.error("No se pudo obtener los servicios:", error)
  }
};

function mostrarServicios(){
  serviciosContenedor.innerHTML = ""
  servicios.forEach((servicio) => {
    const titulo = servicio.titulo;
    const icono = servicio.icono;
    const card = document.createElement("li");
    card.classList.add("servicio");
    card.innerHTML = `
        <i class="${icono}"></i>
        <span>${titulo}</span>
        <i class="flecha fi fi-rr-arrow-small-right"></i>      
    `;
    serviciosContenedor.appendChild(card);
  })
}



cargarServicios()


  