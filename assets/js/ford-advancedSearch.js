$(document).ready(function () {
  let filter = new Filter();
  filter.init();

  $(".closeModal").on("click", function (e) {
    $(this).parent().parent().parent().parent().addClass("hidden");
  });

  // Request Modal section

  // Toggle the collpase filter
  $(".filterButton").on("click", function () {
    $("#filterCollapse").toggleClass("open-collapse");
    setTimeout(function () {
      if ($("#filterCollapse").hasClass("open-collapse")) {
        $("#advancedSearchInput").focus();
      }
    }, 300);
  });

  // Expand filter on click
  $(".filterSelect").on("click", function () {
    // let expand = $(this).find($(".expand"));
    let dropdown = $(this).find($(".filterDropdown"));

    if (dropdown.hasClass("hideDropdown")) {
      filter.openFilter($(this));
    }
    else {
      filter.closeAllFilter();
    }
    filter.updateHiddenKeywordValue();

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
    console.log(color);
    if (filter.color !== color) {
      $(this).addClass("selectedColorFilter");
      filter.color = color;
    } else {
      filter.resetColor();
    }
    filter.updateHiddenKeywordValue();

  });

  // Asset Filter Handler

  $(".assetTypeFilter").on("change", function (e) {
    let checked = $(this).is(":checked");
    let assetType = $(this).data("asset");
    checked
      ? filter.addAssetType(assetType)
      : filter.removeAssetType(assetType);

    filter.updateHiddenKeywordValue();
  });

  $("#advancedSearchInput").on("change", function (e) {
    filter.updateHiddenKeywordValue();
  });



  $("#filterCollapse").keyup(function (event) {
    if (event.keyCode === 13) {
      $('#advancedSearchForm').submit();
    }
  });

});

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

  resetColor() {
    this.color = '';
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
        $(this).parent().find('.expand').text("expand_more")
      }
    });
  }

  generateSearchExpression() {
    let searchExpression = '';
    let yearExp = this.year.trim() === '' ? '' : `${FIELD_NAME.year} ${this.year}`;
    let makeExp = this.make.trim() === '' ? '' : `${FIELD_NAME.make} ${this.make}`;
    let modelExp = this.model.trim() === '' ? '' : `${FIELD_NAME.model} ${this.model}`;
    let colorExp = this.color.trim() === '' ? '' : `${FIELD_NAME.color} ${this.color}`;
    let assetExpVal = this.assetType.map(a => `${FIELD_NAME.assetType}${a}`).join(' OR ').trim()
    let assetExp = assetExpVal === '' ? '' : '(' + assetExpVal + ')';


    searchExpression = [yearExp, makeExp, modelExp, colorExp, assetExp].filter(e => e !== '').join(' AND ')
    return searchExpression.trim();
  }

  updateHiddenKeywordValue() {
    let keyword = $('#advancedSearchInput').val();
    this.keyword = keyword;
    let value = this.generateSearchExpression();
    $('#hiddenKeywordInput').val(value);
  }

  getClusterUrl(exp) {
    let session = $("#sessionid").text().trim();
    // let session = 'https://ford.minisisinc.com/SCRIPTS/MWIMAIN.DLL/133636002'
    return `${session}/FIRST?INDEXLIST&KEYNAME=${exp}&DATABASE=DESCRIPTION_OPAC3&form=[FORD_INCLUDE]html/cluster.html&TITLE=Browse%20${exp}`;
  }

  getClusterValue(exp) {
    let url = this.getClusterUrl(exp);
    return $.get(url).then(response => {
      return response;
    })
  }


  setClusterDropdown(id, exp) {
    let url = this.getClusterUrl(exp);
    $.get(url).then(response => {
      let x2js = new X2JS({
        arrayAccessFormPaths: [
          "cluster.index_list.option"
        ]
      });
      var jsonObj = x2js.xml_str2json(response);
      let optionArray = jsonObj.cluster.index_list.option;
      let optionArrayList = optionArray.map(el => `<li>${el}</li>`)
      $(`#${id}FilterList`).append(optionArrayList.join(''));
      this.initUIHandler()
    })
  }

  setColorFilter(id, exp) {
    let url = this.getClusterUrl(exp);
    $.get(url).then(response => {
      let x2js = new X2JS({
        arrayAccessFormPaths: [
          "cluster.index_list.option"
        ]
      });
      var jsonObj = x2js.xml_str2json(response);
      let optionArray = jsonObj.cluster.index_list.option;
      let optionArrayList = optionArray.map(el => `<span class="w-[32px] h-[32px] bg-${el} rounded-full inline-block colorFilter"
      data-color="${el}"></span>`)
      $(`#${id}Filter`).append(optionArrayList.join(''));
      this.initUIHandler();
    })
  }

  initUIHandler() {
    let filter = this;
    $(".filterDropdown ul li").on("click", function () {
      filter.selectFilterValue($(this));
      setTimeout(function () {
        filter.closeAllFilter();
      }, 10);
    });

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
      filter.updateHiddenKeywordValue();

    });


  }

  init() {
    const filterList = ['year', 'make', 'model'];
    filterList.map(filter => {
      this.setClusterDropdown(filter, FIELD_NAME[filter])
    })
    // this.setColorFilter('color', FIELD_NAME.color);
  }
}


const FIELD_NAME = {
  year: "A_MEDIA_YEAR",
  make: "A_MEDIA_MAKE",
  model: "A_MEDIA_MODEL",
  color: "A_MEDIA_COLOR",
  assetType: "A_MEDIA_TYPE ",
  keyword: "KEYWORD_CL"
}
