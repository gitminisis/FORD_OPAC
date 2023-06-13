$(document).ready(function () {
  let filter = new Filter();
  let isLoaded = false;
  $(".colorFilter").on("click", function (e) {
    if (filter.isNonModelSelected) {
      let toast = new MessageModal('Color selections are not active when Place, Publication or Design/Concept is selected')
      toast.open();
      return;
    }
    $(".colorFilter").each(function (e) {
      $(this).removeClass("selectedColorFilter");
    });
    let color = $(this).data("color");
    if (filter.color !== color) {
      $(this).addClass("selectedColorFilter");
      filter.setColor(color);
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
  function toggleFilterButton() {
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
  }
  $(".filterButton").on("click", function () {
    toggleFilterButton();
  });
  $(".filterButtonMobile").on("click", function () {
    toggleFilterButton();
  });


  // Expand filter on focus
  $(".filterSelect input").focus(function () {



    filter.openFilter($(this).parent());
    $(document).keyup(function (e) {
      if (e.key === "Escape") { // escape key maps to keycode `27`
        filter.closeAllFilter();
        $(this).val('')
      }
    });



  }).focusout(function () {


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



  $('#advancedSearchForm').on('submit', function (e) {
    if (filter.isEmpty()) {
      e.preventDefault();
      let toast = new MessageModal('Please input a keyword for the search')
      toast.open();
    }
  })
  $('#advanced-submit').on('click', function () {
    $('#advancedSearchForm').submit();
  })
});


class Filter {
  constructor() {
    this.year = "";
    this.make = "";
    this.model = "";
    this.color = "";
    this.place = "";
    this.design = "";
    this.publication = "";
    this.assetType = [];
    this.keyword = "";
    this.isNonModelSelected = false;

  }
  setColor(color) {
    this.color = color;
    [...NON_MODEL_SEARCH].map(e => {
      let inputText = $(`#${e}FilterList`).parent().parent().find('input')
      inputText.attr('disabled', true)
      inputText.css('background', '#d6d6d6')
    })
  }
  isEmpty() {
    for (let key in this) {
      if (this.assetType.length !== 0) {
        return false;
      }
      if (key !== "assetType" && this[key] !== "") {
        return false;
      }
    }
    return true;
  }

  resetAll() {
    for (let key in this) {
      this[key] = key === "assetType" ? [] : ""
    }
  }

  resetColor() {
    this.color = '';

    for (let i = 0; i < MODEL_SEARCH.length; i++) {
      if (this[MODEL_SEARCH[i]] !== '') {
        return;
      }
    }
    this.resetUI();

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
    if (NON_MODEL_SEARCH.indexOf(filter) !== -1) {
      let otherNonModel = [...filterList].filter(e => e !== filter)
      this.isNonModelSelected = true;

      otherNonModel.map(e => {
        let inputText = $(`#${e}FilterList`).parent().parent().find('input')
        inputText.attr('disabled', true)
        inputText.css('background', '#d6d6d6')
      })
    }
    else {
      let otherNonModel = [...NON_MODEL_SEARCH].filter(e => e !== filter)
      otherNonModel.map(e => {
        let inputText = $(`#${e}FilterList`).parent().parent().find('input')
        inputText.attr('disabled', true)
        inputText.css('background', '#d6d6d6')
      })
    }


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
  disableColorOptions() {
    $('.colorFilter').unbind('click')
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
    let arrayExpression = [];
    filterList.map(filter => {
      arrayExpression.push(this[filter].trim() === '' ? '' : `${FIELD_NAME[filter]} "${this[filter]}"`)
    })

    let colorExp = this.color.trim() === '' ? '' : `${FIELD_NAME.color} "${this.color}"`;
    let assetExpVal = this.assetType.map(a => `${FIELD_NAME.assetType} ${a}`).join(' OR ').trim()
    let assetExp = assetExpVal === '' ? '' : '(' + assetExpVal + ')';
    arrayExpression.push(colorExp, assetExp);

    searchExpression = arrayExpression.filter(e => e !== '').join(' AND ')
    return searchExpression.trim();
  }

  updateHiddenKeywordValue() {
    let keyword = $('#advancedSearchInput').val();
    this.keyword = keyword;
    let value = this.generateSearchExpression();
    this.setFilterSessionStorage();
    $('#hiddenKeywordInput').val(value);
    // this.updateDropdownUI();
  }


  updateDropdownUI() {

  }


  getClusterUrl(exp) {
    let session = $("#sessionid").text().trim();

    return `/scripts/mwimain.dll/FIRST?INDEXLIST&KEYNAME=${exp}&DATABASE=DESCRIPTION_OPAC3&form=[FORD_INCLUDE]html/cluster.html&TITLE=Browse%20${exp}&APPLICATION=DESCRIPTION_OPAC3&LANGUAGE=144`;
  }

  getClusterValue(exp) {
    let url = this.getClusterUrl(exp);
    return $.get(url).then(response => {
      return response;
    })
  }


  setClusterDropdown(id, exp) {
    let url = this.getClusterUrl(exp);
    $(`#${id}FilterList`).append('<li style="pointer-events:none;">Loading...</li>')
    $.get(url).then(response => {
      let x2js = new X2JS({
        arrayAccessFormPaths: [
          "cluster.index_list.option"
        ]
      })
      var jsonObj = x2js.xml_str2json(response);
      let optionArray = jsonObj.cluster.index_list.option;
      let optionArrayList = optionArray.map(el => `<li>${el}</li>`)
      $(`#${id}FilterList`).empty();
      $(`#${id}FilterList`).append("<li></li>")
      $(`#${id}FilterList`).append(optionArrayList.join(''));
      this.initUIHandler()
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

    let { keyword, year, make, model, color, assetType, place, design, publication } = this;
    return { keyword, year, make, model, color, assetType, place, design, publication };
  }

  setFilterSessionStorage() {
    sessionStorage.setItem('filter', JSON.stringify(this.getFilterJSON()))
  }

  resetUI() {
    this.resetAll();
    $("#advancedSearchInput").val('');
    $(".filterText").val('');
    $(".filterText").attr('disabled', false);
    $(".filterText").css('background', 'transparent');
    $(".colorFilter").each(function (e) {
      $(this).removeClass("selectedColorFilter");
    });
    $('.filterDropdown li').css('display', 'list-item')
    $('input[type=checkbox]').prop('checked', false);
    this.isNonModelSelected = false;
  }

  initTooltip() {
    $(".colorFilter").each(function (e) {
      new Tooltip($(this), $(this).data("color")).init()
    });
  }

  init() {
    filterList.map(filter => {
      this.setClusterDropdown(filter, FIELD_NAME[filter])
    })

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
  assetType: "A_MEDIA_TYPE",
  keyword: "KEYWORD_CL",
  place: "FORD_PLACE",
  design: "FORD_DSGN_CNCPT",
  publication: "FORD_PUBLICATNS"
}
const filterList = ['year', 'make', 'model', "place", "design", "publication"];

const NON_MODEL_SEARCH = ['place', 'design', 'publication']
const MODEL_SEARCH = ['year', 'make', 'model',]