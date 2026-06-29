function initESC(){


return new Uint8Array([

0x1B,0x40

]);

}




function cutPaper(){


return new Uint8Array([

0x1D,
0x56,
0x00

]);


}




function printText(txt){


let encoder =
new TextEncoder();


return encoder.encode(
txt+"\n\n"
);


}
