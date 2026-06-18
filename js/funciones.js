const img = document.getElementById("imagen");
const preview= document.getElementById("preview");
const textocr = document.getElementById("resultado");
const lat = document.getElementById("latitud");
const long = document.getElementById("longitud");
const prec = document.getElementById("precicion");

let imagen = null;
let mapa;
let longitud;
let latitud;

const btn = document.getElementById("ocr");
const btncopiar = document.getElementById("copi");
const btnubi = document.getElementById("ubicacion");

img.addEventListener("change", (evento) => {
    imagen = evento.target.files[0];
    document.getElementById("nombreArchivo").textContent = imagen.name;
    preview.src= URL.createObjectURL(imagen);
});

btn.addEventListener("click", async()=>{
    if(!imagen){
        alert("Seleccione una imagen primero");
        return;
    }
    const {data} = await Tesseract.recognize(imagen, "spa+eng");
    console.log(ocr);
    textocr.value= data.text;
});

btncopiar.addEventListener("click", ()=>{
    if(textocr.value.trim() === ""){
        alert("No hay texto");
        return;
    }
    navigator.clipboard.writeText(
        textocr.value
    );
    alert("Texto copiado")
});

btnubi.addEventListener("click", ()=>{
    if(!navigator.geolocation){
        alert("Tu navegador no soporta geolocalizacion")
    }
    navigator.geolocation.getCurrentPosition(
        (posicion)=>{
        lat.textContent= "Latitud: " + posicion.coords.latitude;
        long.textContent= "Longitud: " + posicion.coords.longitude;
        prec.textContent= "Precición: " + posicion.coords.accuracy + " metros";
        
        longitud = posicion.coords.longitude;
        latitud = posicion.coords.latitude;
        if(mapa){
            mapa.remove();
        }

        mapa = L.map("mapa").setView(
            [latitud, longitud], 15
        )

        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19
            }
        ).addTo(mapa);

        L.marker(
            [latitud, longitud]
        ).addTo(mapa).bindPopup("Ubicacion actual").openPopup();
        console.log(posicion);
    });
});