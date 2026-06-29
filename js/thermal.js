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


canvas.width = img.naturalWidth || 384;
canvas.height = img.naturalHeight || 300;


ctx.drawImage(
img,
0,
0
);



return canvas.toDataURL();

}
