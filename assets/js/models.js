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

    addBookmark(SISN) {
        let SESSID = getCookie("HOME_SESSID");
        let url = `${SESSID}/1/1?ADDSELECTION&COOKIE=BOOKMARK`
        let data = `mcheckbox_${SISN}=${SISN}-DESCRIPTION`
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (response) {
                //if request if made successfully then the response represent the data

                let roaster = new MessageModal(`Record SISN#${SISN} has been added to collection`)
                roaster.open();
            }
        });
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