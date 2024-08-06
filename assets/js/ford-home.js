$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/84e5b3f79d8e464b8f1b4cd7d7a76db8/thumbnail",
                refd: "AR-2008-8.1.7.187",
                scope: undefined,
                title: "1967 Bronco T67-504"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/227388ece4004a03b6ccc77c5ff479c0/thumbnail",
                refd: "AR-96-212010.5196",
                scope: undefined,
                title: "1976 Ford Bronco brochure"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/b836fcb77b9b4fa78d5037e904afa76d/thumbnail",
                refd: "AR-2008-8.1.7.245",
                scope: undefined,
                title: "1973 Ford Bronco Wagon neg CN6610-302"
            }
        ]

        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/73be4b69797c466d9c0569e28afb9508/thumbnail",
                refd: "AR-2019-22.18.207",
                scope: undefined,
                title: "Ford Times March-April 1949 (UK)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5fb2dcc287be4617ba4fbe117179c851/thumbnail",
                refd: "AR-65-90.1174.1.17",
                scope: undefined,
                title: "Lincoln-Mercury Times: May-June 1950"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/4bc4726b99274af1b32ffc490238117c/thumbnail",
                refd: "AR-65-90.1054.1.540",
                scope: undefined,
                title: "Ford Times July 1971 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/73cec45c516b4d618297bbeb6ac5e7fc/thumbnail",
                refd: "AR-65-90.1054.1.518",
                scope: undefined,
                title: "Ford Times July 1949 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f25a67e0f20746cba18b5f1e0ddc120e/thumbnail",
                refd: "AR-2019-22.18.242",
                scope: undefined,
                title: "Ford Times January-February 1962 (UK)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/f29a7737a49346729cb4c419ca6e72f0/thumbnail",
                refd: "AR-65-90.1174.1.33",
                scope: undefined,
                title: "Lincoln-Mercury Times: September-October 1956"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/691993f853a343d19b2852dd94362115/thumbnail",
                refd: "AR-2019-22.18.217",
                scope: undefined,
                title: "Ford Times November-December 1956 (UK)"
            }
        ]

        const swiperSlideTemplate = function (thumbnail, title, url) {
            return `
            <div  class="hover-slide w-[190px] h-[260px]">
            <article class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg trendingNow h-full w-full" >
              <img
                alt="${title}-thumbnail"
                src="${thumbnail}"
                class="absolute inset-0 w-full object-contain"
              />
            
              <div class="absolute bottom-0  pt-32  w-full">
                <div class="p-4 sm:p-6 bg-[rgba(0,0,0,0.5)]">
            
                  <a class="font-bold text-white text-lg trendingNowLink" href="${url}" >
                    <h3 class="mt-0.5  text-white trendingNowTitle">${title}</h3>
                  </a>
            
                </div>
              </div>
            </article>
          </div>
          `
        }

        let currentHover = 3;
        const MAX_Z_INDEX = 10;
        TRENDING_NOW_RECORD.map((e, i) => {
            const url = getRecordPermalink(e.refd, 'FORD_DETAIL');
            const swiperItem = swiperSlideTemplate(e.mediaThumb, e.title, url)
            $('.slide-wrapper').append(swiperItem)
        })

        
        function setSlidePosition() {
            $('.hover-slide').each(function (index) {
                var scaleFactor = scale[Math.abs(index - currentHover)]
                var translateFactor = -1 * width * (1 - scaleFactor);
                translateFactor = index - currentHover < 0 ? 0 - translateFactor: translateFactor
            

                let opacity = 1- Math.abs(index - currentHover) / 20
                $(this).css('z-index', MAX_Z_INDEX - Math.abs(index - currentHover));
                $(this).css('opacity',opacity);
                $(this).on('click', function() {
                    window.location.href = `${BASE_URL}/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD%20${TRENDING_NOW_RECORD[index].refd}`
                })

                // Calculate the translate factor based on the distance from the hovered element

                // Apply the scale and translate transformations
                $(this).css('transform', 'scale3d(' + scaleFactor + ', ' + scaleFactor + ', 1) translate3d(' + translateFactor + 'px, 0, 0)');
            });

        }

        const width = 250;
        const scale = [1, 0.92, 0.86, 0.82, 0.78, 0.75, 0.73]
        $(".hover-slide").on("mouseover", function () {
            currentHover = $(this).index();

            setSlidePosition()
        });

        setSlidePosition()




     

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


