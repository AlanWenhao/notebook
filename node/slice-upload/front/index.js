/**
 * 1、file change event
 * 2、createFileChunk
 * 3、uploadChunk
 */
const uploadBtn = document.querySelector('.upload');

const LENGTH = 10;

let fileObj = null;
let fileArray  = [];

uploadBtn.addEventListener('change', changeUpload, false)

function changeUpload(e) {
    const [file] = e.target.files;
    if (!file) return;
    // Object.assign()
    console.log(file);
    fileObj = file;
    handleUpload()
}

async function handleUpload() {
    if (!fileObj) return;
    const fileChunkList = createFileChunk(fileObj);
    fileArray = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        hash: fileObj.name + '-' + index
    }))
    await uploadChunks();
}

function createFileChunk(file, length = LENGTH) {
    const fileChunkList = [];
    const chunkSize = Math.ceil(file.size / length);
    let cur = 0;
    while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
    }
    return fileChunkList;
}

async function uploadChunks() {
    const requestList = fileArray
        .map((chunk, hash) => {
            const formData = new FormData();
            formData.append('chunk', chunk);
            formData.append('hash', hash);
            formData.append('filename', fileObj.name);
            return { formData }
        })
        .map(async ({ formData }) => request({ url: 'http://localhost:3000', data: formData }))
        await Promise.all(requestList)
        await mergeRequest();
}

async function mergeRequest() {
    await request({
        url: 'http://localhost:3000',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify({ filename: fileObj.name })
    })
}

function request({ url, method, data, headers = {}, requestList }) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
        xhr.send(data);
        xhr.onload = e => {
            resolve({ data: e.target.response })
        }
    })
}
