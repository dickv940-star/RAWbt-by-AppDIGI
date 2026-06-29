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



if(pos < img.data.length){


let gray =
img.data[pos]+
img.data[pos+1]+
img.data[pos+2];


if(gray < 400){

byte |=
1 << (7-xx);

}

}


}


}



bytes.push(byte);


}


}



let result =
new Uint8Array(bytes.length);



for(let i=0;i<bytes.length;i++){

result[i]=bytes[i];

}



return result;


}
