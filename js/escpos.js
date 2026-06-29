function initESC(){

return new Uint8Array([
0x1B,
0x40
]);

}



function cutPaper(){

return new Uint8Array([
0x1D,
0x56,
0x00
]);

}



function printText(text){

let encoder =
new TextEncoder();


return encoder.encode(
text+"\n\n"
);

}



// PRINT GAMBAR THERMAL

function imageToESC(){


let img =
document.getElementById("preview");


if(!img || !img.src){

alert("Belum ada gambar");

return null;

}



let canvas =
document.createElement("canvas");


let ctx =
canvas.getContext("2d");



let size =
document.getElementById("paperSize");


let width=576;


if(size && size.value=="58"){

width=384;

}



canvas.width=width;


canvas.height =
img.naturalHeight *
(width / img.naturalWidth);



ctx.drawImage(
img,
0,
0,
canvas.width,
canvas.height
);



let image =
ctx.getImageData(
0,
0,
canvas.width,
canvas.height
);



return convertBitmap(image);

}





function convertBitmap(img){


let width =
img.width;


let height =
img.height;



let bytes=[];



for(let y=0;y<height;y+=8){



for(let x=0;x<width;x+=8){



let byte=0;



for(let yy=0;yy<8;yy++){



for(let xx=0;xx<8;xx++){



let pos =
((y+yy)*width+(x+xx))*4;



let gray =
0;



if(pos < img.data.length){


gray =
img.data[pos]+
img.data[pos+1]+
img.data[pos+2];


}



if(gray < 400){


byte |=
(1 << (7-xx));


}



}



}



bytes.push(byte);



}



}



let header =
new Uint8Array([
0x1D,
0x76,
0x30,
0x00
]);



let result =
new Uint8Array(
header.length + bytes.length
);



for(let i=0;i<header.length;i++){

result[i]=header[i];

}



for(let i=0;i<bytes.length;i++){

result[i+header.length]=bytes[i];

}



return result;


}
