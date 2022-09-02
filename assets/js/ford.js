$(document).ready(function () {
    // let sessionid = document.getElementById('sessionid');
    // if (sessionid) {
    //     sessionid = sessionid.innerText.trim();
    //     $(".homepageURL").attr('href', `${sessionid}?GET&FILE=[FORD_ROOT]home.html`)
    // }
    // updateBookmarkCount();
    $('.loadingAssets').removeClass('loadingAssets')

})

const BASE_URL = "https://fordheritagevault.com"

/**
 * Callback function for Captcha
 * @param {} response 
 */
let keyV2 = '6Lc_AckhAAAAADOJBr6WdChtixBDsBEhcBzo_mp1'
let verifyCallback = function (response) {

    $.post('https://www.google.com/recaptcha/api/siteverify', { secret: keyV2, response: response }).done((res) => {
        if (res.success) {
            $('#survey-submit').attr('hidden', false)
        }
    });
};

/**
 * Hide Submit button after verification expires
 * @param {} response 
 */
let expireCallback = function () {
    $('#survey-submit').attr('hidden', true)
}

/**
 * Captcha button render
 */
let onloadCallback = function () {

    grecaptcha.render('captchaDiv', {
        'sitekey': keyV2,
        'callback': verifyCallback,
        'expired-callback': expireCallback,
        'theme': 'light'
    });
};


/**
 * Set the title and icon of the site in other pages
 * @param {string} title 
 */
function setSiteTitleAndIcon(title) {
    document.title = title;
    var link = document.querySelector("link[rel~='icon']");

    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);

    link.href = `${BASE_URL}/assets/favicon.ico`;
}
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

function updateBookmarkCount() {
    let SESSID = document.getElementById('sessionid').innerText.trim();
    let url = `${SESSID}?SHOWORDERLIST&COOKIE=BOOKMARK&NEW=Y`
    $.ajax(url).done(function (res) {

        res = new DOMParser().parseFromString(res, "text/html");

        let hiddenRecordCount = res.querySelector('#hiddenTotalRecord');

        if (hiddenRecordCount && Number.parseInt(hiddenRecordCount.innerText)) {
            let count = Number.parseInt(hiddenRecordCount.innerText)
            $('.collectionCount').addClass('showCollectionCount');
            $('.collectionCount').text(count)
        }
        else {
            $('.collectionCount').removeClass('showCollectionCount');
            $('.collectionCount').text('')
        }
    })
}

function getSummaryXMLURL(exp, report = "FORD_SUMMARY_XML", database = "DESCRIPTION_OPAC3") {

    if (document.getElementById('sessionid')) {
        let sessionid = document.getElementById('sessionid').innerText.trim();
        let url = `${sessionid}?SEARCH&SIMPLE_EXP=Y&EXP=${exp}&DATABASE=${database}&REPORT=${report}`
        return url;
    }
    return `/scripts/mwimain.dll/144/${database}/${report}?sessionsearch&exp=${exp}`

}

function randomSlice(array, n) {
    // Shuffle array
    const shuffled = array.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, n);
    return selected;
}

function getRecordPermalink(refd, report) {
    return `/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/${report}?SESSIONSEARCH&exp=REFD ${refd}`
}

function removeWhiteSpace(string) {
    return string.replace(/(\r\n|\n|\r)/gm, "");
}

class MediaDownloader {

    constructor() {
        this.assetBlobArray = [];
        this.arrayURL = [];
    }

