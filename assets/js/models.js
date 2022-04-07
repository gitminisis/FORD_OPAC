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
        else {
            $("#totalRecord").parent().empty();
        }
    }

    getFilter() {
        let filter = sessionStorage.getItem("filter")
        if (filter) {
            return JSON.parse(filter)
        }
    }

    addBookmark(SISN){
        let SESSID = getCookie("HOME_SESSID");
        let url = `${SESSID}/1/1?ADDSELECTION&COOKIE=BOOKMARK`
        let data = `mcheckbox_${SISN}=${SISN}-DESCRIPTION`
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(response){
                //if request if made successfully then the response represent the data
        
              let roaster = new MessageModal(`Record SISN#${SISN} has been added to collection`)
              roaster.open();
            }
          });
    }


}



