$(document).ready(function () {
  let imageTest = '<div class="hidden_fields" hidden=""> <span class="a_media_type">Textual</span><span class="a_media_low_res"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/access</span><span class="a_media_thumb"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/thumbnail</span> </div>'
  if (document.getElementById("detail")) {
    // $('body').append(imageTest)
    const detail = new Detail();
    detail.init();

    $('#copy-link').on('click', function () {
      let sisn = $('#hidden_sisn_detail').text();
      let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL?sessionsearch&exp=sisn ${sisn}`
      copyToClipboard(url);
    })
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
  }

  setButtonLinkUI() {
    let { dom, refd } = this;
    dom.on('click', function () {
      let url = getRecordPermalink(refd, 'FORD_DETAIL');
      window.open(url, '_blank')
    })
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
  }

  initLightgallery(multi = true) {
    if (multi) {
      lightGallery(document.querySelector('.slides'));
    }
    else {
      lightGallery(document.getElementById('detail_media'), {
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
    $(".detailColor ").each(function (e) {
      new Tooltip($(this), $(this).next().text()).init()
    });
  }
  initDownloadSection() {
    const downloader = new MediaDownloader();
    let detail = this;

    let downloadSectionDOM = $("#download-section");
    let { assets } = this;
    if (assets.length === 0) {
      return;

    }
    else {
      let URLarray = assets.map(e => e.mediaLowRes);
      downloader.initAssetBlobArray(URLarray)
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      if (mediaType === 'Image') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Image <span class="material-icons items-center"> download </span> </button>')


      }
      if (mediaType === 'Textual') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> PDF <span class="material-icons items-center"> download </span> </button><a id="requestPDF" class="cursor-pointer">I need an accessible PDF</a>')
        let requestModal = new PDFRequest();
        $("#requestPDF").on('click', function () {
          requestModal.openModal();
        })

      }
      if (mediaType === 'Moving Image') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Moving Image <span class="material-icons items-center"> download </span> </button>')


      }
      if (mediaType === 'Audio') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Audio <span class="material-icons items-center"> download </span> </button>')


      }
      this.setDownloadButtonHandler(downloader);
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
      if (mediaType === 'Image') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /> </div>`)
        detail.initLightgallery(false);
      }
      else if (mediaType === 'Textual') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><a target="_blank" href=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /></a> </div>`)
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
      subjects.push($(this).find('a').text());
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
        let url = getSummaryXMLURL(`SUBJECT "${mainSubject}"`);
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
          let randomRecords = randomSlice(JSONObj.item, numberOfRecords).map(e => e.item_refd)
          randomRecords.map((e, i) => new AlsoLike(e, $('.alsoLike').eq(i)).init())

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
  init() {

    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initColorTooltip()
    this.initDetailAssets();
    this.setMediaView();
    this.initDownloadSection();
    this.setDefaultSubjectSearchReport();
    this.initAlsoLikeRecords();
    new PDFRequest().init();
  }
}


