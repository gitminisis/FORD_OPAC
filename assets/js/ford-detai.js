$(document).ready(function () {
  const detail = new Detail();
  detail.init();
});

class Detail {
  getReturnSummaryURL() {
    let hiddenURL = document.getElementById("hiddenReturnSummary");
    console.log(hiddenURL);
    return removeWhiteSpace(hiddenURL.innerText.replace(/"/g, ""));
  }

  setReturnSummaryURL() {
    let url = this.getReturnSummaryURL();
    $("#returnSummary").attr("href", url);
  }

  init() {
    this.setReturnSummaryURL();
  }
}
