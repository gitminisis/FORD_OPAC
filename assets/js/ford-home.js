$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/9d0507cf6150430eaf1ad2ac780cf6c2/thumbnail",
                refd: "AR-2008-8.1.13.410",
                scope: undefined,
                title: "2003 Ford Model U concept car interior CN335041-337"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/2bd63756fcb641d4b4de5a01e24db660/thumbnail",
                refd: "AR-96-212010.6880",
                scope: undefined,
                title: "c 1960 Levacar concept brochure AR-2004-72-12262"
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/c9219a4a89fb4ccd8b0b7ae49f614f23/thumbnail",
                refd: "AR-2008-8.1.11.2008",
                scope: undefined,
                title: "1962 Ford Mustang I concept on scenic road neg CN2042-1",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1418ed4f0f2e46efa6ff0b1c832e3d54/thumbnail",
                refd: "AR-2008-8.1.7.504",
                scope: undefined,
                title: "2007 Ford Airstream concept neg CN336950-041",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ea9ac9e15942454caf45ea78787522c9/thumbnail",
                scope: undefined,
                title: "1965 Ford Cougar II concept on scenic road neg CN4228-008",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/d0fa37a8f4804ac2a3f8f292db4f2669/thumbnail",
                refd: "AR-2008-8.1.11.2231",
                scope: undefined,
                title: "1955 Ford Mystere concept with scenic trees neg C612-1dw",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/396d21b33f44451eba84c012461b12b1/thumbnail",
                refd: "AR-2008-8.1.13.305",
                scope: undefined,
                title: "1958 Ford Nucleon concept in studio neg CN4032-008a",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/c54d61181f5b433aabfc757985755c3d/thumbnail",
                refd: "AR-2008-8.1.13.295",
                scope: undefined,
                title: "1995 Ford GT90 Side Profile CN315025-25",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4647e2e01f0540418a9046f61b1b487b/thumbnail",
                refd: "AR-2008-8.1.13.348",
                scope: undefined,
                title: "1970 Ford Maverick Estate concept car passenger side neg CN6006-106",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1ebbd7d0424b43e585f7ea1a52872361/thumbnail",
                refd: "AR-2008-8.1.11.1629",
                scope: undefined,
                title: "c 1955 Ford Volante concept in studio neg CN5023-001",
            },
        ]
        TRENDING_NOW_RECORD.map((e, i) => new TrendingNow(e, $('.trendingNow').eq(i)).initUIManual(e))

        $('.bg-homeInnovation').on('click', function () {
            let refd = 'AR-2008-8.1.1.3395';
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