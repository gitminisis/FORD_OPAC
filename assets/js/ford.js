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
 * This functions takes the TDR URL then 
 * download the content and put it inside a zip file
 *
 * @param {*} downloadURL
 */
function downloadMedia(downloadURL) {
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
            console.log(fileBlob);
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

