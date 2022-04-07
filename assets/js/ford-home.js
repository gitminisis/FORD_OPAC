$(document).ready(function () {

    if (document.getElementsByClassName('home')) {
        const LATEST_ARCHIVE_REFD = ['AR-2001-77-13208.11.1.1', 'AR-96-212010.5809', 'AR-96-212010.3075'];

        LATEST_ARCHIVE_REFD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).init())
    }



})



class LatestArchive {
    constructor(refd, dom) {
        this.title = '';
        this.scope = '';
        this.mediaThumb = '';
        this.refd = refd;
        this.dom = dom;

    }

    fetchData() {
        let object = this;
        let url = getRecordPermalink(this.refd, 'FORD_DETAIL_XML');
        return fetch(url).then(function (response) { return response.text() }).then(y => {
            let dom = new DOMParser().parseFromString(y, 'text/html')
            let reportDOM = dom.querySelector('report');

            let x2js = new X2JS({})
            let JSONObj = x2js.xml2json(reportDOM);

            let { item } = JSONObj;
            this.title = item.item_title;
            this.refd = item.item_refd;
            this.scope = item.item_scope;
            this.mediaThumb = item.item_thumb;
        });
    }

    setTitleUI() {
        let { dom, title } = this;

        dom.find('.latestArchiveTitle').text(title)
    }

    setScopeUI() {
        let { dom, scope } = this;

        dom.find('.latestArchiveScope').text(scope)
    }

    setThumbnail() {
        let { dom, mediaThumb } = this;

        dom.find('.latestArchiveThumb').removeClass('bg-black')
        dom.find('.latestArchiveThumb').css('background-image', `url('${mediaThumb}')`)
    }
    setButtonLinkUI() {
        let { dom, refd } = this;
        dom.find('.latestArchiveLink').on('click', function () {
            let url = getRecordPermalink(refd, 'FORD_DETAIL');
            window.open(url, '_blank')
        })
    }

    init() {
        let latestArchive = this;

        this.fetchData().then(function () {
            latestArchive.setThumbnail();
            latestArchive.setTitleUI();
            latestArchive.setScopeUI();
            latestArchive.setButtonLinkUI();

        })
    }

}

function getRecordPermalink(refd, report) {
    return `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/${report}?SESSIONSEARCH&exp=REFD ${refd}`
}