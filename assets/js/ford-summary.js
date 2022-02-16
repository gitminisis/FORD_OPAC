$(document).ready(function () {
  const summary = new Summary();
  summary.init();

  $(".recordHeading").on("click", function () {
    console.log(summary.getRecordURL($(this)));
    window.location.href = summary.getRecordURL($(this));
  });
});

class Summary {
  setTotalRecord() {
    let hiddenTotalRecord = document.getElementById("hiddenTotalRecord");
    if (hiddenTotalRecord) {
      $("#totalRecord").text(hiddenTotalRecord.innerText);
    }
  }
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
  }

  isGrid() {
    return document.getElementById("isGrid");
  }

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
      appendHTMLString += `<div class="flex justify-around text-center space-x-[36px] self-center">`;

      paginationObject.pages.map((page) => {
        appendHTMLString += `
        <a class="w-[40px] cursor-pointer hover:bg-[#243C5A] hover:text-white  ${
          page.current
            ? ' pb-[5px] border-b-[3px] border-solid border-b-[#243C5A]" '
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

  init() {
    this.setTotalRecord();
    this.setGridListToggle();
    this.createPagination();
  }
}
