$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4db99c8162d04ef281162369bfc4b4e7/thumbnail",
                refd: "AR-2001-86-102180.1.4.2",
                scope: undefined,
                title: "1982 Ford F-100 F-250 F-350"
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/8daa0015379a49658361f46047e87c2b/thumbnail",
                refd: "AR-96-212010.5592",
                scope: undefined,
                title: "1948 Ford F-Series Trucks brochure"
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/bb4a67f0057f4fae8652076e758673e8/thumbnail",
                refd: "AR-2008-8.1.4.453",
                scope: undefined,
                title: "1951 Ford F-1 on Dearborn Test Track neg C364-1",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/0d0f58bc192a44c08702f9475bb1c4e9/thumbnail",
                refd: "AR-2008-8.1.4.670",
                scope: undefined,
                title: "1978 Ford F-150 Ranger pickup truck neg CN19511-321",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b547cfbbfae44265813af0188e5d77cb/thumbnail",
                refd: "AR-2008-8.1.4.764",
                scope: undefined,
                title: "1994 Ford F150 XLT flareside neg CN309007-363",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b41bff725e3545abb2d7c7bc2b488e23/thumbnail",
                refd: "AR-2008-8.1.4.566",
                scope: undefined,
                title: "1961 Ford F-100 Styleside pickup truck neg C1048-16",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/d0a0bef1ad1d4d9889055a50ff5d0ce0/thumbnail",
                refd: "AR-2008-8.1.4.549",
                scope: undefined,
                title: "1959 Ford F-100 Styleside pickup truck neg C909-0",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/91b8d40d47d54b39a5892adb660a324b/thumbnail",
                refd: "AR-2008-8.1.4.576",
                scope: undefined,
                title: "1963 Ford F-250 4x4 pickup truck neg C1092-007",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4ffb5c5b0466424f98b7171ce5abb2a3/thumbnail",
                refd: "AR-2008-8.1.4.555",
                scope: undefined,
                title: "1960 Ford F-100 Custom Cab pickup truck front neg C1007-003",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/0d2d067266a54ea0975aa73690d3585d/thumbnail",
                refd: "AR-2001-94-208806.23.7.1",
                scope: undefined,
                title: "1991 Ford F-150 F-250 F-350",
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