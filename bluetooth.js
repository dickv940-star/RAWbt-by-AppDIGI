let printerDevice;
let printerCharacteristic;


async function connectPrinter(){


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



printerCharacteristic =
chars.find(c=>
c.properties.write
);



return true;


}
