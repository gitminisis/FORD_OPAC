class Report {
    /**
        * Find hiddenTotalRecord DOM and 
        * set the value to innerText
        *
        * @memberof Report
        */
    setTotalRecord() {
        let hiddenTotalRecord = document.getElementById("hiddenTotalRecord");
        if (hiddenTotalRecord) {
            $("#totalRecord").text(hiddenTotalRecord.innerText);
        }
    }
}

