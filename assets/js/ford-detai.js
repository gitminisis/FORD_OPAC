$(document).ready(function () {
  if (document.getElementById("detail")) {
    const detail = new Detail();
    detail.init();

    $('#copy-link').on('click', function () {
      let sisn = $('#hidden_sisn_detail').text();
      let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC/FORD_DETAIL/sisn ${sisn}?sessionsearch`
      copyToClipboard(url);
    })
  }
});

class Detail extends Report {
  constructor() {
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
    let x2js = new X2JS({
      arrayAccessFormPaths: [
        'jsonObj.span'
      ]
    });
    let jsonObj = x2js.xml2json(hiddenFields);
    for (let i = 0; i < jsonObj.span.length; i += 2) {
      let span = jsonObj.span;
      let mediaType = span[i].__text;
      let mediaLowRes = span[i + 1].__text;
      let mediaThumb = span[i + 2].__text;
      let mediaAsset = new MediaAsset(mediaType, mediaLowRes, mediaThumb);
      detail.assets.push(mediaAsset);

    }
  }
  setMediaView() {

  }
  init() {
    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initLightgallery();
  }
}




{/* <div class="hidden_fields" hidden="">
<span class="a_media_type">Image</span><span class="a_media_low_res">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/666d78d0afd2487eac7eac3478ce5fa3/access</span><span class="a_media_thumb">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/666d78d0afd2487eac7eac3478ce5fa3/thumbnail</span> 
<span class="a_media_type">Image</span><span class="a_media_low_res">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/b0655a296f7940b383f58fdd01a18ddc/access</span><span class="a_media_thumb">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/b0655a296f7940b383f58fdd01a18ddc/thumbnail</span> 
<span class="a_media_type">Image</span><span class="a_media_low_res">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/3919f29d405841fbaacb0b01e9a520de/access</span><span class="a_media_thumb">
https://titanapi.minisisinc.com/api/links/c29a9048c4864d89915b29f4f39330e4/uui
d/3919f29d405841fbaacb0b01e9a520de/thumbnail</span>
</div> */}