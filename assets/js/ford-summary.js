$(document).ready(function () {
  if (document.getElementById("summary")) {
    const summary = new Summary();
    const downloader = new MediaDownloader();
    summary.init();
    $(".recordHeading").on("click", function () {
      window.location.href = summary.getRecordURL($(this));
    });


    $(".downloadRecord").on("click", function(){
      let recordDOM = $(this).parent().parent().parent();
      console.log(recordDOM)
      let accessURL = summary.getAccessURL(recordDOM);
      downloader.downloadSingleAsset(accessURL);
    })
  }


});

class Summary extends Report {



  /**
   * Add href to grid/list toggle button
   *
   * @memberof Summary
   */
  setGridListToggle() {
    let isGrid = this.isGrid();
    let gridButton = $(".gridSwitchButton");
    let listButton = $(".listSwitchButton");
    let selectedClassName = "selectedToggle";
    let gridLink = $("#summaryGrid").text();
    let listLink = $("#summaryList").text();
    if (isGrid) {
      gridButton.addClass(selectedClassName);
      gridButton.click(false);
      listButton.find("a").attr("href", listLink);
    } else {
      listButton.addClass(selectedClassName);
      listButton.click(false);
      gridButton.find("a").attr("href", gridLink);
    }
    this.viewButtonTrigger();
  }


  /**
   *
   * This function is to prevent when 
   * users click on the edge of the button 
   * and a redirection doesn't get 
   * triggered
   * 
   * @memberof Summary
   */
  viewButtonTrigger() {
    let gridButton = $(".gridSwitchButton");
    let listButton = $(".listSwitchButton");
    gridButton.on("click", function () {
      window.location = $(this).find("a").attr("href");
    });
    listButton.on("click", function () {
      window.location = $(this).find("a").attr("href");
    });
  }

  /**
   * Check if the current summary report is Grid
   *
   * @returns boolean true if the summary report 
   * has isGrid as a hidden span 
   * 
   * @memberof Summary
   */
  isGrid() {
    return document.getElementById("isGrid");
  }




  /**
   *
   * Generate an object based on MINISIS 
   * returned pagination DOM
   * 
   * @returns an object containing next/previous/current 
   * page URL
   * 
   * @memberof Summary
   */
  generatePaginationObject() {
    let pagination = $("#hiddenPagination");
    let object = {
      previous: null,
      next: null,
      pages: [],
    };

    if (pagination.length) {
      pagination.children("a").each(function () {
        let elementText = $(this).text().trim();
        let href = removeWhiteSpace($(this).attr("href"));

        if (elementText === "Previous") {
          object.previous = href;
        } else if (elementText === "Next") {
          object.next = href;
        } else {
          object.pages.push({
            pageNumber: elementText,
            pageLink: href,
            current: $(this).find("b").length > 0,
          });
        }
      });
    }

    return object;
  }

  createPagination() {
    let paginationObject = this.generatePaginationObject();
    let paginationDOM = $("#pagination");

    if (paginationObject.previous) {
      paginationDOM.append(`
      <button class="hover:bg-[#243C5A] hover:text-white px-[4px]">
        <a href="${paginationObject.previous}" class="flex self-center"><span class="material-icons"> arrow_back_ios </span>Prev</a>
      </button>
      `);
    }
    if (paginationObject.pages.length > 0) {
      let appendHTMLString = "";
      appendHTMLString += `<div class="flex justify-around text-center space-x-[10px] sm:space-x-[36px] self-center">`;

      paginationObject.pages.map((page) => {
        appendHTMLString += `
        <a class="flex self-center justify-center w-[20px] sm:w-[40px] cursor-pointer hover:bg-[#243C5A] hover:text-white  ${page.current
            ? '  border-b-[3px] border-solid border-b-[#243C5A]" '
            : '"'
          } href=${page.pageLink}>
           ${page.pageNumber}
        </a>
 
          `;
      });
      appendHTMLString += `</div>`;
      paginationDOM.append(appendHTMLString);
    }
    if (paginationObject.next) {
      paginationDOM.append(`
        <button class="hover:bg-[#243C5A] hover:text-white px-[4px]">
          <a href="${paginationObject.next}" class="flex self-center">Next <span class="material-icons"> arrow_forward_ios </span></a>
        </button>
        `);
    }
  }

  getRecordURL(recordDOM) {
    return removeWhiteSpace(recordDOM.find(".hiddenRecordURL").text());
  }

  bookmarkRecord(bookmarkButtonDOM) {
    let containerDiv = bookmarkButtonDOM.parent().parent().parent();
  }

  getThumbnailURL(recordDOM) {
    let span = recordDOM.find('.hidden_fields').find('.a_media_thumb')
    return span.length > 0 ? span.text().trim().replace(/\n/g, '') : null
  }

  setRecordThumbnail(){
    let summary = this;
    $('.record').each(function(){
      let url = summary.getThumbnailURL($(this));
      let record_thumbnail = $(this).find('.record_thumbnail')
      if(url){
        record_thumbnail.removeClass('bg-test bg-cover')
        record_thumbnail.addClass('bg-contain bg-center bg-no-repeat')
        record_thumbnail.css("background-image", `url('${url}')`);
      }
    })
  }

  getAccessURL(recordDOM) {
    let span = recordDOM.find('.hidden_fields').find('.a_media_low_res')
    return span.length > 0 ? span.text().trim().replace(/\n/g, '') : null
  }
  init() {
    this.setTotalRecord();
    this.setGridListToggle();
    this.createPagination();
    this.setRecordThumbnail();
  }
}
