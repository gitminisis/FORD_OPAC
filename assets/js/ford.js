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


class PDFRequest {
    constructor() {
        this.name = '';
        this.email = '';
        this.refd = '';
        this.title = '';
    }
    openModal() {
        $('#requestPDFModal').fadeIn(400);
        if ($('#backTop').hasClass('show')) {
            $('#backTop').removeClass('show');
            this.backTop = true;
        }
    }

    closeModal() {
        $('#requestPDFModal').fadeOut(200);
        if (this.backTop) {
            $('#backTop').addClass('show');
            this.backTop = false;
        }
        this.reset();
    }

    validateEmail(str) {
        if (str.trim() === '') {
            return false;
        }
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return EMAIL_REGEX.test(str);
    }

    submit() {
        let emailInput = $('#requestEmailInput').val();
        let nameInput = $('#requestNameInput').val();
        console.log(emailInput, nameInput);
        if (!this.validateEmail(emailInput)) {

            new MessageModal('Invalid Email Address !').open();
        }

        let modal = this;
        let SESSID = getCookie("HOME_SESSID");
        let subject = 'I need an accessible PDF';
        let body = `Accessible PDF Request \n\n Email Address: ${emailInput} \nFull Name: ${nameInput} \n\n Record Information:\n\nTitle: ${this.title}\n REFD: ${this.refd}`
        let receiver = 'archives@ford.com'
        let sender = 'noreply@minisisinc.com';
        let url = `${SESSID}?save_mail_form&async=y&xml=y&subject_default=${subject}&from_default=${sender}&to_default=${receiver}`;
        $.ajax({
            type: "POST",
            url: url,
            data: `sender=${sender}&receiver=${receiver}&subject=${subject}&mailbody=${body}`,

        }).done(function (res) {
            modal.closeModal();
            let toast = new MessageModal('Your request has successfully been sent!')
            toast.open();
        });
    }

    reset() {
        $('#requestEmailInput').val('');
        $('#requestNameInput').val('');
    }

    init() {

        let modal = this;

        $('.modalCloseButton').on('click', function (e) {
            modal.closeModal();
        })

        $(document).on('keyup', function (e) {
            if (e.key == "Escape") {
                modal.closeModal();
            }
        });
        // Hide dropdown menu on click outside
        $('#requestPDFModal').on('click', function (e) {
            modal.closeModal();
        });
        $('#requestPDFModal .modalBody').on('click', function (e) {
            e.stopPropagation();
        });

        $('#request-submit').on('click', function (e) {
            modal.submit();
        });

    }
}

class SummaryFilter {

    constructor() {
        this.filterJSON = null;
    }
    getJSONFilter() {
        let filter_xml = document.getElementById('filter_xml')
        let filter = this;
        if (filter_xml) {
            let x2js = new X2JS({
                arrayAccessFormPaths: [
                    'xml.filter'
                    , 'xml.filter.item_group'
                ]
            });
            let jsonObj = x2js.xml2json(filter_xml);
            filter = jsonObj.filter
            return filter
        }
        return null;
    }
    getFilterName(name) {
        if (name === "A_MEDIA_MAKE")
            return "Make"
        else if (name === "A_MEDIA_MODEL")
            return "Model"
        else if (name === "A_MEDIA_Year")
            return "Year"
        else if (name === "A_MEDIA_COLOR")
            return "Color"
    }

    initDropdown() {

        $('.expandFilter').on('click', function () {
            let collapseSection = $(this).parent().parent().find('.filterCollapse')

            collapseSection.toggleClass('openFilterCollapse')
        })
    }

    renderUI() {
        $('.left').append('<h1 class="text-[35px]">Filter</h1>');
        let filterJSON = this.getJSONFilter();
        let filter = this;
        console.log(filterJSON);
        filterJSON.map(item => {
            let { item_group } = item;
            $('.left').append(`<hr /> <div id=${item._title} > <div class="flex justify-between h-[60px] pt-[15px]"> <div><p>${filter.getFilterName(item._name)}</p></div> <div class="expandFilter cursor-pointer"> <span class="material-icons"> expand_more </span> </div> </div> </div>`)
            $(`#${item._title}`).append(`<div class="w-full mt-[10px] h-auto px-[15px] pb-[30px] filterCollapse collapse openFilterCollapse ${item._title}Filter" ></div>`)
            item_group.map((group, index) => {

                if (group.item_selected !== undefined) {
                    $(`.${item._title}Filter`).append(`<div class="cursor-pointer ${item._title}FilterItem "> <input id='${item._title}${index}' type="checkbox" class="cursor-pointer w-[16px] h-[16px] border-[#6E6E6E]" ${group.item_selected === 'Y' ? 'checked' : ''}  /> <label for='${item._title}${index}' class="cursor-pointer mb-[8px]">${group.item_value}</label> <span id="count">(${group.item_frequency})</span> <span hidden class="${item._title}FilterItemLink">${group.item_link}</span></div>`)


                } else if (group.item_selected === undefined) {
                    $(`.${item._title}Filter`).append(`<div class="cursor-pointer ${item._title}FilterItem "> <input id='${item._title}${index}' type="checkbox" class="cursor-pointer w-[16px] h-[16px] border-[#6E6E6E]"  ${group.item_link.item_selected === 'Y' ? 'checked' : ''}   /> <label for='${item._title}${index}' class="cursor-pointer mb-[8px]">${group.item_value}</label> <span id="count">(${group.item_frequency})</span> <span hidden class="${item._title}FilterItemLink">${group.item_link.__text}</span> </div>`)

                }
                $(`.${item._title}FilterItem`).on('click', function () {
                    window.location.href = $(this).find(`.${item._title}FilterItemLink`).text()
                })
            })
        })
        this.initDropdown();
    }
    toggleFilter() {
        $('.left').toggleClass('filter-open')
        let isOpen = sessionStorage.getItem('openFilter')
        sessionStorage.setItem('openFilter',!(isOpen === 'true'));
    }
    init() {
        let filter = this;
        $(".filterToggle").click(function () {
            filter.toggleFilter();
        });

        if (sessionStorage.getItem('openFilter') === null) {
            sessionStorage.setItem('openFilter', 'false')
        }
        if (sessionStorage.getItem('openFilter') === 'true') {
            $('.left').addClass('filter-open')
        }
        else {
            $('.left').removeClass('filter-open')
        }
        this.renderUI();
    }
}