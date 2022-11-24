$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/6df1a07fac494427bb419be1bfc5cabb/thumbnail",
                refd: "AR-2008-8.1.11.280",
                scope: undefined,
                title: "1982 Mercury Capri RS with Sunroof"
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/96ee16a90a2c4c5388ea36fb1d458c52/thumbnail",
                refd: "AR-2008-8.1.11.458",
                scope: undefined,
                title: "1970 Mercury Cyclone GT Hardtop"
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/dd158e58113a428aa4e71c7c9691f1e8/thumbnail",
                refd: "AR-2008-8.1.11.944",
                scope: undefined,
                title: "1957 Mercury Monterey Convertible Low Angle",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a00f822647b24cc1956a2a371d6d3f71/thumbnail",
                refd: "AR-2008-8.1.4.3298",
                scope: undefined,
                title: "1971 Ford Mustang Mach 1 fastback",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e02169d73e294cb4810891b50b0e5aaa/thumbnail",
                refd: "AR-2008-8.1.4.3022",
                scope: undefined,
                title: "1991 Ford Mustang GT",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/c17c756c7d534dbe8a4fc1e3a9f0e676/thumbnail",
                refd: "AR-2008-8.34.90",
                scope: undefined,
                title: "1967 Mustang Shelby GT500",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/78564f6fefa2474694ecde7370b0eff2/thumbnail",
                refd: "AR-2008-8.1.2.2426",
                scope: undefined,
                title: "1965 Ford Mustang convertible",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/85696d4479624ad08ee2dfae90cc34f9/thumbnail",
                refd: "AR-2008-8.1.2.2491",
                scope: undefined,
                title: "1966 Ford Mustang convertible in Tahoe Turquiose",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/3c43612687e4478489ffc1001ff57cb5/thumbnail",
                refd: "AR-2008-8.1.2.2293",
                scope: undefined,
                title: "1968 Ford Mustang GT fastback",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b32e1f0ab59940858e777cd8123d6d90/thumbnail",
                refd: "AR-2008-8.1.2.2074",
                scope: undefined,
                title: "1969 Ford Mustang Boss 429",
            }
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