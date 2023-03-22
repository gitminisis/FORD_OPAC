$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f3d18bec07d5460f8bbcc9920cd60539/thumbnail",
                refd: "AR-2001-94-208806.26.4.3",
                scope: undefined,
                title: "1994 Ford Mustang two-door"
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/fcfe49f855094f7dbeabf6db51dfe4a1/thumbnail",
                refd: "AR-2008-8.1.2.6455",
                scope: undefined,
                title: "1975 Ford Granada four-door CN9002-012"
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/09f8dbe6b1924ae2b816c3bb4476de10/thumbnail",
                refd: "AR-2008-8.1.2.9585",
                scope: undefined,
                title: "2000 Ford F-150 scenic neg CN331011-298",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1a6ed43430174e29b8e42414da9c0a9d/thumbnail",
                refd: "AR-2008-8.1.2.7237",
                scope: undefined,
                title: "1999 Ford Windstar SEL neg CN329010-103",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/39380b66872247908096273fc7587c34/thumbnail",
                refd: "AR-96-212010.7760",
                scope: undefined,
                title: "c 1991 Ford Ecostar Electric Van concept brochure",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/d4fdc9fec167453eb38c5dce38379cee/thumbnail",
                refd: "AR-2008-8.1.11.493",
                scope: undefined,
                title: "1975 Mercury Monarch with blurred scenic background Neg CN9010-103",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/932b3377c19b43ec9349df994884a5a9/thumbnail",
                refd: "AR-96-212010.3368",
                scope: undefined,
                title: "1977 Lincoln Continental Mark V brochure",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/3c7e8e46fb214808bde6a6c70df461ce/thumbnail",
                refd: "AR-2008-8.1.1.1184",
                scope: undefined,
                title: "1999 Lincoln Navigator neg CN329024-123",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/53c270faa5f54bf5abbfc9034d8e9ee4/thumbnail",
                refd: "AR-96-212010.3768",
                scope: undefined,
                title: "2011 Ford Edge brochure",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b7ee9429ec56460ebad91345907cc8b0/thumbnail",
                refd: "AR-2001-94-208806.25.1.2",
                scope: undefined,
                title: "1993 Ford Probe two-door",
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