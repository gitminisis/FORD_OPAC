$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/3555b003c3874a708be30b58d1936f65/thumbnail",
                refd: "AR-2008-8.1.10.5358",
                scope: undefined,
                title: "1999 Ford Courier inside of domed building neg CN329038-012"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ede837efbfb64cf6a7d131bfc76da4a9/thumbnail",
                refd: "AR-96-212010.6768",
                scope: undefined,
                title: "1969 Ford Cortina Mark 2 brochure in Danish"
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ce943f693a7e45eca709573b481b099c/thumbnail",
                refd: "AR-2008-8.1.10.5636",
                scope: undefined,
                title: "1960 Ford XK Falcon with Ford cargo containers",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f4dda70ce67d418e8cae0045aed7ac49/thumbnail",
                refd: "AR-2000-213654.157.158.2",
                scope: undefined,
                title: "1992 Ford Mondeo Mark I on road in front of scenic building in Paris CN UK 1992-714-1-002",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/08da21a0231c41d5958f8abd7587d558/thumbnail",
                refd: "AR-96-212010.6814",
                scope: undefined,
                title: "c 1951 Ford 3.5 Ton trucks brochure in German",
            }, {
                mediaThumb: "https://fordingestapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/53e6522480244b7e98fd71ab1a1a1eaf/thumbnail",
                refd: "AR-2002-213709.1068.260",
                scope: undefined,
                title: "c 1998 Ford Spectron in scenic forest AR-2002-213709",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/619d8a80d99940b9854902640a7c1d51/thumbnail",
                refd: "AR-96-212010.3826",
                scope: undefined,
                title: "11984 Ford Telstar brochure in Japanese",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/54793a50bba24cf08728affa29a9b13e/thumbnail",
                refd: "AR-96-212010.3921",
                scope: undefined,
                title: "1989 Mercury Grand Marquis brochure in Arabic",
            }, {
                mediaThumb: "https://fordingestapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/fbae04e61f554dee85083c76a78bd2ad/thumbnail",
                refd: "AR-2002-213709.1068.264",
                scope: undefined,
                title: "1998 Ford Thai Ranger in front of scenic building AR-2002-213709",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1c0d99480eef41449b1d8d5728dd704c/thumbnail",
                refd: "AR-2008-8.1.2.5690",
                scope: undefined,
                title: "1960 Ford Taunus P2 Kombi station wagon in studio neg C1037-15",
            },
        ]
        TRENDING_NOW_RECORD.map((e, i) => new TrendingNow(e, $('.trendingNow').eq(i)).initUIManual(e))

        $('.bg-homeInnovation').on('click', function () {
            let refd = 'AR-2008-8.1.2.3489';
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
    initUIManual(object) {
        let { mediaThumb, refd, title } = object;
        this.mediaThumb = mediaThumb;
        this.refd = refd;
        this.title = title;
        this.setThumbnail();
        this.setTitleUI();
        this.setScopeUI();
        this.setButtonLinkUI();
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
    initUIManual(object) {
        let { mediaThumb, refd, title } = object;
        this.mediaThumb = mediaThumb;
        this.refd = refd;
        this.title = title;
        this.setThumbnail();
        this.setTitleUI();

        this.setButtonLinkUI();
    }
    init() {
        let fr = this;
        console.log(fr);
        this.fetchData().then(function () {
            fr.setThumbnail();
            fr.setTitleUI();
            fr.setButtonLinkUI();

        })
    }


}