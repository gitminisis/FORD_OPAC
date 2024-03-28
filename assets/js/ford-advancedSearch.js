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
    debugger;
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
      if (key !== "assetType" && key !== "isNonModelSelected" && this[key] !== "") {
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
      debugger
      let x2js = new X2JS({
        arrayAccessFormPaths: [
          "cluster.index_list.option"
        ]
      })
      if(id === 'design'){
        response = `<cluster> <index_list><option>021C CONCEPT</option> <option>24.7 CONCEPT</option> <option>3D CARBON FUSION CONCEPT</option> <option>4-TRAC CONCEPT</option> <option>427 CONCEPT</option> <option>ADRENALIN CONCEPT</option> <option>AEOLUS (MONORAIL SYSTEM) CONCEPT</option> <option>AERO CONCEPT 90</option> <option>AEROVAN CONCEPT</option> <option>AFV CONCEPT</option> <option>AIRSTREAM CONCEPT</option> <option>AIV (ALUMINUM INTENSIVE VEHICLE) CONCEPT</option> <option>ALLEGRO CONCEPT</option> <option>ALLEGRO II CONCEPT</option> <option>ALPE LIMITED CONCEPT</option> <option>ANTSER CONCEPT</option> <option>ASTRION FIREFLY CONCEPT</option> <option>ATLAS CONCEPT</option> <option>ATTACHE CONCEPT</option> <option>AURORA CONCEPT</option> <option>AURORA II CONCEPT</option> <option>AVIATOR CONCEPT</option> <option>BEARCAT CONCEPT</option> <option>BIG RED TURBINE TRUCK CONCEPT</option> <option>BLACKWOOD CONCEPT</option> <option>BORDINAT COBRA CONCEPT</option> <option>BRONCO + FILSON WILDLAND FIRE RIG CONCEPT</option> <option>BRONCO BOSS CONCEPT</option> <option>BRONCO CONCEPT</option> <option>BRONCO DM-1 CONCEPT</option> <option>BRONCO DUNE DUSTER CONCEPT</option> <option>BRONCO II EDDIE BAUER CONCEPT</option> <option>BRONCO MONTANA LOBO CONCEPT</option> <option>BRONCO OG CONCEPT</option> <option>BRONCO OUTBACK CONCEPT</option> <option>BRONCO SASQUATCH CONCEPT</option> <option>BRONCO U260 CONCEPT</option> <option>BRONCO WILDFLOWER CONCEPT</option> <option>C CONCEPT</option> <option>CARDINAL CONCEPT</option> <option>COBRA 230 ME CONCEPT</option> <option>COCKPIT CONCEPT</option> <option>COMET CYCLONE SPORTSTER CONCEPT</option> <option>COMET SUPER CYCLONE CONCEPT</option> <option>COMUTA CONCEPT</option> <option>CONCEPT 50 CONCEPT</option> <option>CONCEPT CARGO CONCEPT</option> <option>CONTEMPRA CONCEPT</option> <option>CONTINENTAL CONCEPT</option> <option>CONTINENTAL CONCEPT 100</option> <option>CONTINENTAL PROTOTYPE FOR EDSEL</option> <option>CONTOUR CONCEPT</option> <option>CORRIDA CONCEPT</option> <option>COUGAR 406 CONCEPT</option> <option>COUGAR CONCEPT</option> <option>COUGAR II CONCEPT</option> <option>COUGAR S CONCEPT</option> <option>COURIER F1 CONCEPT</option> <option>CYCLONE CONCEPT</option> <option>DEPAOLO CONCEPT</option> <option>DESERT EXCURSION CONCEPT</option> <option>ECONOLINE CHICANE CONCEPT</option> <option>ECONOLINE KILIMANJARO CONCEPT</option> <option>ECOSTAR CONCEPT</option> <option>EDGE CONCEPT</option> <option>ELTEC CONCEPT</option> <option>EQUATOR CONCEPT</option> <option>ESCAPE HYBRID CONCEPT</option> <option>ESCORT CONCEPT</option> <option>ESV (EXPERIMENTAL SAFETY VEHICLE) CONCEPT</option> <option>EVENT CONCEPT</option> <option>EVOS CONCEPT</option> <option>EX CONCEPT</option> <option>EXP II CONCEPT</option> <option>EXPEDITION EVEREST CONCEPT</option> <option>EXPEDITION FUNKMASTER FLEX CONCEPT</option> <option>EXPLORER AMERICA CONCEPT</option> <option>EXPLORER DESK DRIVE CONCEPT</option> <option>EXPLORER EXPERIMENTAL TRUCK CONCEPT</option> <option>EXPLORER SPORT TRAC CONCEPT</option> <option>EXPLORER SPORTSMAN CONCEPT</option> <option>F-150 LIGHTNING ROD CONCEPT</option> <option>F-250 SUPER CHIEF CONCEPT</option> <option>F-250 SUPER DUTY FABTECH CONCEPT</option> <option>F-350 TONKA CONCEPT</option> <option>FACTION CONCEPT</option> <option>FAIRLANE CONCEPT</option> <option>FAIRLANE SUPER COBRA CONCEPT</option> <option>FIESTA FANTASY CONCEPT</option> <option>FIESTA RS CONCEPT</option> <option>FIESTA ST CONCEPT</option> <option>FIESTA TUAREG CONCEPT</option> <option>FIESTA URBA CONCEPT</option> <option>FLAIR CONCEPT</option> <option>FLUX CONCEPT</option> <option>FOCUS C-MAX CONCEPT</option> <option>FOCUS CONCEPT</option> <option>FOCUS FCV CONCEPT</option> <option>FOCUS HOT WHEELS CONCEPT</option> <option>FOCUS TOURING CAR CONCEPT</option> <option>FOCUS VIGNALE CONCEPT</option> <option>FOCUS WAGON KONA CONCEPT</option> <option>FORTY NINE CONCEPT</option> <option>FREESTYLE FX CONCEPT</option> <option>FUSION CONCEPT</option> <option>FUSION FS WERKS CONCEPT</option> <option>FUSION STREET SCENE CONCEPT</option> <option>FUTURA CONCEPT</option> <option>FX ATMOS CONCEPT</option> <option>GHIA AEROSTAR CONCEPT</option> <option>GHIA APV CONCEPT</option> <option>GHIA ARIOSO CONCEPT</option> <option>GHIA BARCHETTA CONCEPT</option> <option>GHIA BEBOP CONCEPT</option> <option>GHIA BREZZA CONCEPT</option> <option>GHIA CISITALIA COUPE CONCEPT</option> <option>GHIA COCKPIT CONCEPT</option> <option>GHIA COINS CONCEPT</option> <option>GHIA CONNECTA CONCEPT</option> <option>GHIA FLASHBACK CONCEPT</option> <option>GHIA FOCUS CONCEPT</option> <option>GHIA GRANADA ALTAIR CONCEPT</option> <option>GHIA IXG CONCEPT</option> <option>GHIA LUCANO CONCEPT</option> <option>GHIA POCKAR CONCEPT</option> <option>GHIA PRIMA CONCEPT</option> <option>GHIA QUICKSILVER CONCEPT</option> <option>GHIA SAETTA CONCEPT</option> <option>GHIA SAGUARO CONCEPT</option> <option>GHIA SELENE II CONCEPT</option> <option>GHIA STREETKA CONCEPT</option> <option>GHIA TRIO CONCEPT</option> <option>GHIA TURING KA CONCEPT</option> <option>GHIA URBY CONCEPT</option> <option>GHIA VIA CONCEPT</option> <option>GHIA VIGNALE MUSTANG CONCEPT</option> <option>GHIA VIGNALE TSX-6 CONCEPT</option> <option>GHIA VIVACE CONCEPT</option> <option>GLOCAR CONCEPT</option> <option>GT40 CONCEPT</option> <option>GT70 CONCEPT</option> <option>GT90 CONCEPT</option> <option>GTX1 CONCEPT</option> <option>GYRON CONCEPT</option> <option>H2RV EXPLORER CONCEPT</option> <option>H2RV FOCUS CONCEPT</option> <option>HYBRID ESCAPE CONCEPT</option> <option>INDIGO CONCEPT</option> <option>INTERCEPTOR CONCEPT</option> <option>IOSIS CONCEPT</option> <option>IOSIS MAX CONCEPT</option> <option>IOSIS X CONCEPT</option> <option>KA CONCEPT</option> <option>L&#39;ATTITUDE CONCEPT</option> <option>L2K CONCEPT</option> <option>LA GALAXIE CONCEPT</option> <option>LA TOSCA CONCEPT</option> <option>LEVACAR CONCEPT</option> <option>LIBRE CONCEPT</option> <option>LIGHTWEIGHT FUSION CONCEPT</option> <option>LS CONCEPT</option> <option>LTD BERLINE CONCEPT</option> <option>LYNX CONCEPT</option> <option>MA CONCEPT</option> <option>MACH 2 COBRA CONCEPT</option> <option>MACH 2 CONCEPT</option> <option>MACHETE CONCEPT</option> <option>MAHARAJAH CONCEPT</option> <option>MARAUDER CONCEPT</option> <option>MARK I</option> <option>MARK III DUAL COWL PHAETON CONCEPT</option> <option>MARK LT CONCEPT</option> <option>MARK VII COMTECH CONCEPT</option> <option>MARK X CONCEPT</option> <option>MARQUE X CONCEPT</option> <option>MAVERICK ESTATE CONCEPT</option> <option>MAVERICK GRABBER II CONCEPT</option> <option>MAVERICK RUNABOUT CONCEPT</option> <option>MAXIMA CONCEPT</option> <option>MAYA CONCEPT</option> <option>MC2 CONCEPT</option> <option>MC4 CONCEPT</option> <option>MEGASTAR CONCEPT</option> <option>MEGASTAR II CONCEPT</option> <option>MESSENGER CONCEPT</option> <option>MEXICO CONCEPT</option> <option>MK9 CONCEPT</option> <option>MKC CONCEPT</option> <option>MKR CONCEPT</option> <option>MKS CONCEPT</option> <option>MKT CONCEPT</option> <option>MKX CONCEPT</option> <option>MKZ CONCEPT</option> <option>MODEL U CONCEPT</option> <option>MONDEO CONCEPT</option> <option>MONTANA LOBO CONCEPT</option> <option>MONTEGO CONCEPT</option> <option>MOUNTAINEER CONCEPT</option> <option>MUSTANG 007 CONCEPT</option> <option>MUSTANG COBRA JET TWIN-TURBO CONCEPT</option> <option>MUSTANG GIUGIARO CONCEPT</option> <option>MUSTANG GT CONCEPT</option> <option>MUSTANG GT-R CONCEPT</option> <option>MUSTANG I CONCEPT</option> <option>MUSTANG II CONCEPT</option> <option>MUSTANG MACH I CONCEPT</option> <option>MUSTANG MACH III CONCEPT</option> <option>MUSTANG MILANO CONCEPT</option> <option>MUSTANG RSX CONCEPT</option> <option>MUSTELA II CONCEPT</option> <option>MYSTERE CONCEPT</option> <option>MYSTIQUE CONCEPT</option> <option>NAVICROSS CONCEPT</option> <option>NAVIGATOR CONCEPT</option> <option>NAVIGATOR K CONCEPT</option> <option>NUCLEON CONCEPT</option> <option>ONE CONCEPT</option> <option>OPTIM CONCEPT</option> <option>P2000 CONCEPT</option> <option>PINTO II CONCEPT</option> <option>POWER STROKE CONCEPT</option> <option>POWERFORCE CONCEPT</option> <option>PREMYS CONCEPT</option> <option>PROBE I CONCEPT</option> <option>PROBE II CONCEPT</option> <option>PROBE III CONCEPT</option> <option>PROBE IV CONCEPT</option> <option>PROBE V CONCEPT</option> <option>PRODIGY CONCEPT</option> <option>PROFILE CONCEPT</option> <option>PUMA ST160 CONCEPT</option> <option>QUADRICYCLE CONCEPT</option> <option>RANGER BAJA BABY CONCEPT</option> <option>RANGER EDGE CONCEPT</option> <option>RANGER II CONCEPT</option> <option>RANGER SANDCOURT CONCEPT</option> <option>RANGER SEA SPLASH CONCEPT</option> <option>RANGER SKY SPLASH CONCEPT</option> <option>REFLEX CONCEPT</option> <option>ROX CONCEPT</option> <option>RS200 CONCEPT</option> <option>S2RV EXPLORER CONCEPT</option> <option>SANTA FE CONCEPT</option> <option>SAV CONCEPT</option> <option>SCRAMBLER CONCEPT</option> <option>SEATTLE-ITE XXI CONCEPT</option> <option>SENTINEL CONCEPT</option> <option>SHELBY COBRA CONCEPT</option> <option>SHELBY COBRA GT500 CONCEPT</option> <option>SHELBY GR-1 CONCEPT</option> <option>SHO-STAR CONCEPT</option> <option>SHOCCCWAVE CONCEPT</option> <option>SPLASH CONCEPT</option> <option>SPORT TRAC ADRENALIN CONCEPT</option> <option>START CONCEPT</option> <option>STREET F-150 CONCEPT</option> <option>SUPER CREWZER CONCEPT</option> <option>SUPER MARAUDER CONCEPT</option> <option>SUPERCHARGED THUNDERBIRD CONCEPT</option> <option>SUPERFLARE F-150 CONCEPT</option> <option>SURF EXPLORER CONCEPT</option> <option>SVT F-150 LIGHTNING CONCEPT</option> <option>SVT FOCUS COMPETITION CONCEPT</option> <option>SYNERGY 2010 CONCEPT</option> <option>SYNTHESIS 2010 CONCEPT</option> <option>SYNUS CONCEPT</option> <option>SYRTIS CONCEPT</option> <option>TAUNUS ALPENCOUPE SHOWCAR</option> <option>TAURUS BLACKBIRD (THUNDERBIRD) CONCEPT</option> <option>TAURUS SAFETY CONCEPT</option> <option>TECHNA CONCEPT</option> <option>THE BRAUNABILITY MXV CONCEPT</option> <option>THUNDERBIRD APOLLO CONCEPT</option> <option>THUNDERBIRD ITALIEN CONCEPT</option> <option>THUNDERBIRD ROADSTER CONCEPT</option> <option>THUNDERBIRD SATURN II CONCEPT</option> <option>TORINO KING COBRA CONCEPT</option> <option>TORINO MACHETE CONCEPT</option> <option>TOURNEO CUSTOM CONCEPT</option> <option>TRANSIT CONNECT FAMILY ONE CONCEPT</option> <option>TRANSIT CONNECT SPORTVAN CONCEPT</option> <option>TRANSIT CONNECT TAXI CONCEPT</option> <option>TREMOR CONCEPT</option> <option>TRIDON CONCEPT</option> <option>TRITON CONCEPT</option> <option>TWISTER CONCEPT</option> <option>URBAN EXPLORER CONCEPT</option> <option>VAQUERO CONCEPT</option> <option>VERTREK CONCEPT</option> <option>VERVE CONCEPT</option> <option>VIPER RANCHERO CONCEPT</option> <option>VISOS CONCEPT</option> <option>VOLANTE CONCEPT</option> <option>WINDSTAR SOLUTIONS CONCEPT</option> <option>WINDSTAR TEKSPORT CONCEPT</option> <option>X-100 CONCEPT</option> <option>X-2000 CONCEPT</option> <option>XL-500 CONCEPT</option> <option>XM TURNPIKE CRUISER CONCEPT</option> <option>ZIG AND ZAG CONCEPT</option> </index_list> <first_page><![CDATA[#]]></first_page> <prev_page><![CDATA[#]]></prev_page> <next_page><![CDATA[#]]></next_page> <last_page><![CDATA[#]]></last_page> <keyname>FORD_DSGN_CNCPT</keyname> <find><![CDATA[https://ford2.minisisinc.com/SCRIPTS14/MWIMAIN.DLL/1432419015/FIND?INDEXLIST&FORM=[FORD_INCLUDE]html~2Fcluster.html&TITLE=Browse~20FORD_DSGN_CNCPT&KEYNAME=FORD_DSGN_CNCPT&DATABASE=DESCRIPTION_OPAC3]]></find> </cluster>`
      }
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