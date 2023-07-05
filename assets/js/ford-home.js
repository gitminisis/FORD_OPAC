$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ccb27c69697b441bbbac1d3e74283bf8/thumbnail",
                refd: "AR-2008-8.1.2.550",
                scope: undefined,
                title: "1940 Ford Soybean Plant at Rouge exterior neg C72 "
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f8b0090dfd2543cca0528e47dc9975a6/thumbnail",
                refd: "AR-2008-8.1.10.7939",
                scope: undefined,
                title: "1952 Ford La Boca Assembly Plant neg 75E85"
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/8c3ef82fc1b744d9bd668ff0e110ac30/thumbnail",
                refd: "AR-2008-8.1.10.8001",
                scope: undefined,
                title: "2003 Ford Focus in road simulator at Dunton Research and Engineering Center",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/7d41086473994122bc61d4da73ccb229/thumbnail",
                refd: "AR-2008-8.1.3.54",
                scope: undefined,
                title: "1956 Ford World Headquarters at night neg C793",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5f69065af00f46169c57d27a924ba2d4/thumbnail",
                refd: "AR-2000-213654.81.39.23",
                scope: undefined,
                title: "1972 Ford Dagenham Assembly Plant vehicles during paint process CN UK 1972-595-0056",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/77cc6f47bdd94afd9c95b43df024a2e2/thumbnail",
                refd: "AR-2008-8.1.2.1682",
                scope: undefined,
                title: "1925 Ford Airport blimp mooring mast and airplane neg 45006",
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e15baf3fe300471a9987a59a44f80abb/thumbnail",
                refd: "AR-2008-8.1.10.8002",
                scope: undefined,
                title: "2003 Ford Cologne Body and Assembly Plant machine timelapse neg CN336043-006",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/390b51e99f0744fa9ce151432bc5b695/thumbnail",
                refd: "AR-2008-8.1.10.8061",
                scope: undefined,
                title: "2009 Completed Ford Taurus at Chicago Assembly Plant",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/67c1c856cbc2474693c8d5ec030bdf1e/thumbnail",
                refd: "AR-2008-8.1.1.3220",
                scope: undefined,
                title: "1953 Ford Rotunda Visitor Center interior neg C669-4",
            }, {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b6d098a3c6d34eb3ba47749f0e8bf5ff/thumbnail",
                refd: "AR-2008-8.1.2.1162",
                scope: undefined,
                title: "1961 Ford Rouge Complex exterior neg C1049-4",
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