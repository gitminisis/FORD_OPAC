$(document).ready(function () {
    let trending1 = new LatestArchive('AR-2001-77-13208.11.1.1', $('.latestArchive').eq(0));

})



class LatestArchive {
    constructor(refd, dom) {
        this.title = '';
        this.scope = '';
        this.mediaThumb = '';
        this.refd = '';
        this.dom = dom;
        this.init(refd, dom)
    }

    fetchData() {
        let object = this;
        let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL_XML?SESSIONSEARCH&exp=REFD ${this.refd}`;
        fetch(url).then(function (response) { return response.text() }).then(y => {
            console.log(y)
               let x2js = new X2JS({})
               let JSONObj = x2js.xml_str2json(y)
               console.log(JSONObj)
        });
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
        this.fetchData()
    }

}