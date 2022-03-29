$(document).ready(function () {


    let survey = new Survey();
    survey.init()


    // Expand filter on click
    $(".surveySelect").on("click", function () {
        let dropdown = $(this).find($(".surveyDropdown"));

        if (dropdown.hasClass("hideDropdown")) {
            survey.openDrowdown($(this));
        }
        else {
            survey.closeAllDropdown();
        }
        // filter.updateHiddenKeywordValue();

    });

    $(".surveyDropdown ul li").on("click", function () {
        survey.selectDropdownValue($(this));
        setTimeout(function () {
            survey.closeAllDropdown();
        }, 10);
    });

    // When clicking out of the filter, option is closed
    $(document).mouseup(function (e) {
        let container = $(".surveySelect");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            survey.closeAllDropdown();
        }
    });


    $('#surveyModal  input[type=radio]').change(function () {
        const RATE = {
            '--': 0,
            '-': 1,
            '-+': 2,
            '+': 3,
            '++': 4
        }

        survey.updateSurveyRate(this.name, RATE[this.value])
    });

    $('#surveyComment').change(function () {
        survey.updateSurveyComment(this.value);
    })

})

class Survey {
    constructor() {
        this.subject = '';
        this.topic = '';
        this.comment = '';
        this.information = 0;
        this.visual = 0;
        this.easeOfUse = 0;
        this.overall = 0;
    }

    selectDropdownValue(dropdownDOM) {
        let value = dropdownDOM.text();
        let dropdownText = dropdownDOM
            .parent()
            .parent()
            .parent()
            .find(".surveyText");

        let dropdown = dropdownText.data("dropdown").toLowerCase();
        dropdownText.text(value);
        this[dropdown] = value;
        console.log(this);
    }

    openDrowdown(dropdownDOM) {
        let expand = dropdownDOM.find($(".expand"));
        let dropdown = dropdownDOM.find($(".surveyDropdown"));
        expand.text(
            dropdown.hasClass("hideDropdown") ? "expand_less" : "expand_more"
        );
        this.closeAllDropdown();
        setTimeout(function () {
            dropdown.toggleClass("hideDropdown");
        }, 100);
    }

    closeAllDropdown() {
        let dropdown = $(".surveyDropdown");
        dropdown.each(function () {
            if (!$(this).hasClass("hideDropdown")) {
                $(this).addClass("hideDropdown");
                $(this).parent().find('.expand').text("expand_more")
            }
        });
    }

    updateSurveyComment(value) {
        console.log(value);
    }

    updateSurveyRate(name, value) {
        this[name] = value;
    }


    init() {
        //  Modal Handle
        $('#surveyButton').on('click', function (e) {
            $('#surveyModal').fadeIn(400);
        })


        $('.surveyCloseButton').on('click', function (e) {
            $('#surveyModal').fadeOut(200);
        })

        $(document).on('keyup', function (e) {
            if (e.key == "Escape") {
                $('#surveyModal').fadeOut(200);
            }
        });
        // Hide dropdown menu on click outside
        $('#surveyModal').on('click', function (e) {
            $('#surveyModal').fadeOut(200);

        });

        $('#surveyModal .modalBody').on('click', function (e) {
            e.stopPropagation();
        });

    }

}