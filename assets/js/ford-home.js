$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/8b5030fbf843487b81bf64a5c5ac12fb/thumbnail",
                refd: "AR-2008-8.1.11.3087",
                scope: undefined,
                title: "1962 Ford Seattle-ite XXI concept in studio with open door CN1124-6"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f4db8bbbb11c4a3db12cc67cbe4b5948/thumbnail",
                refd: "AR-88-108165.437.37",
                scope: undefined,
                title: "The Seattle-ite XXI was Displayed at the Seattle World Fair"
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/af64655573434213b011995ab3145d46/thumbnail",
                refd: "AR-2008-8.1.11.3088",
                scope: undefined,
                title: "1962 Ford Seattle-ite XXI concept rear view with open door in studio CN1124-7",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/dd9435581bb640e2a9acab47106f0733/thumbnail",
                refd: "AR-2008-8.1.4.5602",
                scope: undefined,
                title: "1966 Ford Fairlane GT-X two-door hardtop concept car neg CN3802-156",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/6600704c9abd4b598d67cb8fafe9dad8/thumbnail",
                refd:"AR-2008-8.1.11.1639",
                scope: undefined,
                title: "1960 Ford Typhoon II (Goliath) tractor concept model Side View neg 145786-13.jpg",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a51683d439ed44088fc070fb693e5663/thumbnail",
                refd: "AR-2008-8.1.8.1377",
                scope: undefined,
                title: "2002 Ford FR-100 concept truck neg 002 AR-2001-213703",
            },
           {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a1e2f7837afd4f1495eee6a439775dd6/thumbnail",
                refd: "AR-2008-8.1.11.2567",
                scope: undefined,
                title: "1969 Mercury Cougar El Gato concept car Side View with Mountains in Background neg  CN5865-8",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4b389d16319f4df9a4545f591822a16e/thumbnail",
                refd: "AR-2008-8.1.11.2576",
                scope: undefined,
                title: "1969 Mercury Montego Super Spoiler concept car Overhead View with Top Down neg CN5644-2",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ca92efed9f4447dcbaeb5d5132132159/thumbnail",
                refd: "AR-2008-8.1.11.1629",
                scope: undefined,
                title: "1979 Ford Mustang IMSA concept car driver side neg CN25593-4",
            },{
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5cfc02f475d84e0cb1ce771007e12f64/thumbnail",
                refd: "AR-2008-8.1.13.903",
                scope: undefined,
                title: "1954 Lincoln Capri Huntsman convertible concept passenger side profile neg C879-3",
            }
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