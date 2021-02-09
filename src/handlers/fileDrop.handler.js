import {handleFileFromEvent} from "../helpers/file";

const $dropOverlay = $('#drop-overlay');

let counter = 0;
$('body')
    .on('dragenter', (e) => {
        e.dataTransfer.dropEffect = 'copy';

        counter++;
        $dropOverlay.remove('hidden');
    })
    .on('dragleave drop', () => {
        counter--;
        if (counter === 0) $dropOverlay.add('hidden');
    })
    .on('dragend dragover')
    .on('drop', (e) => {
        handleFileFromEvent(e);
    });
