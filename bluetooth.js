let printerDevice=null;
let printerWrite=null;


async function connectPrinter(){

try{


printerDevice =
await navigator.bluetooth.requestDevice({

acceptAllDevices:true,

optionalServices:[
"000018f0-0000-1000-8000-00805f9b34fb"
]

});



let server =
await printerDevice.gatt.connect();



let service =
await server.getPrimaryService(
"000018f0-0000-1000-8000-00805f9b34fb"
);



let chars =
await service.getCharacteristics();



printerWrite =
chars.find(
c=>c.properties.write
);



document.getElementById("status")
.innerHTML=
"🟢 Bluetooth Connected Ready Print";



}

catch(e){


alert(
"Printer gagal connect"
);


}



}




async function sendPrinter(data){


if(!printerWrite){

alert(
"Connect printer dulu"
);

return;

}


await printerWrite.writeValue(data);


alert(
"Print berhasil dikirim"
);


}
