$(document).ready(function () {

    if (document.getElementsByClassName('home').length !== 0) {
        // const LATEST_ARCHIVE_REFD = ['AR-96-212010.5423', 'AR-2008-8.1.4.555', 'AR-2008-8.1.2.2049'];
        const LATEST_ARCHIVE_RECORD = [
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/963f4862d54647c0a66f65f595338ec6/t",
                refd: "AR-2026-4.28",
                scope: undefined,
                title: "From the Vault: Ford and Carhartt collaboration exhibit and Super Duty Truck reveal",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/dd3151ed844d43cdac12c6b314ef3d45/thumbnail",
                refd: "AR-2026-4.25",
                scope: undefined,
                title: "From the Vault: Henry Ford's cash vault",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e179b9624bfc40eba7a78664f9b22c7d/thumbnail",
                refd: "AR-2026-4.18",
                scope: undefined,
                title: "From the Vault: 1901 Missing crystal bowl trophy",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/0b80b72ed27e4b98b78623aa5c61a987/thumbnail",
                refd: "AR-96-212010.5589",
                scope: undefined,
                title: "2007 Ford Racing Performance Parts brochure",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/7b04dced41654a3b9fdf8b767e0c1880/thumbnail",
                refd: "AR-2023-19.5.2088",
                scope: undefined,
                title: "2019 Mount Panorama Motor Racing Circuit brochure FAP-2011-12",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/09d59fecb137433f9c9672681d0c117d/thumbnail",
                refd: "AR-2008-8.1.11.263",
                scope: undefined,
                title: "1979 Mercury Capri RS turbocharged with Racing Stripes in studio neg CN26014-36",
            },
        ];




        LATEST_ARCHIVE_RECORD.map((e, i) => new LatestArchive(e, $('.latestArchive').eq(i)).initUIManual(e))

        const TRENDING_NOW_REFD = ['AR-65-90.1249.7', 'AR-2008-8.1.2.2447', 'AR-96-212010.5443', 'AR-2008-8.1.2.4143', 'AR-2008-8.1.7.257', 'AR-96-212010.6325', 'AR-96-212010.5592'];
        const TRENDING_NOW_RECORD = [
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/cc99b4d631bc4aa8aa2bef0bf575af09/thumbnail",
                refd: "AR-65-90.1054.1.542",
                scope: undefined,
                title: "Ford Times July 1973 (USA)",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/85d18bdf2aac4c0b8aa543b58bc56634/thumbnail",
                refd: "AR-2008-8.1.4.488",
                scope: undefined,
                title: "1954 Ford F-100 pickup truck neg 103447-001",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/5ec1ccab74564dfeb3a56500bfc1f1e9/thumbnail",
                refd: "AR-65-90.1054.1.584",
                scope: undefined,
                title: "Ford Times June 1965 (USA)",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/842fee0984994bdaa3e9677c4016de2e/thumbnail",
                refd: "AR-2008-8.1.4.272",
                scope: undefined,
                title: "1927 Ford Model T Touring Car neg 47365",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/abe64f1ec0eb4be38e350c085ed38423/thumbnail",
                refd: "AR-65-90.1054.1.514",
                scope: undefined,
                title: "Ford Times July 1944 (USA)",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/c0efd232d3674196aee540f1739a6bc0/thumbnail",
                refd: "AR-96-212010.4058",
                scope: undefined,
                title: "1973 Ford American Road Camper brochure",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/ebad206e0c9f42819a3b203d442f8b73/thumbnail",
                refd: "AR-2008-8.1.7.244",
                scope: undefined,
                title: "1973 Ford Bronco Wagon neg CN6610-184",
            },
        ];

        const HomeVideoCarousel = [
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/963f4862d54647c0a66f65f595338ec6/t",
                refd: "AR-2026-4.28",
                scope: undefined,
                title: "From the Vault: Ford and Carhartt collaboration exhibit and Super Duty Truck reveal",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/dd3151ed844d43cdac12c6b314ef3d45/thumbnail",
                refd: "AR-2026-4.25",
                scope: undefined,
                title: "From the Vault: Henry Ford's cash vault",
            },
            {
                mediaThumb:
                    "https://fordheritagevaultmedia.com/api/links/c29a9048c4864d89915b29f4f39330e4/uuid/e179b9624bfc40eba7a78664f9b22c7d/thumbnail",
                refd: "AR-2026-4.18",
                scope: undefined,
                title: "From the Vault: 1901 Missing crystal bowl trophy",
            },
        ];


        $(function () {
            // Detect if media is GIF or MP4
            const renderMedia = (url) => {
                return `<img src="${url}" class="vault-media w-full" />`;
            };

            $("#home-video-carousel .embla__container").append(
                HomeVideoCarousel.map(item => `
      <div class="embla__slide flex flex-col items-center">
        ${renderMedia(item.mediaThumb)}
        <h3 class="text-[20px] sm:text-[24px] text-[#243C5A] font-medium leading-[32px] text-center mt-[12px]">
          <a href="scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=REFD ${item.refd}"
             class="hover:underline hover:text-[#1a2d46] transition-colors duration-200">
            ${item.title}
          </a>
        </h3>
      </div>
    `).join("")
            );

            // Initialize Embla
            const emblaNode = document.querySelector("#home-video-carousel");
            const viewportNode = emblaNode.querySelector(".embla__viewport");
            const prevBtn = emblaNode.querySelector(".embla__prev");
            const nextBtn = emblaNode.querySelector(".embla__next");

            const embla = EmblaCarousel(viewportNode, {
                loop: true,
                skipSnaps: false
            });

            prevBtn.addEventListener("click", embla.scrollPrev);
            nextBtn.addEventListener("click", embla.scrollNext);

            // Pause videos except first
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