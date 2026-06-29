let printerDevice = null;
let printerServer = null;
let printerService = null;
let printerWrite = null;

const SERVICE_UUID = "000018f0-0000-1000-8000-00805f9b34fb";

async function connectPrinter() {

    const status = document.getElementById("status");

    try {

        status.innerHTML = "🔄 Connecting...";

        printerDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: [SERVICE_UUID]
        });

        printerDevice.addEventListener(
            "gattserverdisconnected",
            onDisconnected
        );

        printerServer = await printerDevice.gatt.connect();

        printerService = await printerServer.getPrimaryService(SERVICE_UUID);

        const characteristics =
            await printerService.getCharacteristics();

        printerWrite = null;

        console.log("=== Characteristic Printer ===");

        for (const c of characteristics) {

            console.log(c.uuid, c.properties);

            if (
                c.properties.write ||
                c.properties.writeWithoutResponse
            ) {
                printerWrite = c;
                break;
            }

        }

        if (!printerWrite) {
            status.innerHTML = "❌ Printer tidak mendukung Write";
            alert("Printer terhubung tetapi channel print tidak ditemukan.");
            return;
        }

        status.innerHTML = "🟢 Bluetooth Connected Ready Print";
        alert("Printer siap digunakan.");

    } catch (e) {

        console.error(e);

        printerDevice = null;
        printerServer = null;
        printerService = null;
        printerWrite = null;

        status.innerHTML = "❌ Bluetooth gagal";

        alert("Bluetooth gagal connect.");

    }

}

function onDisconnected() {

    printerServer = null;
    printerService = null;
    printerWrite = null;

    document.getElementById("status").innerHTML =
        "🔴 Printer Disconnect";

}

async function sendPrinter(data) {

    if (
        !printerDevice ||
        !printerDevice.gatt.connected ||
        !printerWrite
    ) {

        alert("Hubungkan printer dulu.");

        return;

    }

    try {

        await printerWrite.writeValue(data);

        console.log("Data berhasil dikirim.");

    } catch (e) {

        console.error(e);

        alert("Print gagal.");

    }

}

async function disconnectPrinter() {

    if (
        printerDevice &&
        printerDevice.gatt.connected
    ) {

        printerDevice.gatt.disconnect();

    }

    printerServer = null;
    printerService = null;
    printerWrite = null;

    document.getElementById("status").innerHTML =
        "⚪ Bluetooth Disconnect";

}

