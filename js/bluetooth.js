console.log("Bluetooth JS Loaded");
// ===============================
// RAWbt by AppDIGI
// Bluetooth Manager v2
// ===============================

let printerDevice = null;
let printerServer = null;
let printerService = null;
let printerWrite = null;

const SERVICE_UUID =
"000018f0-0000-1000-8000-00805f9b34fb";

const FALLBACK_SERVICE = 0xFFE0;

// =======================================
// CONNECT
// =======================================

async function connectPrinter(){

    const status =
    document.getElementById("status");

    if(!navigator.bluetooth){

        alert("Browser tidak mendukung Web Bluetooth");

        return;

    }

    try{

        status.innerHTML =
        "🔍 Scan Printer...";

        printerDevice =
        await navigator.bluetooth.requestDevice({

            acceptAllDevices:true,

            optionalServices:[
                SERVICE_UUID,
                FALLBACK_SERVICE
            ]

        });

        printerDevice.addEventListener(
            "gattserverdisconnected",
            onDisconnected
        );

        status.innerHTML =
        "🔄 Connecting...";

        printerServer =
        await printerDevice.gatt.connect();

       // =======================================
// AUTO DETECT SERVICE & CHARACTERISTIC
// =======================================

printerWrite = null;
printerService = null;

const services =
await printerServer.getPrimaryServices();

console.log("===== SERVICES =====");

for(const service of services){

    console.log("SERVICE :", service.uuid);

    const chars =
    await service.getCharacteristics();

    for(const c of chars){

        console.log(
            "CHAR :",
            c.uuid,
            c.properties
        );

        if(
            c.properties.write ||
            c.properties.writeWithoutResponse
        ){

            printerService = service;
            printerWrite = c;

            break;

        }

    }

    if(printerWrite) break;

}

        if(!printerWrite){

            status.innerHTML =
            "❌ Printer tidak support Write";

            alert(
            "Printer ditemukan tetapi Characteristic Write tidak ada."
            );

            return;

        }

        console.log(
            "Printer : ",
            printerDevice.name
        );

        console.log(
            "Characteristic : ",
            printerWrite.uuid
        );

       status.innerHTML = "🟢 Bluetooth Connected";

console.log("===== CONNECT SUCCESS =====");
console.log("Device :", printerDevice);
console.log("Server :", printerServer);
console.log("Service :", printerService);
console.log("Write :", printerWrite);
    }

    catch(e){

        console.error(e);

        printerDevice = null;
        printerServer = null;
        printerService = null;
        printerWrite = null;

        if(e.name=="NotFoundError"){

            status.innerHTML=
            "⚪ Batal";

            return;

        }

        status.innerHTML=
        "❌ Bluetooth Error";

        alert(e.message);

    }

}

// =======================================
// AUTO DISCONNECT
// =======================================

function onDisconnected(){

    console.log(
        "Printer Disconnect"
    );

    printerServer = null;
    printerService = null;
    printerWrite = null;

    document.getElementById("status")
    .innerHTML=
    "🔴 Printer Disconnect";

}

// =======================================
// SEND DATA
// =======================================

async function sendPrinter(data){

    if(
        !printerDevice ||
        !printerDevice.gatt.connected ||
        !printerWrite
    ){

        alert("Hubungkan printer dahulu.");

        return;

    }

    if(!(data instanceof Uint8Array)){

        console.warn(
        "Data bukan Uint8Array"
        );

        return;

    }

    const chunkSize = 128;

    try{

        for(
            let i=0;
            i<data.length;
            i+=chunkSize
        ){

            const chunk =
            data.slice(
                i,
                i+chunkSize
            );

            if(
                printerWrite.properties
                .writeWithoutResponse
            ){

                await printerWrite
                .writeValueWithoutResponse(
                    chunk
                );

            }

            else{

                await printerWrite
                .writeValueWithResponse(
                    chunk
                );

            }

            await new Promise(r=>
                setTimeout(r,20)
            );

        }

        console.log(
            "Print Success"
        );

    }

    catch(e){

        console.error(e);

        alert(
        "Print gagal.\n"+e.message
        );

    }

}

// =======================================
// DISCONNECT
// =======================================

function disconnectPrinter(){

    try{

        if(
            printerDevice &&
            printerDevice.gatt.connected
        ){

            printerDevice.removeEventListener(
                "gattserverdisconnected",
                onDisconnected
            );

            printerDevice.gatt.disconnect();

        }

    }

    catch(e){

        console.log(e);

    }

    printerDevice = null;
    printerServer = null;
    printerService = null;
    printerWrite = null;

    document.getElementById("status")
    .innerHTML=
    "⚪ Disconnect";

}

// =======================================
// COMPATIBILITY
// =======================================

function connectBT(){

    connectPrinter();

}
