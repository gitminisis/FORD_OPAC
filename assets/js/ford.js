/**
 * Return the cookie value
 *
 * @param {*} cname
 * @returns string
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Function to generate a unique ID for 
 * downloaded digital assets file
 *
 * @returns current timestamp as string
 */
function getTimestamp() {
    let time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    });

    let date = new Date().toLocaleDateString("en-US");

    let timestamp = date + time;
    return timestamp;
}


/**
 * Copy a string to the clipboard
 */
function copyToClipboard (str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};




class MediaDownloader {

    constructor() {
        this.assetBlobArray = [];
    }

    /**
     * This functions takes the TDR URL then 
     * download the content and put it inside a zip file
     *
     * @param {*} downloadURL
     */
    downloadSingleAsset = (downloadURL) => {
        axios({
            url: downloadURL, //your url
            method: "GET",
            responseType: "arraybuffer", // important
        })
            .then(async function (response) {
                console.log(response);
                let url;
                if (window.webkitURL) {
                    url = window.webkitURL.createObjectURL(new Blob([response.data]));
                } else if (window.URL && window.URL.createObjectURL) {
                    url = window.URL.createObjectURL(new Blob([response.data]));
                }
                const link = document.createElement("a");
                link.href = url;
                console.log(url);
                const fileName = response.headers["content-disposition"].split("=")[1];

                const fileBlob = await fetch(downloadURL).then((res) => res.blob());

                const fileData = new File([fileBlob], fileName);
                let zip = new JSZip();

                zip.file(fileName, fileData);

                zip.generateAsync({ type: "blob" }).then(function (content) {
                    saveAs(content, `DigitalAssets_${getTimestamp()}.zip`);
                });
            })
            .catch((error) => {
                // onError(error, errorHandler);
            });
    }


    downloadMultiAssets = _ => {
        this.initAssetBlobArray(URLarray);
        console.log(this.assetBlobArray)
        setTimeout(() => {
            // console.log(this.assetBlobArray)
            this.downloadBlobArray();
        }, 1500)

    }


    initAssetBlobArray = URLarray => {
        URLarray.map(async (url, index) => {
            axios({
                url: url, //your url
                method: "GET",
                responseType: "arraybuffer" // important
            })
                .then(async (response) => {
                    let url;
                    if (window.webkitURL) {
                        url = window.webkitURL.createObjectURL(new Blob([response.data]));
                    } else if (window.URL && window.URL.createObjectURL) {
                        url = window.URL.createObjectURL(new Blob([response.data]));
                    }
                    const fileName = response.headers["content-disposition"].split("=")[1];

                    let fileBlob = await fetch(url, {
                        mode: "cors"
                    }).then(res => res.blob());

                    this.assetBlobArray.push({
                        fileBlob, fileName
                    })
                })
                .catch(error => {
                    // onError(error, errorHandler);
                });

        });
    }


    downloadBlobArray = _ => {
        let zip = new JSZip();
        this.assetBlobArray.map((object, index) => {
            let { fileBlob, fileName } = object;
            let imgData = new File([fileBlob], fileName);

            zip.file(fileName, imgData, {
                base64: true
            });
        });
        zip.generateAsync({ type: "blob" }).then(function (content) {
            let time = new Date().toLocaleTimeString("en-US", {
                hour12: false,
                hour: "numeric",
                minute: "numeric"
            });

            let date = new Date().toLocaleDateString("en-US");

            let timestamp = date + time;

            saveAs(content, `DigitalAssets_${timestamp}.zip`);
        });
    }

}



// const url_array = ['https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/2f1ebcd8bbd0433ca040d65cf8e4728f/access'
//     ,
//     'https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/4f9c16982232481ca39b3b7a3c69f81a/access',
//     'https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/087f992a063a4c32a7a61dd84b46d8a6/access',
//     'https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/e081083352a648948c89496e3fdb354c/access',
//     'https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/5db8171ec16f424e9a30ee2d562a59e5/access'

// ]
// let downloader = new MediaDownloader();

// // downloader.downloadSingleAsset(url_array[0]);

// downloader.initAssetBlobArray(url_array);