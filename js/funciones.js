const img = document.getElementById("imagen");
const preview= document.getElementById("preview");
const btn = document.getElementById("ocr");
const textocr = document.getElementById("resultado");
let imagen = null;


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