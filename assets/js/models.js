class Report {
    /**
        * Find hiddenTotalRecord DOM and 
        * set the value to innerText
        *
        * @memberof Report
        */
    setTotalRecord() {
        let hiddenTotalRecord = document.getElementById("hiddenTotalRecord");
        if (hiddenTotalRecord) {
            $("#totalRecord").text(hiddenTotalRecord.innerText);
        }
        else {
            $("#totalRecord").parent().empty();
        }
    }

    getFilter() {
        let filter = sessionStorage.getItem("filter")
        if (filter) {
            return JSON.parse(filter)
        }
    }
    getThumbnailURL(recordDOM) {
        let span = recordDOM.find('.hidden_fields').find('.a_media_thumb')
        return span.length > 0 ? span.eq(0).text().trim().replace(/\n/g, '') : null
    }
    getRecordURL(recordDOM) {
        return removeWhiteSpace(recordDOM.find(".hiddenRecordURL").text());
    }
    setRecordThumbnail() {
        let summary = this;
        $('.record').each(function () {
            let url = summary.getThumbnailURL($(this));
            let record_thumbnail = $(this).find('.record_thumbnail')

            if (url !== null) {
                record_thumbnail.removeClass('bg-cover')
                record_thumbnail.addClass('bg-contain bg-center bg-no-repeat')
                record_thumbnail.css("background-image", `url('${url}')`);
            }
            // If No Digital Asset put placeholder
            else {
                record_thumbnail.addClass('bg-test bg-center')
            }
        })
    }
    getAccessURL(recordDOM) {
        let span = recordDOM.find('.hidden_fields').find('.a_media_low_res')
        return span.length > 0 ? span.text().trim().replace(/\n/g, '') : null
    }
    addBookmark(SISN) {
        let url = `${document.getElementById('hiddenBookmarkURL').innerText.trim()}`
        return fetch(`${url}?ADDSELECTION&COOKIE=BOOKMARK`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: `mcheckbox_${SISN}=${SISN}-DESCRIPTION_OPAC3`
        }).then(function (r) {
            updateBookmarkCount();
            new MessageModal(`Record SISN#${SISN} has been added to collection`).open()
        })


    }
    deleteBookmark(SISN) {
        let url = `${document.getElementById('hiddenBookmarkURL').innerText.trim()}`
        return fetch(`${url}?DELETEORDER&COOKIE=BOOKMARK&NOMSG=[FORD_INCLUDE]html/362.htm`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: `mcheckbox_1=${SISN}`
        }).then(function (r) {
            updateBookmarkCount();
            new MessageModal(`Record SISN#${SISN} has been removed from collection`).open();
            setTimeout(function () { location.reload() }, 800)
        })


    }

    // deleteMultipleBookmark(SISN_array) {
    //     console.log(SISN_array)
    //     let data = SISN_array.map((e, i) => `mcheckbox_${i + 1}=${e}`).join('&');
    //     let url = `${document.getElementById('hiddenBookmarkURL').innerText.trim()}`
    //     return fetch(`${url}?DELETEORDER&COOKIE=BOOKMARK&NOMSG=[FORD_INCLUDE]html/362.htm`, {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    //         body: data
    //     }).then(function (r) {
    //         updateBookmarkCount();
    //         new MessageModal(`Collection has been cleared`).open()
    //     })
    // }

    deleteAllBookmark() {
        let url = `${document.getElementById('hiddenBookmarkURL').innerText.trim()}`
        return fetch(`${url}?CLEARORDERLIST&COOKIE=BOOKMARK&NOMSG=[FORD_INCLUDE]html/362.htm`, {
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
          
        }).then(function (r) {

            new MessageModal(`Collection has been cleared`).open()
            setTimeout(function () { window.location = '/' }, 800)

        })
    }



}




class FeatureRecord {

    constructor(refd, dom) {
        this.title = '';
        this.scope = '';
        this.mediaThumb = '';
        this.refd = refd;
        this.dom = dom;

    }

    fetchData(report = 'FORD_DETAIL_XML', x2jsArray = {}) {
        let object = this;
        let url = getRecordPermalink(this.refd, report);
        return fetch(url).then(function (response) { return response.text() }).then(y => {
            let dom = new DOMParser().parseFromString(y, 'text/html')
            let reportDOM = dom.querySelector('report');

            let x2js = new X2JS(x2jsArray)
            let JSONObj = x2js.xml2json(reportDOM);

            let { item } = JSONObj;
            this.title = item.item_title;
            this.refd = item.item_refd;
            this.scope = item.item_scope;
            this.mediaThumb = item.item_thumb;
        });
    }
}