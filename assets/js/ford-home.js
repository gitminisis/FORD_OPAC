$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/8bf77645598c41f69cd25034f1c3ccc8/thumbnail",
                refd: "AR-2008-8.1.2.1262",
                scope: undefined,
                title: "2009 Ford Mustang sales data shows most popular vehicle colors and options MS0084"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a5a2e89ee92946b38e519dacbbcdb87d/thumbnail",
                refd: "AR-2008-8.1.2.6074",
                scope: undefined,
                title: "2019 Ford F-150 Raptor in desert 3U0A9902_C1"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/fad3a7477d194acc836d3beee53f2ecd/thumbnail",
                refd: "AR-2008-8.1.10.8146",
                scope: undefined,
                title: "2020 Ford Transit in front of building MS"
            }
        ];


        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/59875c2df7584c4ab3065508c687ddf7/thumbnail",
                refd: "AR-74-18056.51.19",
                scope: undefined,
                title: "1993 Ford Ranger 4X4 AR-2002-210286"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/9d8d37245f6c42fb9504f5c06492b392/thumbnail",
                refd: "AR-2023-19.7.234",
                scope: undefined,
                title: "Ford Times April 1916 (CAN) FAP-2011-8"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/1746984653df47b590c4d74b28684145/thumbnail",
                refd: "AR-2008-8.1.10.6843",
                scope: undefined,
                title: "c 1971 Ford Transit Mark I under bridge"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5038aa3eccf74b03bf51814e99bfc1ba/thumbnail",
                refd: "AR-2008-8.1.4.1609",
                scope: undefined,
                title: "2012 Ford Mustang Cobra Jet neg CN339101-044"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/7949905e131641a99ea2cfe5e45a024d/thumbnail",
                refd: "AR-74-18056.43.2166",
                scope: undefined,
                title: "1983 Ford Ranger; design information, updates and options"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/466e473a98b64f448b3eb41d48080aef/thumbnail",
                refd: "AR-65-90.1054.1.93",
                scope: undefined,
                title: "Ford Times August 1971 (USA)"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/440e3677d083463c83103f76e7f47285/thumbnail",
                refd: "AR-65-90.1054.1.47",
                scope: undefined,
                title: "Ford Times April 1975 (USA)"
            }
        ];
        const HomeVideoCarousel = [
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/414bd7ff2d004262acad5e9cf3fe64fc/orig",
                refd: "AR-2005-2.22.1",
                title: "The fuel tank indicator suggested by Jim Moylan"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/a9ff11ade98d41abb25d4f7b07ab1185/orig",
                refd: "AR-2005-2.22.2",
                title: "The Ford Times"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/75c7fb9dfff34453a7f4a07395883b65/orig",
                refd: "AR-2005-2.22.3",
                title: "1964 World's Fair Magic Skyway Ride and the Introduction of the Mustang"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/fc5f2c4439a944f8b182e052be4e4800/orig",
                refd: "AR-2005-2.22.4",
                title: "Ford Motor Company and Veterans"
            },
            {
                mediaThumb: "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/beb4a9ebb5134b249cdc4651fec97d0f/orig",
                refd: "AR-2005-2.22.5",
                title: "International Lego Day, Lego Ford GT"
            }
        ];


        $(function () {
            $("#home-video-carousel .embla__container").append(
                HomeVideoCarousel.map(item => `
        <div class="embla__slide flex flex-col items-center">
          ${`<video class="vault-media" autoplay muted loop playsinline preload="metadata">
                   <source src="${item.mediaThumb}" type="video/mp4" />
                 </video>`

                    }
          <h3 class="text-[20px] sm:text-[24px] text-[#243C5A] font-medium leading-[32px] text-center mt-[12px]">
            <a href="scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD ${item.refd}"
               class="hover:underline hover:text-[#1a2d46] transition-colors duration-200">
              ${item.title}
            </a>
          </h3>
        </div>
      `).join("")
            );

            // Optional: pause all videos except the first one
            const $videos = $("#home-video-carousel video");
            $videos.each((i, v) => {
                if (i > 0) v.pause();
            });
        });



        const swiperSlideTemplate = function (thumbnail, title, url) {
            return `
            <div  class="hover-slide w-[190px] h-[260px] ">
            <article class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg trendingNow h-full w-full" >
              <img
                alt="${title}-thumbnail"
                src="${thumbnail}"
                class="absolute inset-0 w-full object-contain"
              />
            
              <div class="absolute bottom-0  pt-32  w-full">
                <div class="p-4 sm:p-6 bg-[#00142E]">
            
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
                translateFactor = index - currentHover < 0 ? 0 - translateFactor : translateFactor


                let opacity = 1 - Math.abs(index - currentHover) / 20
                $(this).css('z-index', MAX_Z_INDEX - Math.abs(index - currentHover));
                $(this).css('opacity', opacity);
                $(this).on('click', function () {
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