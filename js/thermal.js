function imageToESC(){


let canvas =
document.createElement("canvas");


let img =
document.getElementById("preview");



let width =
document.getElementById("paperSize")
.value=="58"
?
384
:
576;



canvas.width=width;


canvas.height=
img.height;



let ctx =
canvas.getContext("2d");



ctx.drawImage(
img,
0,
0,
width,
canvas.height
);



let imageData =
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);



return convertBitmap(imageData);

}




function convertBitmap(data){


return new Uint8Array(

[
0x1D,
0x76,
0x30,
0x00

]

);

}
