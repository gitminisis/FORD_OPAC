$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/83c68990d30e4bd38011b9eb5fb4a750/thumbnail",
                refd: "AR-2000-213654.143.119.2",
                scope: undefined,
                title: "1975 Ford Cortina MK III GT 2.0 in scenic field with trees"
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/bc888afcc6774994892d96c7ce457bf5/thumbnail",
                refd: "AR-2000-213654.112.88.4",
                scope: undefined,
                title: "1967 Ford Transit Mark I 17 Counterweight LCX Van in studio front view"
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/68fa30efb4e54bee8bc670ae58badac6/thumbnail",
                refd: "AR-2000-213654.111.44.1",
                scope: undefined,
                title: "1970 Escort Mexico Mark I night shot in studio",
            }
        ]
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/888e911de81542e5b9f8975fc74fa46d/thumbnail",
                refd: "AR-2000-213654.143.194.2",
                scope: undefined,
                title: "1954 Ford Prefect 100E front closeup with scenic trees",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/aead13857c4d4505a066f4fbd952ee50/thumbnail",
                refd: "AR-2008-8.1.2.5368",
                scope: undefined,
                title: "1960 Ford Anglia 105F two-door sedan in studio",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4b89cd330c0c4b179ad0e595d6449273/thumbnail",
                refd: "AR-2000-213654.127.60.6",
                scope: undefined,
                title: "1982 Ford Escort Mark III RS 1600i on scenic road with sunset",
            },
            {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ab3dd07cb7a2463f8b19b6697bdaf8c4/thumbnail",
                refd: "AR-2000-213654.110.23.3",
                scope: undefined,
                title: "1987 Ford Fiesta Mark II XR2 in front of scenic brick house",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f67d0662d1a943d8a85e820999edb8c5/thumbnail",
                refd: "AR-2000-213654.144.153.15",
                scope: undefined,
                title: "2001 Ford Focus RS Mark I in front of scenic building",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/6922009a23aa4a8d94d8d26dd4fbb366/thumbnail",
                refd: "AR-2008-8.1.2.5546",
                scope: undefined,
                title: "1953 Ford Prefect 100E four-door at Stock neg",
            }, {
                mediaThumb: "https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/28383ea8c97f4114b9e14c189488313c/thumbnail",
                refd: "AR-2000-213654.112.69.1",
                scope: undefined,
                title: "1964 Ford Transit Mark I 15 Counterweight Van 400 E in studio with red backdrop",
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