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

            let SISN = recordDOM.find('.hiddenRecordSISN').text();
            bookmark.deleteBookmark(SISN);
        })


        $('.collection-removeAll').on("click", function () {

            let SISN_array = [];
            $('.hiddenRecordSISN').each(function () {
                SISN_array.push($(this).text())
            })
            bookmark.deleteMultipleBookmark(SISN_array);
        })

        $('.collection-downloadAll').on('click', function () {
            downloader.downloadBlobArray();
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