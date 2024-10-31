$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ce012d855f324300afe1cfa4467f1668/thumbnail",
                refd: "AR-65-90.1054.13",
                scope: undefined,
                title: "Ford Times: Fly Drive Vacations"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/764def94ca474f3e9c4433192593dc2a/thumbnail",
                refd: "AR-65-90.1054.11",
                scope: undefined,
                title: "The Ford Times Traveler's Cookbook"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e27e7b3a4ea14b9595cfd366b002aa40/thumbnail",
                refd: "AR-65-90.1054.1.378",
                scope: undefined,
                title: "Ford Times November 1959 (USA)"
            }
        ]
        
        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e94328bbcc06499c871896b6e15a6a19/thumbnail",
                refd: "AR-65-90.1054.1.707",
                scope: undefined,
                title: "Ford Times November 1991 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ba417194c86642a4a61365a55dd74f3e/thumbnail",
                refd: "AR-65-90.1054.24",
                scope: undefined,
                title: "The Ford Times Guide to Travel in USA"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/90450be971844a35a841731582eb2534/thumbnail",
                refd: "AR-65-90.1054.1.758",
                scope: undefined,
                title: "Ford Times March 1984 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1efec9f6f8e14b16980c805a340b47a4/thumbnail",
                refd: "AR-65-90.1054.1.751",
                scope: undefined,
                title: "Ford Times June 1982 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/669e8579e58d452bbebff5e896243577/thumbnail",
                refd: "AR-65-90.1054.1.743",
                scope: undefined,
                title: "Ford Times January 1984 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a4b057b2cad74b9c8fc1b3241dd476bf/thumbnail",
                refd: "AR-65-90.1054.1.675",
                scope: undefined,
                title: "Ford Times January 1990 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/50db59eedbd947ddbd1e6e8fb974b9fc/thumbnail",
                refd: "AR-65-90.1054.9",
                scope: undefined,
                title: "The New Ford Treasury of Favorite Recipes from Famous Restaurants"
            }
        ];
        
        
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