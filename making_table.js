$(document).ready(function () {
    document.getElementById('saveButton').addEventListener('click', function () {
        html2canvas(document.getElementById('capture')).then(canvas => {
            // Convert the canvas to a data URL
            var imgData = canvas.toDataURL('image/png');

            // Create a temporary link element
            var link = document.createElement('a');
            link.href = imgData;
            link.download = 'capture.png';

            // Trigger the download
            link.click();
        });
    });
});