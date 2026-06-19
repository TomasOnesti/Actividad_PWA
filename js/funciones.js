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

btn.addEventListener("click", async () => {

    if(!imagen){
        alert("No hay imagen");
        return;
    }

    alert("1 - Imagen seleccionada");

    try{

        alert("2 - Antes de OCR");

        const resultado =
            await Tesseract.recognize(
                imagen,
                "spa+eng"
            );

        alert("3 - OCR finalizado");

        console.log(resultado);

        textocr.value =
            resultado.data.text;

        alert(
            "4 - Texto obtenido: " +
            resultado.data.text
        );

    }catch(error){

        alert(
            "ERROR OCR: " +
            error.message
        );

        console.error(error);
    }
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
        alert("Tu navegador no soporta geolocalizacion");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (posicion)=>{
            lat.textContent = "Latitud: " + posicion.coords.latitude;
            long.textContent = "Longitud: " + posicion.coords.longitude;
            prec.textContent = "Precisión: " + posicion.coords.accuracy + " metros";
            
            longitud = posicion.coords.longitude;
            latitud = posicion.coords.latitude;
            
            if(mapa){
                mapa.remove();
            }
            mapa = L.map("mapa").setView([latitud,longitud],15);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
                maxZoom:19
                }
            ).addTo(mapa);

            L.marker(
                [latitud,longitud]
            ).addTo(mapa);
        },(error)=>{
            console.error(error);
            alert(error.message);
        }
    );
});

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").then(()=>{
        console.log("Todo en orden con el sw");
    }).catch((error)=>{
        console.log(error);
    });
}