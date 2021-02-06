import {handleFileFromEvent} from "../helpers/file";

const $body = $('body');

$body
    .on('dragover dragenter', () => {
        $body.add('bg-gray-900');
    })
    .on('dragleave dragend drop',  () => {
        $body.remove('bg-gray-900');
    })
    .on('drop', (e) => {
        console.log('File(s) dropped');
        handleFileFromEvent(e);
    });
