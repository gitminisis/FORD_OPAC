$(document).ready(function () {

    if (document.getElementById("bookmark")) {
        let bookmark = new Bookmark();
        bookmark.init();
        const downloader = new MediaDownloader();

        $(".recordHeading").on("click", function () {
            window.location.href = bookmark.getRecordURL($(this));
        });


        $(".downloadRecord").on("click", function () {
            let recordDOM = $(this).parent().parent().parent();

            let accessURL = bookmark.getAccessURL(recordDOM);
            downloader.downloadSingleAsset(accessURL);
        })

        $(".deleteBookmarkRecord").on("click", function () {
            let recordDOM = $(this).parent().parent().parent();

            let SISN = recordDOM.find('.hiddenRecordSISN').text();
            summary.deleteBookmark(SISN);
        })


        $('.collection-removeAll').on("click", function () {
            let recordDOM = $(this).parent().parent().parent();

            let SISN = recordDOM.find('.hiddenRecordSISN').text();
            summary.deleteBookmark(SISN);
        })
    }
});



class Bookmark extends Report {
    getRecordURL(recordDOM) {
        return removeWhiteSpace(recordDOM.find(".hiddenRecordURL").text()).replace("DESCRIPTION_OPAC3", "SELECTION_LIST");
    }
    init() {
        this.setTotalRecord();
        this.setRecordThumbnail();
    }
}