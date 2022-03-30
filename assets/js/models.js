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

    getFilter() {
        let filter = sessionStorage.getItem("filter")
        if (filter) {
            return JSON.parse(filter)
        }
    }

}



