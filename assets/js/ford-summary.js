$(document).ready(function () {
  const summary = new Summary();
  summary.init();
});

class Summary {
  setTotalRecord() {
    let hiddenTotalRecord = document.getElementById("hiddenTotalRecord");
    if (hiddenTotalRecord) {
      $("#totalRecord").text(hiddenTotalRecord.innerText);
    }
  }

  init() {
    this.setTotalRecord();
  }

  
}
