let printerDevice = null;
let printerWrite = null;



async function connectPrinter(){

try{


document.getElementById("status").innerHTML =
"Connecting...";



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



for(let c of chars){


if(
c.properties.write ||
c.properties.writeWithoutResponse
){

printerWrite=c;

break;

}


}




if(printerWrite){


document.getElementById("status").innerHTML =
"🟢 Bluetooth Connected Ready Print";


alert("Printer siap print");


}else{


alert(
"Printer terhubung tapi tidak ada channel print"
);


}



}

catch(e){


console.log(e);


document.getElementById("status").innerHTML =
"Bluetooth gagal";


alert(
"Bluetooth gagal connect"
);


}


}





async function sendPrinter(data){


if(!printerWrite){


alert(
"Hubungkan printer dulu"
);


return;


}



try{


await printerWrite.writeValue(data);



console.log(
"Data terkirim"
);



}

catch(e){


console.log(e);


alert(
"Print gagal"
);


}


}
