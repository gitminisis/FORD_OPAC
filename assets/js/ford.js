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



class Carousel {
    constructor(DOMPath) {
        let dom = document.querySelector(DOMPath)
        this.delay = 1500;
        this.slides = dom;
        this.slidesCount = dom.childElementCount;
        this.maxLeft = (dom.childElementCount - 1) * 100 * -1;
        this.current = 0;

    }


    init() {

        let carousel = this;
        console.log(this);
        document.querySelector(".next-slide").addEventListener("click", function () {
            carousel.changeSlide();
        });
        document.querySelector(".prev-slide").addEventListener("click", function () {
            carousel.changeSlide(false);

        });
        // let autoChange = setInterval(carousel.changeSlide, carousel.delay);
        const restart = function () {
            clearInterval(autoChange);
            autoChange = setInterval(carousel.changeSlide, carousel.delay);
        };

    }

    changeSlide = (next = true) => {

        let { current, maxLeft, slides } = this;

        if (next) {
            let x = current > maxLeft ? -100 : current * -1
            this.current = current + x
        } else {
            this.current = this.current < 0 ? this.current + 100 : maxLeft;
        }



        this.slides.style.left = this.current + "%";
    }

}


class Tooltip {

    constructor(DOM, text) {
        this.DOM = DOM;
        this.text = text;
        
    }


    init() {
        this.DOM.addClass('relative group');
        this.DOM.append(`<div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex">
        <div class="w-3 h-3 -mb-2 rotate-45 bg-black"></div>
        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">${this.text}</span>
    </div>`)
    }
}