function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("result").innerText = `Scanned: ${decodedText}`;
}

function onScanFailure(error) {
    // Optional: handle errors (not required)
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

const html5QrCode = new Html5Qrcode("reader");

document.getElementById("start-scan").addEventListener("click", () => {
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const backCamera = devices.find(device =>
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")
            );

            const cameraId = backCamera ? backCamera.id : devices[0].id;

            document.getElementById("reader").style.display = "block"; // Show scanner
            document.getElementById("start-scan").style.display = "none"; // Hide button

            html5QrCode.start(
                cameraId,
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                onScanFailure
            );
        }
    }).catch(err => {
        console.error("Camera error", err);
    });
});

