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

    }
});



class Bookmark extends Report {
    init() {
        this.setTotalRecord();
        this.setRecordThumbnail();
    }
}