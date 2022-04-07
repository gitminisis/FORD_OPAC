$(document).ready(function () {

    if (document.getElementsByClassName('home')) {
        const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];

        LATEST_ARCHIVE_REFD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).init())

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];

        TRENDING_NOW_REFD.map((e, i) => new TrendingNow(e, $('.trendingNow').eq(i)).init())
    }



})



class LatestArchive extends FeatureRecord {


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

class TrendingNow extends FeatureRecord {

    setTitleUI() {
        let { dom, title } = this;

        dom.find('.trendingNowTitle').text(title)
    }



    setThumbnail() {
        let { dom, mediaThumb } = this;

        // dom.find('.latestArchiveThumb').removeClass('bg-black')
        dom.css('background-image', `url('${mediaThumb}')`)
    }

    setButtonLinkUI() {
        // let { dom, refd } = this;
        // dom.find('.latestArchiveLink').on('click', function () {
        //     let url = getRecordPermalink(refd, 'FORD_DETAIL');
        //     window.open(url, '_blank')
        // })
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