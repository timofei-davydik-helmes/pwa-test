function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("result").innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
    // Optional: handle errors (not required)
}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        const cameraId = devices[0].id;
        html5QrCode.start(
            cameraId,
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onScanSuccess,
            onScanFailure
        );
    }
}).catch(err => {
    console.error("Camera error", err);
});