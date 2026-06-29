let printerDevice=null;
let printerWrite=null;



async function connectPrinter(){


try{


printerDevice =
await navigator.bluetooth.requestDevice({

acceptAllDevices:true

});



let server =
await printerDevice.gatt.connect();



let services =
await server.getPrimaryServices();



alert(
"Bluetooth Connected"
);



document.getElementById("status")
.innerHTML=
"🟢 Bluetooth Connected Ready Print";



}

catch(e){


console.log(e);

alert(
"Bluetooth gagal"
);


}


}




async function sendPrinter(data){


if(!printerDevice){

alert(
"Belum connect printer"
);

return;

}


}
