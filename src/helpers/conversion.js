
function convertBytes(bytes) {

    //Conver to KB
    if(bytes <= 100000) {
        return {
            type: 'KB',
            value: (bytes / 1000).toFixed(2)
        }

    //Convert to MB
    } else {
        return {
            type: 'MB',
            value: (bytes / Math.pow(1024, 2)).toFixed(2)
        }
    }
}

export {
    convertBytes
}