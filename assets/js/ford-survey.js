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
            new MessageModal('Please select a topic').open();
            return;
        }
    
        let survey = this;
        let SESSID = document.getElementById('sessionid')?.innerText.trim();
    
        if (!SESSID || SESSID === '^sessid^') {
            $.ajax({
                type: "GET",
                url: '/scripts/mwimain.dll?logon&application=DESCRIPTION_OPAC3&language=144&file=[FORD_ROOT]home.html',
                success: function (response) {
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(response, 'text/html');
                    SESSID = doc.getElementById('sessionid')?.innerText.trim();
    
                    if (!SESSID) {
                        new MessageModal('Session ID not found in the response. Please try again later.').open();
                        return;
                    }
    
                    survey.sendFeedback(SESSID); // Call the feedback function with the retrieved session ID
                },
                error: function () {
                    new MessageModal('Failed to retrieve session ID. Please try again later.').open();
                }
            });
        } else {
            this.sendFeedback(SESSID); // Call the feedback function directly if SESSID exists
        }
    }
    
    sendFeedback(SESSID) {
        let survey = this;
        let subject = survey.subject;
        let body = `Ford Heritage Vault User Feedback\n\nTopic: ${survey.topic} \n \n Comments: ${this.comment}`;
        let receiver = 'archives@ford.com';
        let sender = 'noreply@minisisinc.com';
        let url = `${SESSID}?save_mail_form&async=y&xml=y&subject_default=${subject}&from_default=${sender}&to_default=${receiver}`;
    
        $.ajax({
            type: "POST",
            url: url,
            data: `sender=${sender}&receiver=${receiver}&subject=${subject}&mailbody=${body}`,
            success: function () {
                survey.closeModal();
                new MessageModal('Your feedback has successfully been sent!').open();
            },
            error: function () {
                new MessageModal('Failed to send feedback. Please try again later.').open();
            }
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

        $('.contactUs').on('click', function (e) {
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