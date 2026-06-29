function textPrint(text){

let encoder =
new TextEncoder();


return encoder.encode(
text+"\n\n"
);

}
