import { saveAs } from 'file-saver'
import domtoimage from 'dom-to-image';

export default function generateIdCard(id) {
    var node = document.getElementById(`id-card-${id.id}`);
    console.log(node);
    var idcard = {};

    domtoimage.toPng(node)
        .then(function (dataUrl) {
            console.log(dataUrl);
            idcard.id = id.id;
            idcard.url = dataUrl;
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });

    return idcard;
}