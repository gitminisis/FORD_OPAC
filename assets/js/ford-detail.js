const isBookmarked = document.querySelectorAll('.isBookmarked').length !== 0;
$(document).ready(function () {
  let imageTest = '<div class="hidden_fields" hidden=""> <span class="a_media_type">Textual</span><span class="a_media_low_res"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/access</span><span class="a_media_thumb"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/thumbnail</span> </div>'

  if (document.getElementById("detail")) {
    setSiteTitleAndIcon("Detail Record - Hop in the Driver's Seat | Ford Heritage Vault")
    const detail = new Detail();
    detail.init();


  }
});
class MediaAsset {
  constructor(mediaType, mediaLowRes, mediaThumb) {
    this.mediaType = mediaType.trim().replace(/ /g, '').replace(/\n/g, '');
    this.mediaLowRes = mediaLowRes.trim().replace(/ /g, '').replace(/\n/g, '');
    this.mediaThumb = mediaThumb.trim().replace(/ /g, '').replace(/\n/g, '');
  }
}


class AlsoLike extends FeatureRecord {
  setTitleUI() {
    let { dom, title } = this;

    dom.find('.alsoLikeTitle').text(title)
  }



  setThumbnail() {
    let { dom, mediaThumb } = this;

    // dom.find('.latestArchiveThumb').removeClass('bg-black')
    dom.css('background-image', `url('${mediaThumb}')`)

    $('.alsoLike').hover(function () {
      $(this).find('.alsoLikeLink').css('color', 'white')
    }, function () {
      $(this).find('.alsoLikeLink').css('color', 'transparent')
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

    this.fetchData().then(function () {
      fr.setThumbnail();
      fr.setTitleUI();
      fr.setButtonLinkUI();

    })
  }
}
class Detail extends Report {
  constructor() {
    super();
    /**
     * Assets is an array of MediaType
     */
    this.assets = [];
    this.downloader = new MediaDownloader();
  }
  getReturnSummaryURL() {
    let hiddenURL = document.getElementById("hiddenReturnSummary");

    return hiddenURL ? removeWhiteSpace(hiddenURL.innerText.replace(/"/g, "")) : null;
  }

  setReturnSummaryURL() {
    let url = this.getReturnSummaryURL();
    if (url) {
      $("#returnSummary").attr("href", url);
    }
    else {
      $("#returnSummary").prev().empty();
      $("#returnSummary").empty();
    }

    $('.mobileSummaryReturn').on('click', function () {
      window.location = url;
    })
  }

  initLightgallery(multi = true) {
    if (multi) {
      lightGallery(document.querySelector('.slides'));
    }
    else {
      lightGallery(document.querySelector('#detail_media:not(.bookmark)'), {
        selector: '.item'
      });
    }

  }

  initCarousel(DOMPath) {
    let carousel = new Carousel(DOMPath);
    carousel.init()
  }

  /**
   *
   * This function convert HiddenField DOM object into
   * a json object, loop through it and push a new asset
   * to this.asset as a MediaAsset object
   * 
   * @memberof Detail
   */
  initDetailAssets() {
    let detail = this;
    let hiddenFields = document.querySelector('.hidden_fields')
    if (!hiddenFields) {
      return;
    }
    let x2js = new X2JS({
      arrayAccessFormPaths: [
        'jsonObj.span'
      ]
    });
    let jsonObj = x2js.xml2json(hiddenFields);
    for (let i = 0; i < jsonObj.span.length; i += 3) {
      let span = jsonObj.span;
      let mediaType = span[i].__text;
      let mediaLowRes = span[i + 1].__text;
      let mediaThumb = span[i + 2].__text;
      let mediaAsset = new MediaAsset(mediaType, mediaLowRes, mediaThumb);
      detail.assets.push(mediaAsset);

    }
  }
  initColorTooltip() {
    $(".detailColor").each(function (e) {
      new Tooltip($(this), $(this).next().text()).init()
    });
  }

  initColorClick() {
    $(".detailColor").on('click', function () {
      let url = $(this).parent().find('.colorDetailLink').find('a').attr('href') + '&REPORT=FORD_SUMMARY';
      window.location = url;
    })
  }
  initDownloadSection() {

    let detail = this;

    let downloadSectionDOM = $("#download-section");
    let { assets } = this;
    if (assets.length === 0) {
      return;

    }
    else {
      let URLarray = assets.map(e => e.mediaLowRes);
      this.downloader.initAssetBlobArray(URLarray)
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];

      let downloadSectionString = (type) => {
        return `<button id="download-detail-assets" class="flex loadingAssets basis-[100%]">Download ${type} <span class="material-icons items-center"> download </span> </button> <p id="copy-link" class="flex cursor-pointer basis-[100%]">Copy Link<span class="material-icons items-center"> share </span></p>${!isBookmarked ? '<p id="addBookmarkDetail" class="flex cursor-pointer">Add to Collection<span class="material-icons items-center"> shopping_bag </span></p>' : ''}`
      }
      if (mediaType === 'Image') {
        downloadSectionDOM.append(downloadSectionString('Image'))


      }
      if (mediaType === 'Textual') {
        downloadSectionDOM.append(downloadSectionString('Brochure'))
        let requestModal = new PDFRequest();
        $("#requestPDF").text('I need an accessible Brochure')
        $("#requestPDF").on('click', function () {
          requestModal.openModal();
        })

      }
      if (mediaType === 'Moving Image') {
        downloadSectionDOM.append(downloadSectionString('Moving Image'))


      }
      if (mediaType === 'Audio') {
        downloadSectionDOM.append(downloadSectionString('Audio'))


      }
      this.setDownloadButtonHandler(this.downloader);
      let sisn = $('#hidden_sisn_detail').text();
      $('#copy-link').on('click', function () {

        let url = `${BASE_URL}/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=sisn%20${sisn}`
        copyToClipboard(url);
      })

      $('#addBookmarkDetail').on('click', function () {
        detail.addBookmark(sisn);
      })
    }
  }

  setDownloadButtonHandler(downloader) {
    $('#download-detail-assets').on('click', function () {
      downloader.downloadBlobArray();
    })
  }
  setMediaView() {
    let { assets } = this;
    let detail = this;
    let detailMediaDOM = $('#detail_media');
    // If there are no assets for this record, do nothing
    if (assets.length === 0) {
      detailMediaDOM.addClass('bg-test')

    }
    // If there is only on asset
    else if (assets.length === 1) {
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      let imageBackgroundString = `
      <div class="h-[50vw] min-h-[270px] max-h-[350px] w-full record_thumbnail bg-contain bg-center bg-no-repeat "  style="background-image: url('${mediaThumb}');"> 
        <div class="w-full h-full text-right pt-[10px] pr-[20px] text-[rgb(0,0,0,0)] hover:text-[#F2F2F2] hover:bg-[rgb(0,0,0,0.4)] record_cover relative"> 
          <button class="absolute top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%] text-2xl item  p-[12px] " data-src=${mediaLowRes} src=${mediaThumb}>Click to open </button>

          ${!isBookmarked ? ' <button class="bookmarkRecord relative group"> <span class="material-icons"> shopping_bag </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Add to Collection</span> </div></button>' : '<button class="checkedRecord relative group"> <span class="material-icons"> done </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Added to Collection</span> </div></button>'}

          <button class="downloadRecord relative group"> <span class="material-icons"> download </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Download Asset</span> </div></button> 

          <button class="copyRecord relative group"> <span class="material-icons"> share </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Copy Link</span> </div></button> 
        </div> 
      </div>`;



      let imageSrcString = `<div ><div class="relative "><span class="imageThumbnail"><img class="h-[80%] mx-[auto] item "  data-src=${mediaLowRes} src=${mediaThumb} alt="Detail Record Image Thumbnail" /></span> 
      <div class="right-[0] absolute top-[0] text-right pt-[10px] text-[rgb(0,0,0,0)] hover:text-[#F2F2F2] hover:bg-[rgb(0,0,0,0.4)] record_cover"> <button class="bookmarkRecord relative group"> <span class="material-icons"> shopping_bag </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Add to Collection</span> </div></button> <button class="downloadRecord relative group"> <span class="material-icons"> download </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Download Asset</span> </div></button>  <button class="copyRecord relative group"> <span class="material-icons">  share  </span> <div class="absolute top-[10px]  flex-col items-center hidden mt-6 group-hover:flex"> <div class="w-3 h-3 -mb-2 rotate-45 bg-black tooltip"></div> <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Copy Link</span> </div></button></div>
      </div> </div>`
      if (mediaType === 'Image') {
        detailMediaDOM.append(imageBackgroundString)
        detail.initLightgallery(false);

      }
      else if (mediaType === 'Textual') {
        detailMediaDOM.append(imageBackgroundString)
        $('.item').on('click', function () {
          window.open(mediaLowRes, '_blank')
        })
      }
      else if (mediaType === 'Audio') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><a target="_blank" href=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /></a><div > <audio class="mx-[auto]"  controls> <source src="horse.ogg" type="audio/ogg"> <source src="horse.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio></div> </div>`)
      }
      else if (mediaType === 'Moving Image') {
        detailMediaDOM.append(`
      <video width="80%" class="mx-[auto]" controls>
        <source src=${mediaLowRes} type="video/mp4">
        <source src=${mediaLowRes} type="video/ogg">
        Your browser does not support HTML video.
      </video>
      `)

      }

      /**
       * Download/Bookmark/Copy handler section
       */

      let sisn = $('#hidden_sisn_detail').text();
      $('.copyRecord').on('click', function () {

        let url = `${BASE_URL}/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=sisn%20${sisn}`
        copyToClipboard(url);
      })

      $('.bookmarkRecord').on('click', function () {
        detail.addBookmark(sisn);
      })
      $('.downloadRecord').on('click', function () {
        detail.downloader.downloadBlobArray();
      })

    }
    else {
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      if (mediaType === 'Image') {
        detailMediaDOM.append(`<div class="carousel h-[300px] sm:h-[400px] w-full sm:w-[50%]"><div class="slides">`)
        assets.map((asset, index) => {
          let { mediaType, mediaLowRes, mediaThumb } = asset;
          detailMediaDOM.find('.slides').append(`<img src=${mediaThumb} alt="slide image" class="slide item" data-src=${mediaLowRes} />`)
        })
        detailMediaDOM.find('.carousel').append(`<div class="controls"> <div class="control prev-slide">&#9668;</div> <div class="control next-slide">&#9658;</div> </div> `)
        detail.initLightgallery();
        detail.initCarousel('.slides')





      }
    }

  }

  getRecordSubject() {
    let subjects = []
    $('.detailSubject').each(function () {
      subjects.push($(this).find('a').text().replace(/\n/g, ' '));
    })
    return subjects;
  }
  fetchSubjectRecords(url) {
    return fetch(url).then(function (response) { return response.text() }).then(y => {
      return y;
      // let dom = new DOMParser().parseFromString(y, 'text/html')
      // let reportDOM = dom.querySelector('report');

      // let x2js = new X2JS(x2jsArray)
      // let JSONObj = x2js.xml2json(reportDOM);

      // let { item } = JSONObj;
      // this.title = item.item_title;
      // this.refd = item.item_refd;
      // this.scope = item.item_scope;
      // this.mediaThumb = item.item_thumb;
    });
  }
  initAlsoLikeRecords() {
    let subjects = this.getRecordSubject();
    let detail = this;
    const numberOfRecords = 7;

    try {
      if (subjects.length > 0) {
        let mainSubject = subjects[0];
        let url = getSummaryXMLURL(`SUBJECT "${mainSubject}"`, "FORD_SUMMARY_XML", "DESCRIPTION_OPAC4");
        detail.fetchSubjectRecords(url).then(res => {
          let dom = new DOMParser().parseFromString(res, 'text/html')
          let reportDOM = dom.querySelector('report');

          let x2js = new X2JS({
            arrayAccessFormPaths: [
              'report.item'
              , 'report.item.div.span'
            ]
          })
          let JSONObj = x2js.xml2json(reportDOM);
          console.log(JSONObj)
          let records = JSONObj.item.map(e=>{
            return {
              mediaThumb:e.item_thumb,
              refd:e.item_refd,
              title:e.item_title
            }
          })
  
          records.map((e, i) => new AlsoLike(e, $('.alsoLike').eq(i)).initUIManual(e))

        })

      }
    } catch (error) {

    }
  }
  setDefaultSubjectSearchReport(report = 'FORD_SUMMARY') {
    $('.detailSubject').each(function () {
      let href = $(this).find('a').attr('href')
      $(this).find('a').attr('href', `${href}&REPORT=${report}`)
    })
  }

  setDefaultYearSearchReport(report = 'FORD_SUMMARY') {
    $('.detailYear').each(function () {
      let href = $(this).find('a').attr('href')
      $(this).find('a').attr('href', `${href}&REPORT=${report}`)
    })
  }

  initRecordNavigation() {
    let prev = document.querySelector('#prevRecord a')
    let next = document.querySelector('#nextRecord a')
    if (prev) {
      let prev_link = removeWhiteSpace(prev.getAttribute('href'));
      $('#detailRecordNavigation').append(`
      <div class="flex">
        <a href=${prev_link} class="flex"><span class="material-icons items-center"> arrow_back_ios </span>Prev</a>
      </div>`)
    }
    else {
      $("#detailRecordNavigation").removeClass('justify-between').addClass('justify-end')
    }

    if (next) {
      let next_link = removeWhiteSpace(next.getAttribute('href'));
      $('#detailRecordNavigation').append(`
      <div class="flex">
        <a href=${next_link} class="flex">Next<span class="material-icons items-center"> arrow_forward_ios </span></a>
      </div>`)
    }
  }
  init() {

    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initColorTooltip()
    this.initColorClick();
    this.initDetailAssets();
    this.setMediaView();
    this.initDownloadSection();
    this.setDefaultSubjectSearchReport();
    this.setDefaultYearSearchReport();
    this.initAlsoLikeRecords();
    this.initRecordNavigation();
    new PDFRequest().init();
  }
}


