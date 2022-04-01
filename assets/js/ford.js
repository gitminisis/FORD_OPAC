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
function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    let toast = new MessageModal('Record URL has been copied')
    toast.open()
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
        let toast = new MessageModal('Your files are being processed ...', 99999)
        toast.open()
        axios({
            url: downloadURL, //your url
            method: "GET",
            responseType: "arraybuffer", // important
        })
            .then(async function (response) {

                let url;
                if (window.webkitURL) {
                    url = window.webkitURL.createObjectURL(new Blob([response.data]));
                } else if (window.URL && window.URL.createObjectURL) {
                    url = window.URL.createObjectURL(new Blob([response.data]));
                }
                const link = document.createElement("a");
                link.href = url;

                const fileName = response.headers["content-disposition"].split("=")[1];

                const fileBlob = await fetch(downloadURL).then((res) => res.blob());

                const fileData = new File([fileBlob], fileName);

                let zip = new JSZip();

                zip.file(fileName, fileData);

                zip.generateAsync({ type: "blob" }).then(function (content) {
                    toast.close();
                    saveAs(content, `DigitalAssets_${getTimestamp()}.zip`);
                });
            })
            .catch((error) => {
                // onError(error, errorHandler);
            });
    }


    // downloadMultiAssets = _ => {
    //     this.initAssetBlobArray(URLarray);
    //     console.log(this.assetBlobArray)
    //     setTimeout(() => {
    //         // console.log(this.assetBlobArray)
    //         this.downloadBlobArray();
    //     }, 1500)

    // }


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
        let toast = new MessageModal('Your files are being processed ...', 99999)
        toast.open()
        this.assetBlobArray.map((object, index) => {
            let { fileBlob, fileName } = object;
            let imgData = new File([fileBlob], fileName);
            console.log(imgData)
            zip.file(fileName, imgData, {
                base64: true
            });
        });

        zip.generateAsync({ type: "blob" }).then(function (content) {
            toast.close()
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




class MessageModal {

    constructor(text, duration = 2000) {
        this.toast = Toastify({
            text: text,
            duration: duration,

            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: '#00095B'
            },
            onClick: function () { }, // Callback after click
        })
    }

    open() {
        this.toast.showToast();
    }

    close() {
        this.toast.hideToast();
    }
}