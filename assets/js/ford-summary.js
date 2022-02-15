$(document).ready(function () {
  setTotalRecord();
});

function setTotalRecord() {
  let hiddenTotalRecord = document.getElementById("hiddenTotalRecord");
  if (hiddenTotalRecord) {
    $("#totalRecord").text(hiddenTotalRecord.innerText);
  }
}
