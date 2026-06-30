function imageToESC(){

let img =
document.getElementById("preview");


if(!img || !img.src){

alert("Tidak ada gambar");

return null;

}


let canvas =
document.createElement("canvas");


let ctx =
canvas.getContext("2d");



let width = 384; // 58mm

let paper =
document.getElementById("paperSize");


if(paper && paper.value=="80"){

width=576; //80mm

}



canvas.width=width;


canvas.height =
img.naturalHeight *
(width/img.naturalWidth);


ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.drawImage(
    img,
    0,
    0,
    canvas.width,
    canvas.height
);


let data =
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);



return convertBitmap(data);

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

                const gray = (r + g + b) / 3;

                if (gray < 128) {

                    byte |= (0x80 >> bit);

                }

            }

            data.push(byte);

        }

    }

    return new Uint8Array(data);

}

