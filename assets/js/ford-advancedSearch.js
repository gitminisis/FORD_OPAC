$(document).ready(function () {
  let filter = new Filter();


  $(".closeModal").on("click", function (e) {
    $(this).parent().parent().parent().parent().addClass("hidden");
  });


  // Request Modal section

  // Toggle the collpase filter
  $(".filterButton").on("click", function () {
    $("#filterCollapse").toggleClass("open-collapse");
    setTimeout(function () {
      if ($("#filterCollapse").hasClass("open-collapse")) {
        console.log("test");
        $("#advancedSearchInput").focus();
      }
    }, 300);
  });

  // Expand filter on click
  $(".filterSelect").on("click", function () {
    // let expand = $(this).find($(".expand"));
    let dropdown = $(this).find($(".filterDropdown"));
    console.log(dropdown.hasClass("hideDropdown"))
    if (dropdown.hasClass("hideDropdown")) {
      filter.openFilter($(this));
    }
    else {
      filter.closeAllFilter();
    }
  });

  $(".filterDropdown ul li").on("click", function () {
    filter.selectFilterValue($(this));
    setTimeout(function () {
      filter.closeAllFilter();
    }, 10);
  });

  // When clicking out of the filter, option is closed
  $(document).mouseup(function (e) {
    let container = $(".filterSelect");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      filter.closeAllFilter();
    }
  });

  // Color Filter Handler

  $(".colorFilter").on("click", function (e) {
    $(".colorFilter").each(function (e) {
      $(this).removeClass("selectedColorFilter");
    });
    let color = $(this).data("color");
    if (filter.color !== color) {
      $(this).addClass("selectedColorFilter");
      filter.color = color;
    } else {
      filter.resetColor();
    }
  });

  // Asset Filter Handler

  $(".assetTypeFilter").on("change", function (e) {
    let checked = $(this).is(":checked");
    let assetType = $(this).data("asset");
    checked
      ? filter.addAssetType(assetType)
      : filter.removeAssetType(assetType);
  });


  $('#advancedSearchForm').on('submit', function (e) {
    e.preventDefault();
    console.log('hi');
    let keyword = $('#advancedSearchInput').val();
    filter.keyword = keyword;
    $('#hiddenKeywordInput').val(filter.generateSearchExpression())
    var actionurl = e.currentTarget.action;

    //do your own request an handle the results
    $.ajax({
      url: actionurl,
      type: 'post',
      data: filter.generateSearchExpression() ,
      success: function (data) {
        console.log(data)
      }
    });
  })



});

// TODO: FIX FILTER ADVANCED SEARCH FOR OTHER FIELDS
class Filter {
  constructor() {
    this.year = "";
    this.make = "";
    this.model = "";
    this.color = "";
    this.assetType = [];
    this.keyword = "";
  }

  resetAll() {
    this.year = "";
    this.make = "";
    this.model = "";
    this.color = "";
    this.assetType = [];
    this.keyword = "";
  }

  resetKeyword() {
    this.keyword = "";
  }

  resetYear() {
    this.year = "";
  }

  resetMake() {
    this.make = "";
  }

  resetModel() {
    this.model = "";
  }

  resetColor() {
    this.color = "";
  }

  resetAssetType() {
    this.assetType = [];
  }

  removeAssetType(t) {
    this.assetType = this.assetType.filter((e) => e !== t);
  }

  addAssetType(t) {
    this.assetType.push(t);
  }

  openFilter(filterDOM) {
    let expand = filterDOM.find($(".expand"));
    let dropdown = filterDOM.find($(".filterDropdown"));
    expand.text(
      dropdown.hasClass("hideDropdown") ? "expand_less" : "expand_more"
    );
    this.closeAllFilter(filterDOM);
    setTimeout(function () {
      dropdown.toggleClass("hideDropdown");
    }, 100);
  }

  selectFilterValue(filterOptionDOM) {
    let value = filterOptionDOM.text();
    let filterText = filterOptionDOM
      .parent()
      .parent()
      .parent()
      .find(".filterText");

    let filter = filterText.data("filter").toLowerCase();
    filterText.text(value);
    this[filter] = value;
  }

  closeAllFilter(excl) {
    let dropdown = $(".filterDropdown");
    dropdown.each(function () {
      if (!$(this).hasClass("hideDropdown")) {
        $(this).addClass("hideDropdown");
      }
    });
  }

  generateSearchExpression() {
    let searchExpression = '';
    let keywordExp = `${FIELD_NAME.keyword} ${this.keyword}`;
    let yearExp = ` AND ${FIELD_NAME.year} ${this.year}`;
    let makeExp = ` AND ${FIELD_NAME.make} ${this.make}`;
    let modelExp = ` AND ${FIELD_NAME.model} ${this.model}`;
    let colorExp = ` AND ${FIELD_NAME.color} ${this.color}`;
    let assetExp = ' AND ' + this.assetType.map(a => `${FIELD_NAME.assetType} ${a}`).join(' OR ');



    searchExpression = `${keywordExp}  ${yearExp}  ${makeExp}  ${modelExp}  ${colorExp}  ${assetExp}`;

    return searchExpression;
  }
}


const FIELD_NAME = {
  year: "A_MEDIA_YEAR",
  make: "A_MEDIA_MAKE",
  model: "A_MEDIAL_MODEL",
  color: "A_MEDIAL_COLOR",
  assetType: "A_MEDIA_TYPE ",
  keyword: "KEYWORD_CL"
}
