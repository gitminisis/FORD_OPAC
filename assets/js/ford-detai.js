$(document).ready(function () {
  if (document.getElementById("detail")) {
    const detail = new Detail();
    detail.init();

    $('#copy-link').on('click', function () {
      let sisn = $('#hidden_sisn_detail').text();
      let url = `https://ford.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_OPAC3/FORD_DETAIL/sisn ${sisn}?sessionsearch`
      copyToClipboard(url);
    })
  }
});

class Detail extends Report {
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
  init() {
    this.setReturnSummaryURL();
    this.setTotalRecord();
    this.initLightgallery();
  }
}
