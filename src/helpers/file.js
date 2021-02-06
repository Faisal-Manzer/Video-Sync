export const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = function(e) {
        document.querySelector('#result').innerHTML = (
            "<p><strong>" + file.name + ":</strong></p>" +
            e.target.result +
            ""
        );
    }
    reader.readAsText(file);
}

export const handleFileFromEvent = (e) => {
    if (e.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (e.dataTransfer.items[i].kind === 'file') {
                const file = e.dataTransfer.items[i].getAsFile();
                console.log('>- ... file[' + i + '].name = ' + file.name);
                readFile(file);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            console.log('() ... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
            readFile(e.dataTransfer.files[i]);
        }
    }
}
