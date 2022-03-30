$(document).ready(function () {
  let imageTest = '<div class="hidden_fields" hidden=""> <span class="a_media_type">Image</span><span class="a_media_low_res"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/access</span><span class="a_media_thumb"> https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui d/666d78d0afd2487eac7eac3478ce5fa3/thumbnail</div>'
  if (document.getElementById("detail")) {
    $('body').append(imageTest)
    const detail = new Detail();
    detail.init();

    $('#copy-link').on('click', function () {
      let sisn = $('#hidden_sisn_detail').text();
      let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC/FORD_DETAIL/sisn ${sisn}?sessionsearch`
      copyToClipboard(url);
    })
  }
});
class MediaAsset {
  constructor(mediaType, mediaLowRes, mediaThumb) {
    this.mediaType = mediaType.trim().replace(/ /g, '');
    this.mediaLowRes = mediaLowRes.trim().replace(/ /g, '');
    this.mediaThumb = mediaThumb.trim().replace(/ /g, '');
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

      }
      else if (mediaType === 'Textual') {

      }
      else if (mediaType === 'Audio') {

      }
      else if (mediaType === 'Video') {

      }

    }
    else {
      let { mediaType, mediaLowRes, mediaThumb } = assets[0];
      if (mediaType === 'Image') {
        detailMediaDOM.append(`<div class="item" data-src=${mediaLowRes}><img class="h-[80%] mx-[auto]" src=${mediaThumb} /> </div>`)
      }
    }
    lightGallery(document.getElementById('detail_media'), {
      selector: '.item'
    });
  }


  init() {
    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initLightgallery();
    this.initDetailAssets();
    this.setMediaView();
  }
}



