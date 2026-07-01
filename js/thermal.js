async function imageToESC(){

    const paper = document.getElementById("paper");
// Simpan outline yang sedang dipilih
const selected = paper.querySelector(".selected");
if(selected){
    selected.classList.remove("selected");
}

// Sembunyikan area drop saat render
const drop = document.getElementById("drop");
const oldDrop = drop ? drop.style.display : "";

if(drop){
    drop.style.display = "none";
}
    if(!paper){
        alert("Paper tidak ditemukan");
        return null;
    }

    let width = 384;

    const paperSize = document.getElementById("paperSize");

    if(paperSize && paperSize.value=="80"){
        width = 576;
    }

    const canvas = await html2canvas(paper,{
        backgroundColor:"#ffffff",
        scale:3,
        useCORS:true
    });

    const out = document.createElement("canvas");

    out.width = width;

    out.height = Math.round(
        canvas.height * (width / canvas.width)
    );

    const ctx = out.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,out.width,out.height);

    ctx.drawImage(
        canvas,
        0,
        0,
        out.width,
        out.height
    );

   const bitmap = convertBitmap(
    ctx.getImageData(
        0,
        0,
        out.width,
        out.height
    )
);

// Kembalikan tampilan editor
if(drop){
    drop.style.display = oldDrop;
}

if(selected){
    selected.classList.add("selected");
}

return bitmap;

}

function convertBitmap(img) {

    const width = img.width;
    const height = img.height;

    const bytesPerRow = Math.ceil(width / 8);

    const data = [];

    data.push(
        0x1D,
        0x76,
        0x30,
        0x00,
        bytesPerRow & 0xFF,
        (bytesPerRow >> 8) & 0xFF,
        height & 0xFF,
        (height >> 8) & 0xFF
    );

    for (let y = 0; y < height; y++) {

        for (let xb = 0; xb < bytesPerRow; xb++) {

            let byte = 0;

            for (let bit = 0; bit < 8; bit++) {

                const x = xb * 8 + bit;

                if (x >= width) continue;

                const pos = (y * width + x) * 4;

                const r = img.data[pos];
                const g = img.data[pos + 1];
                const b = img.data[pos + 2];

                // Grayscale dengan bobot luminance
const gray =
0.299 * r +
0.587 * g +
0.114 * b;

// Threshold yang lebih cocok untuk printer thermal
if (gray < 160) {
    byte |= (0x80 >> bit);
}

            }

            data.push(byte);

        }

    }

    return new Uint8Array(data);

}

