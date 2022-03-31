$(document).ready(function () {


})



class TrendingNow {
    constructor() {
        this.title = '';
        this.scope = '';
        this.mediaThumb = '';
        this.refd = '';
        this.dom = dom;
    }

    fetchData() {
        let object = this;
        let url = `/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL_XML?SESSIONSEARCH&exp=REFD ${this.refd}`;
        return ajax.get(url).then(response => {
            let x2js = new X2JS({});

        })
    }

    setTitleUI() {
        let { dom, title } = this;

        dom.find('latestArchiveTitle').text(title)
    }

    setScopeUI() {
        let { dom, scope } = this;

        dom.find('latestArchiveScope').text(scope)
    }

    setThumbnail() {
        let { dom, mediaThumb } = this;

        dom.find('latestArchiveThumb').removeClass('bg-black')
        dom.find('latestArchiveThumb').css('background-image', `url('${mediaThumb}')`)
    }
    setButtonLinkUI() {
        let { dom } = this;
        dom.find('latestArchiveLink').on('click', function () {
            let url = '';
            window.location = (url, "_blank")
        })
    }

    init(refd, dom) {

        this.refd = refd;
        this.dom = dom;
        this.fetchData().then(res => {
            this.setTitleUI();
            this.setScopeUI();
            this.setThumbnail();
            this.setButtonLinkUI();
        })
    }

}