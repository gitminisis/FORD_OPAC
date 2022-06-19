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


    $('#survey-submit').on('click', function (e) {
        survey.submit();
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
        this.backTop = false;
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

        this.comment = value;
    }

    updateSurveyRate(name, value) {
        this[name] = value;
    }

    submit() {
        if (this.topic === '') {
            new MessageModal('Please select a topic').open()
            return;
        }

        let survey = this;
        let SESSID = document.getElementById('sessionid').innerText.trim();
        let subject = survey.subject;
        let body = `Ford Heritage Vault User Experience Feedback\n\nTopic: ${survey.topic}\nRate this page: \n Information: ${this.information}/5 \n Visual Appeal: ${this.visual}/5 \n Ease of Use: ${this.easeOfUse}/5 \n Overall: ${this.overall}/5 \n \n Comments: ${this.comment}`
        let receiver = 'archives@ford.com'
        let sender = 'noreply@minisisinc.com';
        let url = `${SESSID}?save_mail_form&async=y&xml=y&subject_default=${subject}&from_default=${sender}&to_default=${receiver}`;
        $.ajax({
            type: "POST",
            url: url,
            data: `sender=${sender}&receiver=${receiver}&subject=${subject}&mailbody=${body}`,

        }).done(function (res) {
            survey.closeModal();
            let toast = new MessageModal('Your feedback has successfully been sent!')
            toast.open();
        });


    }
    openModal() {
        $('#surveyModal').fadeIn(400);
        if ($('#backTop').hasClass('show')) {
            $('#backTop').removeClass('show');
            this.backTop = true;
        }
    }

    closeModal() {
        $('#surveyModal').fadeOut(200);
        if (this.backTop) {
            $('#backTop').addClass('show');
            this.backTop = false;
        }
        this.reset();
    }

    reset() {
        $(".surveyText").eq(0).text('Please Select')
        $(".surveyText").eq(1).text('Choose a topic for your comments')
        $("textarea#surveyComment").val('');
        $('input[name="information"]').prop('checked', false);
        $('input[name="visual"]').prop('checked', false);
        $('input[name="easeOfUse"]').prop('checked', false);
        $('input[name="overall"]').prop('checked', false);
    }


    init() {
        let survey = this;
        $('#surveyButton').on('click', function (e) {
            survey.openModal();
        })


        $('.surveyCloseButton').on('click', function (e) {
            survey.closeModal();
        })

        $(document).on('keyup', function (e) {
            if (e.key == "Escape") {
                survey.closeModal();
            }
        });
        // Hide dropdown menu on click outside
        $('#surveyModal').on('click', function (e) {
            survey.closeModal();

        });

        $('#surveyModal .modalBody').on('click', function (e) {
            e.stopPropagation();
        });

    }

}