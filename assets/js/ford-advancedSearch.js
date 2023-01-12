$(document).ready(function () {
  let filter = new Filter();
  let isLoaded = false;
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

  $(".closeModal").on("click", function (e) {
    $(this).parent().parent().parent().parent().addClass("hidden");
  });

  // Request Modal section

  // Toggle the collpase filter
  $(".filterButton").on("click", function () {
    if (document.getElementsByClassName('noSessionBanner').length !== 0) {
      new MessageModal('Please click the button to start a new session.').open();
      return;
    }
    $("#filterCollapse").toggleClass("open-collapse");
    if (!isLoaded) {
      filter.init();
      isLoaded = true;
    }
    setTimeout(function () {
      if ($("#filterCollapse").hasClass("open-collapse")) {
        $("#advancedSearchInput").focus();
      }
    }, 300);
  });



  // Expand filter on focus
  $(".filterSelect input").focus(function () {

    // let expand = $(this).find($(".expand"));
    // let dropdown = $(this).find($(".filterDropdown"));

    filter.openFilter($(this).parent());
    $(document).keyup(function (e) {
      if (e.key === "Escape") { // escape key maps to keycode `27`
        filter.closeAllFilter();
        $(this).val('')
      }
    });



  }).focusout(function () {
    // filter.closeAllFilter();
    // let filterType = $(this).data("filter").toLowerCase()

    // $(this).val('')
    // filter.resetFilterValue(filterType)

  });


  $(".filterSelect input").on('input', function (e) {
    let val = $(this).val();

    let dropdownList = $(this).parent().find($(".filterDropdown li")).toArray();

    let newDropdownList = dropdownList.map(e => {
      e.style.display = 'list-item'
      if (e.innerText.toLowerCase().indexOf(val.toLowerCase()) !== 0) {
        e.style.display = 'none'
      }
      return e;
    });
    $(this).parent().find($(".filterDropdown ul")).empty();
    $(this).parent().find($(".filterDropdown ul")).append(newDropdownList)
    filter.setDropdownListHandler();
  })



  
  $(".filterDropdown li").on("click", function () {
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
      sessionStorage.setItem('filter', JSON.stringify(filter.getFilterJSON))
      $('#advancedSearchForm').submit();
    }
  });

  $('#advanced-reset').on('click', function () {

    filter.resetUI();
  })

  $('#advanced-submit').on('click', function () {
    if (filter.isEmpty()) {
      let toast = new MessageModal('Please input a keyword for the search')
      toast.open();
    }

    else {

      $('#advancedSearchForm').submit();
    }

  })
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
  isEmpty() {
    return this.year === '' && this.make === '' && this.model === '' && this.color === '' && this.assetType.length === 0 && this.keyword === '';
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


  setDropdownListHandler() {
    let filter = this;
    $(".filterDropdown ul li").on("click", function () {

      filter.selectFilterValue($(this));
      setTimeout(function () {
        filter.closeAllFilter();
      }, 10);
    });
  }

  addAssetType(t) {
    this.assetType.push(t);
  }

  removeAssetType(t) {
    this.assetType = this.assetType.filter(e => e !== t)
  }

  openFilter(filterDOM) {
    let dropdown = filterDOM.find($(".filterDropdown"));
    this.closeAllFilter(filterDOM);
    setTimeout(function () {
      dropdown.toggleClass("hideDropdown");
    }, 100);
  }


  resetFilterValue(filterType) {
    this[filterType] = '';
  }

  selectFilterValue(filterOptionDOM) {
    let value = filterOptionDOM.text();

    let filterText = filterOptionDOM
      .parent()
      .parent()
      .parent()
      .find("input");
    let filter = filterText.data("filter").toLowerCase();
    if (value === '' || value === 'None') {
      filterText.val(filterText.data("filter"));
      this[filter] = '';
      this.updateHiddenKeywordValue();
      return;
    }

    filterText.val(value);
    this[filter] = value;
    this.updateHiddenKeywordValue();
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
    let yearExp = this.year.trim() === '' ? '' : `${FIELD_NAME.year} "${this.year}"`;
    let makeExp = this.make.trim() === '' ? '' : `${FIELD_NAME.make} "${this.make}"`;
    let modelExp = this.model.trim() === '' ? '' : `${FIELD_NAME.model} "${this.model}"`;
    let colorExp = this.color.trim() === '' ? '' : `${FIELD_NAME.color} "${this.color}"`;
    let assetExpVal = this.assetType.map(a => `${FIELD_NAME.assetType}${a}`).join(' OR ').trim()
    let assetExp = assetExpVal === '' ? '' : '(' + assetExpVal + ')';


    searchExpression = [yearExp, makeExp, modelExp, colorExp, assetExp].filter(e => e !== '').join(' AND ')
    return searchExpression.trim();
  }

  updateHiddenKeywordValue() {
    let keyword = $('#advancedSearchInput').val();
    this.keyword = keyword;
    let value = this.generateSearchExpression();
    this.setFilterSessionStorage();
    $('#hiddenKeywordInput').val(value);
    this.updateDropdownUI();
  }


  updateDropdownUI() {

    if (this.year !== '') {
      $('#yearFilterValue').parent().css('border-color', '#00095B')
      $('#yearFilterValue').parent().css('border-width', '2px')
    }
    else if (this.year === '') {
      $('#yearFilterValue').parent().css('border-color', 'black')
      $('#yearFilterValue').parent().css('border-width', '1px')
    }


    if (this.make !== '') {
      $('#makeFilterValue').parent().css('border-color', '#00095B')
      $('#makeFilterValue').parent().css('border-width', '2px')
    }
    else if (this.make === '') {
      $('#makeFilterValue').parent().css('border-color', 'black')
      $('#makeFilterValue').parent().css('border-width', '1px')
    }

    if (this.model !== '') {
      $('#modelFilterValue').parent().css('border-color', '#00095B')
      $('#modelFilterValue').parent().css('border-width', '2px')
    }
    else if (this.model === '') {
      $('#modelFilterValue').parent().css('border-color', 'black')
      $('#modelFilterValue').parent().css('border-width', '1px')
    }
  }


  getClusterUrl(exp) {
    let session = $("#sessionid").text().trim();

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
      })
      var jsonObj = x2js.xml_str2json(response);
      let optionArray = jsonObj.cluster.index_list.option;
      let optionArrayList = optionArray.map(el => `<li>${el}</li>`)
      $(`#${id}FilterList`).append("<li>None</li>")
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




  }

  getFilterJSON() {

    let { keyword, year, make, model, color, assetType } = this;
    return { keyword, year, make, model, color, assetType };
  }

  setFilterSessionStorage() {
    sessionStorage.setItem('filter', JSON.stringify(this.getFilterJSON()))
  }

  resetUI() {
    this.resetAll();
    $("#advancedSearchInput").val('');
    $(".filterText").val('');
    $(".colorFilter").each(function (e) {
      $(this).removeClass("selectedColorFilter");
    });
    $('.filterDropdown li').css('display','list-item')
    $('input[type=checkbox]').prop('checked', false);
    this.updateDropdownUI();

  }

  initTooltip() {
    $(".colorFilter").each(function (e) {
      new Tooltip($(this), $(this).data("color")).init()
    });
  }

  init() {
    const filterList = ['year', 'make', 'model'];
    // filterList.map(filter => {
    //   this.setClusterDropdown(filter, FIELD_NAME[filter])
    // })
    // this.setColorFilter('color', FIELD_NAME.color);
    this.initTooltip();
    this.initUIHandler();
    this.setFilterSessionStorage();
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
