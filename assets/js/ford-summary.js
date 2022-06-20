$(document).ready(function () {
  if (document.getElementById("summary")) {
    setSiteTitleAndIcon("Search Result - Hop in the Driver's Seat | Ford Heritage Vault")
    const summary = new Summary();
    const downloader = new MediaDownloader();
    summary.init();
    new FilterModal().init();


    $(".recordHeading").on("click", function () {
      window.location.href = summary.getRecordURL($(this));
    });
    $(".record_cover").on("click", function () {
      window.location.href = summary.getRecordURL($(this).parent().parent());
    }).children().click(function (e) {
      return false;
    });;



    $(".downloadRecord").on("click", function () {
      let recordDOM = $(this).parent().parent().parent();

      let accessURL = summary.getAccessURL(recordDOM);
      downloader.downloadSingleAsset(accessURL);
    })

    $(".bookmarkRecord").on("click", function () {
      let recordDOM = $(this).parent().parent().parent();

      let SISN = recordDOM.find('.hiddenRecordSISN').text();
      summary.addBookmark(SISN,recordDOM );
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



  bookmarkRecord(bookmarkButtonDOM) {
    let containerDiv = bookmarkButtonDOM.parent().parent().parent();
  }

  getThumbnailURL(recordDOM) {
    let span = recordDOM.find('.hidden_fields').find('.a_media_thumb')
    return span.length > 0 ? span.eq(0).text().trim().replace(/\n/g, '') : null
  }

  setRecordThumbnail() {
    let summary = this;
    $('.record').each(function () {
      let url = summary.getThumbnailURL($(this));
      let record_thumbnail = $(this).find('.record_thumbnail')

      if (url !== null) {
        record_thumbnail.removeClass('bg-cover')
        record_thumbnail.addClass('bg-contain bg-center bg-no-repeat')
        record_thumbnail.css("background-image", `url('${url}')`);
      }
      // If No Digital Asset put placeholder
      else {
        record_thumbnail.addClass('bg-test bg-center')
      }
    })
  }
  initSummaryFilter() {
    let filter = new SummaryFilter();
    filter.init();
  }



 
  init() {
    this.setTotalRecord();
    this.setGridListToggle();
    this.createPagination();
    this.setRecordThumbnail();
    this.initSummaryFilter();
    this.setCheckedRecord();
    this.setButtonTooltip();

  }
}


class FilterModal {
  constructor() {
    this.backTop = false;
  }
  openModal() {
    $('#filterModal').fadeIn(400);
    if ($('#backTop').hasClass('show')) {
      $('#backTop').removeClass('show');
      this.backTop = true;
    }
  }

  closeModal() {
    $('#filterModal').fadeOut(200);
    if (this.backTop) {
      $('#backTop').addClass('show');
      this.backTop = false;
    }

  }

  getJSONFilter() {
    let filter_xml = document.getElementById('filter_xml')
    let filter = this;
    if (filter_xml) {
      let x2js = new X2JS({
        arrayAccessFormPaths: [
          'xml.filter'
          , 'xml.filter.item_group'
        ]
      });
      let jsonObj = x2js.xml2json(filter_xml);
      filter = jsonObj.filter
      return filter
    }
    return null;
  }
  getFilterName(name) {
    if (name === "A_MEDIA_MAKE")
      return "Make"
    else if (name === "A_MEDIA_MODEL")
      return "Model"
    else if (name === "A_MEDIA_YEAR")
      return "Year"
    else if (name === "A_MEDIA_COLOR")
      return "Color"
    else if (name === "A_MEDIA_TYPE")
      return "Asset Type"
  }

  initDropdown() {

    $('.expandMobileFilter').on('click', function () {
      let collapseSection = $(this).parent().parent().find('.filterCollapse')

      collapseSection.toggleClass('openFilterCollapse')
    })
  }

  renderUI() {
    let x2js = new X2JS();
    $('.filterModalBody').append('<h1 class="text-[25px]">Filter</h1>');
    let filterJSON = this.getJSONFilter();
    let filter = this;
    if (filterJSON === undefined) {
      return;
    }
    filter.filterJSON = filterJSON;
    x2js.asArray(filterJSON).map(item => {
      let { item_group } = item;
  
      $('.filterModalBody').append(`<hr /> <div class="${item._title}FilterModal" > <div class="flex justify-between h-[30px] pt-[10px] "> <div><p>${filter.getFilterName(item._name)}</p></div> <div class="expandMobileFilter cursor-pointer"> <span class="material-icons"> expand_more </span> </div> </div> </div>`)
      $(`.${item._title}FilterModal`).append(`<div class="w-full mt-[10px] h-auto px-[15px] pb-[30px] filterCollapse collapse openFilterCollapse ${item._title}FilterMobile" ></div>`)
      x2js.asArray(item_group).map((group, index) => {
        if (group.item_value === 'Image') {
          group.item_value = "Images"
        }
        if (group.item_value === 'Textual') {
          group.item_value = "Brochures"
        }
        group.item_link += '&DATABASE=DESCRIPTION_OPAC3'
        if (group.item_selected !== undefined) {
          $(`.${item._title}FilterMobile`).append(`<div class="cursor-pointer ${item._title}FilterItem "> <input id='${item._title}${index}FilterModal' type="checkbox" class="cursor-pointer w-[16px] h-[16px] border-[#6E6E6E]" ${group.item_selected === 'Y' ? 'checked' : ''}  /> <label for='${item._title}${index}FilterModal' class="cursor-pointer mb-[8px]">${group.item_value}</label> <span id="count">(${group.item_frequency})</span> <span hidden class="${item._title}FilterItemLink">${group.item_link}</span></div>`)


        } else if (group.item_selected === undefined) {
          $(`.${item._title}FilterMobile`).append(`<div class="cursor-pointer ${item._title}FilterItem "> <input id='${item._title}${index}FilterModal' type="checkbox" class="cursor-pointer w-[16px] h-[16px] border-[#6E6E6E]"  ${group.item_link.item_selected === 'Y' ? 'checked' : ''}   /> <label for='${item._title}${index}FilterModal' class="cursor-pointer mb-[8px]">${group.item_value}</label> <span id="count">(${group.item_frequency})</span> <span hidden class="${item._title}FilterItemLink">${group.item_link.__text}</span> </div>`)

        }
        $(`.${item._title}FilterItem`).on('click', function () {
          window.location.href = $(this).find(`.${item._title}FilterItemLink`).text()
        })
      })
    })
    this.initDropdown();
  }
  init() {
    let modal = this;
    $('.filterModalButton').on('click', function (e) {
      modal.openModal();
    })


    $('.filterCloseButton').on('click', function (e) {
      modal.closeModal();
    })

    $(document).on('keyup', function (e) {
      if (e.key == "Escape") {
        modal.closeModal();
      }
    });
    // Hide dropdown menu on click outside
    $('#filterModal').on('click', function (e) {
      modal.closeModal();

    });

    $('#filterModal .modalBody').on('click', function (e) {
      e.stopPropagation();
    });


    $(".filterModalButton").click(function () {
      if (modal.filterJSON === null) {
        new MessageModal('No current filter for this search').open()
      }
      else {
        modal.openModal();
      }
    });


    this.renderUI();

  }
}