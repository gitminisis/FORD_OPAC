$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5d6a92a3be0e46a29be05e21b3069564/thumbnail",
                refd: "AR-2008-8.1.1.693",
                scope: undefined,
                title: "1956 Lincoln Continental Mark II"
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/fc55c64b08864fde82e97e7163565262/thumbnail",
                refd: "AR-65-90.1249.7",
                scope: undefined,
                title: "The Lincoln Salon Number"
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e7f537a9d8d34f319bfeb5bd5d9fafca/thumbnail",
                refd: "AR-2008-8.1.1.924",
                scope: undefined,
                title: "1961 Lincoln Continental coach doors Convertible",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ec2fc1e46de944099d03c52977791935/thumbnail",
                refd: "AR-2008-8.1.1.63",
                scope: undefined,
                title: "1935 Lincoln Brunn Convertible Sedan",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/8b9480a786434e0abbf41b427d338bf5/thumbnail",
                refd: "AR-2008-8.1.1.173",
                scope: undefined,
                title: "1946 Lincoln four door sedan",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/d5bd99cc9d0a4bb5927c496477ca9ee5/thumbnail",
                refd: "AR-2008-8.1.1.103",
                scope: undefined,
                title: "1939 Lincoln Zephyr Continental Cabriolet Special for Edsel Ford",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/9417d66bb8fa40ab9c6105dac9df0caa/thumbnail",
                refd: "AR-2008-8.1.1.401",
                scope: undefined,
                title: "1948 Lincoln Continental Cabriolet tudor V12 engine",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/d1983736a09a49ddac2c627839ebec3c/thumbnail",
                refd: "AR-2008-8.1.1.946",
                scope: undefined,
                title: "1962 Lincoln Continental coach door convertible",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/39b63e6e331d443c86fc327d1e77ab52/thumbnail",
                refd: "AR-2008-8.1.1.80",
                scope: undefined,
                title: "1937 Lincoln Brunn Convertible Victoria",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1c92223463574feba566c506131b60a5/thumbnail",
                refd: "AR-2008-8.1.1.719",
                scope: undefined,
                title: "1956 Lincoln Premiere four-door sedan",
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