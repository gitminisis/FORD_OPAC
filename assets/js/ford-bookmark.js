$(document).ready(function () {

    if (document.getElementById("bookmark")) {
        let bookmark = new Bookmark();
        bookmark.init();
        const downloader = new MediaDownloader();
        let mediaURLArrays = [];
        for (let i = 0; i < document.getElementsByClassName('a_media_low_res').length; i++) {
            mediaURLArrays.push(document.getElementsByClassName('a_media_low_res')[i].innerText.trim())
        }

        downloader.initAssetBlobArray(mediaURLArrays);

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

            let SISN = recordDOM.find('.hiddenRecordSISN').find('input').val();
            bookmark.deleteBookmark(SISN);
        })


        $('.collection-removeAll').on("click", function () {

            bookmark.deleteAllBookmark();
        })

        $('.collection-downloadAll').on('click', function () {
            downloader.downloadBlobArray();
        })



        $(".record_cover").on("click", function () {


            window.location.href = bookmark.getRecordURL($(this).parent().parent());
        }).children().click(function (e) {
            return false;
        });;
    }
});



class Bookmark extends Report {
    getRecordURL(recordDOM) {
        return removeWhiteSpace(recordDOM.find(".hiddenRecordURL").text()).replace("DESCRIPTION_OPAC3", "SELECTION_LIST");
    }
    init() {
        this.setTotalRecord();
        this.setRecordThumbnail();
        new Tooltip($('.downloadRecord'), 'Download Asset').init()
        new Tooltip($('.deleteBookmarkRecord'), 'Remove Record').init()
    }
}