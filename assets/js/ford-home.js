$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];

        LATEST_ARCHIVE_REFD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).init())

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];

        TRENDING_NOW_REFD.map((e, i) => new TrendingNow(e, $('.trendingNow').eq(i)).init())

        $('.bg-homeInnovation').on('click', function () {
            let refd = 'AR-2008-8.1.2.3489';
            let url = `${BASE_URL}/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD%20${refd}`
            window.location = url
        })

        $('.bannerClickLayer').not('#searchForm').on('click', function (e) {
            e.stopPropagation()

            let refd = 'AR-2008-8.1.2.2427';
            let url = `${BASE_URL}/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD%20${refd}`
            window.location = url
        })


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
        dom.find('.latestArchiveThumb').removeClass('linear-background')
        dom.find('.latestArchiveThumb').css('background-image', `url('${mediaThumb}')`)
    }
    setButtonLinkUI() {
        let { dom, refd } = this;
        dom.find('.latestArchiveLink').on('click', function () {
            let url = getRecordPermalink(refd, 'FORD_DETAIL');
            window.location = url
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



class TrendingNow extends FeatureRecord {

    setTitleUI() {
        let { dom, title } = this;
        dom.find('.trendingNowTitle').text(title)
    }



    setThumbnail() {
        let { dom, mediaThumb } = this;

        dom.css('background-image', `url('${mediaThumb}')`)
        $('.trendingNow').hover(function () {
            $(this).find('.trendingNowLink').css('color', 'white')
        }, function () {
            $(this).find('.trendingNowLink').css('color', 'transparent')
        })

    }

    setButtonLinkUI() {
        let { dom, refd } = this;
        dom.on('click', function () {
            let url = getRecordPermalink(refd, 'FORD_DETAIL');
            window.location = url
        })
    }

    init() {
        let fr = this;

        this.fetchData().then(function () {
            fr.setThumbnail();
            fr.setTitleUI();
            fr.setButtonLinkUI();

        })
    }


}