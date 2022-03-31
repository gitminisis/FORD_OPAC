$(document).ready(function () {
  let imageTest = '<div class="hidden_fields" hidden=""> <span class="a_media_type">Video</span><span class="a_media_low_res"> https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/5db8171ec16f424e9a30ee2d562a59e5/access</span><span class="a_media_thumb">https://titanapi.minisisinc.com/api/links/515fdd13553d4f37a82b97836f989ae4/uuid/5db8171ec16f424e9a30ee2d562a59e5/thumbnail</span> </div>'
  if (document.getElementById("detail")) {
    $('body').append(imageTest)
    const detail = new Detail();
    detail.init();

    $('#copy-link').on('click', function () {
      let sisn = $('#hidden_sisn_detail').text();
      let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL/sisn ${sisn}?sessionsearch`
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
    console.log(hiddenURL);
    return removeWhiteSpace(hiddenURL.innerText.replace(/"/g, ""));
  }

  setReturnSummaryURL() {
    let url = this.getReturnSummaryURL();
    $("#returnSummary").attr("href", url);
  }

  initLightgallery() {
    lightGallery(document.getElementById('selector1'), {
      selector: '.item'
    });

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

  initDownloadSection(){
    const downloader = new MediaDownloader();
    let detail = this;

    let downloadSectionDOM = $("#download-section");
    let { assets } = this;
    if (assets.length === 0) {
     return;

    }
    else{
      let URLarray = assets.map(e=>e.mediaLowRes);
      downloader.initAssetBlobArray(URLarray)
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      if (mediaType === 'Image') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Image <span class="material-icons items-center"> download </span> </button>')


      }
      if (mediaType === 'Textual') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Textual <span class="material-icons items-center"> download </span> </button>')


      }
      if (mediaType === 'Moving Image') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Video <span class="material-icons items-center"> download </span> </button>')


      }
      if (mediaType === 'Audio') {
        downloadSectionDOM.append('<button id="download-detail-assets" class="flex"> Audio <span class="material-icons items-center"> download </span> </button>')


      }
      this.setDownloadButtonHandler(downloader);
    }
  }
  setDownloadButtonHandler(downloader){
    $('#download-detail-assets').on('click',function(){
      downloader.downloadMultiAssets();
    })
  }
  setMediaView() {
    let { assets } = this;
    console.log(assets);
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
        lightGallery(document.getElementById('detail_media'), {
          selector: '.item'
        });



        // detailMediaDOM.slick();


      }
      else if (mediaType === 'Textual') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><a target="_blank" href=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /></a> </div>`)
      }
      else if (mediaType === 'Audio') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><a target="_blank" href=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /></a><div > <audio class="mx-[auto]"  controls> <source src="horse.ogg" type="audio/ogg"> <source src="horse.mp3" type="audio/mpeg"> Your browser does not support the audio element. </audio></div> </div>`)
      }
      else if (mediaType === 'Moving Image') {
        detailMediaDOM.append(` <video width="80%" class="mx-[auto]" controls>
        <source src=${mediaLowRes} type="video/mp4">
        <source src=${mediaLowRes} type="video/ogg">
        Your browser does not support HTML video.
      </video>
      `)
        lightGallery(document.getElementById('detail_media'), {
          selector: '.item'
        });
      }

    }
    else {
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      if (mediaType === 'Image') {

        assets.map((asset, index) => {
          let { mediaType, mediaLowRes, mediaThumb } = asset;
          detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes} ${index === 0 ? '' : 'hidden'}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /> </div>`)
        })

        lightGallery(document.getElementById('detail_media'), {
          selector: '.item'
        });



        // detailMediaDOM.slick();


      }
    }

  }


  init() {
   
    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initLightgallery();
    this.initDetailAssets();
    this.setMediaView();
    this.initDownloadSection();
  }
}



