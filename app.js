function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("result").innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
    // Optional: handle errors (not required)
}

const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
		alert(devices.map(d => d.label).join("\n"));
        // Find the back camera (usually has "back" in the label)
        const backCamera = devices.find(device => device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear"));

        const cameraId = backCamera ? backCamera.id : devices[0].id; // Use back camera if found, else fall back to the first camera

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