    setArrayURL = (arrayURL) => {
        this.arrayURL = arrayURL;
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
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const fileName = response.headers["content-disposition"].split("=")[1]
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
                toast.close();

            })
            .catch((error) => {
                console.log(error);
                // onError(error, errorHandler);
            });
    }
    fetchBlob = async (array) => {
        let toast = new MessageModal('Your files are being processed ...', 99999)
        toast.open()
        return axios.all(array.map(url => axios({
            url: url,
            method: "GET",
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); // you can use this to show user percentage of file downloaded
            }
        })))
            .then(axios.spread((...res) => {
                toast.close();
                return res;
            })).catch(err => console.log(err));
    }
    /**
     * Download Multiple Assets in 1 call
     * @param {array of string} arrayURL 
     */
    downloadMultiAssets = async () => {
        // No selected digital asssets
        if (this.arrayURL.length === 0) {
            return;
        }
        let res = await this.fetchBlob(this.arrayURL);
        let zip = new JSZip();

        res.map((response, index) => {
            let fileName = response.headers["content-disposition"].split(
                "="
            )[1];
            let fileBlob = new Blob([response.data]);
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

    initAssetBlobArray = URLarray => {
        $('.loadingAssets').click(false);
        // $(".loadingAssets").prop('disabled', true);
        let loadingAsset = new Tooltip($('.loadingAssets'), "Loading Assets ...");
        loadingAsset.init();
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


                    $(".loadingAssets").prop('disabled', false);
                    loadingAsset.destroy();

                    $('.loadingAssets').removeClass('loadingAssets')
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

    destroy() {
        this.DOM.find('.tooltip').remove()
        this.DOM.removeClass('relative group');
    }

    init() {
        this.DOM.addClass('relative group');
        this.DOM.append(`<div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex">
        <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div>
        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">${this.text}</span>
    </div>`)
    }
}


class PDFRequest {
    constructor() {
        this.name = '';
        this.email = '';
        this.refd = document.getElementsByClassName('detailREFD')[0].innerText;
        this.title = document.getElementsByClassName('detailTitle')[0].innerText;
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

        if (!this.validateEmail(emailInput)) {

            new MessageModal('Invalid Email Address !').open();
        }

        let modal = this;
        let SESSID = document.getElementById('sessionid').innerText.trim();
        let subject = 'I use a screen reader, or other adaptive technology, and need accessibility features added to this brochure';
        let body = `Accessible Brochure Request \n\n Email Address: ${emailInput} \nFull Name: ${nameInput} \n\n Record Information:\n\nTitle: ${this.title}\n REFD: ${this.refd}`
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
        $('#requestREFD').text(document.getElementsByClassName('detailREFD')[0].innerText)
        $('#requestTitle').text(document.getElementsByClassName('detailTitle')[0].innerText)

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
        else if (name === "A_MEDIA_YEAR")
            return "Year"
        else if (name === "A_MEDIA_COLOR")
            return "Color"
        else if (name === "A_MEDIA_TYPE")
            return "Asset Type"
    }

    initDropdown() {

        $('.expandFilter').on('click', function () {
            let collapseSection = $(this).parent().parent().find('.filterCollapse')

            collapseSection.toggleClass('openFilterCollapse')
        })
    }

    renderUI() {
        let x2js = new X2JS();
        $('.left').append('<h1 class="text-[25px]">Filter</h1>');
        let filterJSON = this.getJSONFilter();
        let filter = this;
        if (filterJSON === undefined) {
            return;
        }
        filter.filterJSON = filterJSON;
        x2js.asArray(filterJSON).map(item => {
            let { item_group } = item;
            $('.left').append(`<hr /> <form id=${item._title}> <div class="flex justify-between h-[30px] pt-[10px] pb-[20px]"> <div><p>${filter.getFilterName(item._name)}</p></div> <div class="expandFilter cursor-pointer"> <span class="material-icons"> expand_more </span> </div> </div> </form>`)
            $(`#${item._title}`).append(`<div class="w-full mt-[10px] h-auto px-[15px] pb-[30px] filterCollapse collapse openFilterCollapse ${item._title}Filter" ></div>`)
            x2js.asArray(item_group).map((group, index) => {
                if (group.item_value === 'Image') {
                    group.item_value = "Images"
                }


                if (group.item_value === 'Textual') {
                    group.item_value = "Brochures"
                }

                if (typeof group.item_link === 'string') {
                    group.item_link += '&DATABASE=DESCRIPTION_OPAC3'
                }
                else {
                    group.item_selected = group.item_link.item_selected;
                    group.item_link = group.item_link.__text.trim() + '&DATABASE=DESCRIPTION_OPAC3'
                }

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
        $('.right').toggleClass('right-side')
        let isOpen = sessionStorage.getItem('openFilter')
        sessionStorage.setItem('openFilter', !(isOpen === 'true'));
    }
    init() {
        let filter = this;
        $(".filterToggle").click(function () {
            if (filter.filterJSON === null) {
                new MessageModal('No current filter for this search').open()
            }
            else {
                filter.toggleFilter();
            }
        });

        if (sessionStorage.getItem('openFilter') === null) {
            sessionStorage.setItem('openFilter', 'true')
        }

        $('.left').addClass('filter-open')
        $('.right').addClass('right-side')

        this.renderUI();
    }
}

class SessionTimeoutModal {
    constructor() {
        this.backTop = false;
    }
    openModal() {
        $('#sessionTimeoutModal').fadeIn(400);
        if ($('#backTop').hasClass('show')) {
            $('#backTop').removeClass('show');
            this.backTop = true;
        }
    }

    closeModal() {
        $('#sessionTimeoutModal').fadeOut(200);
        if (this.backTop) {
            $('#backTop').addClass('show');
            this.backTop = false;
        }

    }
}

const timeOutInMinutes = 500;//this indicates the SESSION duration
const alertTimeInMinutes = 1;//indicates how many minutes before expiration the alert should be shown

let timeOutInMilliSeconds = timeOutInMinutes * 60 * 1000;
let alerTimeInMilliSeconds = alertTimeInMinutes * 60 * 1000;
let alertStartTime = timeOutInMilliSeconds - alertTimeInMinutes;
let seconds = alertTimeInMinutes * 60;

class SessionTimer {
    constructor() {

        this.timer = null;
    }

    extendSession() {
        clearInterval();
        clearTimeout(this.timer);
        $.ajax({
            type: "GET",
            url: document.getElementById('sessionid').innerText.trim() + "?noaction",
            success: function (data) {
                location.reload();
            }
        });
    }

    incrementSeconds() {
        let sessionModal = new SessionTimeoutModal()
        sessionModal.openModal();
        let sessionTimer = this;
        var title = 'Ford Heritage Vault';
        var intv = window.setInterval(function () {
            document.title = document.title === 'Session Renew - Ford Heritage Vault' ? title : 'Session Renew - Ford Heritage Vault';
        }, 1000);
        $("#continue-session").on('click', function () {
            clearInterval();
            clearTimeout(sessionTimer.timer);
            $.ajax({
                type: "GET",
                url: document.getElementById('sessionid').innerText.trim() + "?noaction",
                success: function (data) {
                    location.reload();
                }
            });
        })
        $("#end-session").on('click', function () {
            clearInterval(x);
            sessionModal.closeModal();
            window.location = "/index.html"
        })
        var x = setInterval(function () {
            if (seconds > 0) {
                seconds -= 1;
                $("#time-out-seconds").html(seconds);

            } else {
                clearInterval(x);
                sessionModal.closeModal();
                window.location = "/index.html"
            }
        }, 1000)
    }

    init() {
        this.timer = setTimeout(this.incrementSeconds, alertStartTime);
    }
}

let sessiontimer = new SessionTimer();
sessiontimer.init();

