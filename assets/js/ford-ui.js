$(document).ready(function () {

  let backTopBtn = $("#backTop");
  // Back to top Button
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      backTopBtn.addClass("show");
    } else {
      backTopBtn.removeClass("show");
    }
  });


  backTopBtn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });
  // Back to top Button



  //  Modal Handle
  // $('#surveyButton').on('click', function (e) {
  //   $('#surveyModal').fadeIn(400);
  // })

  // $('#requestButton').on('click', function (e) {
  //   $('#requestModal').fadeIn(400);
  // })

  // $('.surveyCloseButton').on('click', function (e) {
  //   $('#surveyModal').fadeOut(200);
  // })

  // $(document).on('keyup', function (e) {

  //   if (e.key == "Escape") {
  //     $('#surveyModal').fadeOut(200);
  //   }
  // });
  // // Hide dropdown menu on click outside
  // $('#surveyModal').on('click', function (e) {

  //   $('#surveyModal').fadeOut(200);


  // });
  // $('#surveyModal .modalBody').on('click', function (e) {
  //   e.stopPropagation();
  // });

  // Modal Handle

  // Home Latest from Archive section
  let currentLatestArchive = 1;
  let latestArchiveArray = $('.latestArchive');
  $('.latestArchiveNext').on('click', function (e) {
    if (currentLatestArchive < latestArchiveArray.length) {
      latestArchiveArray.eq(currentLatestArchive - 1).toggleClass('hidden')
      currentLatestArchive++;
      latestArchiveArray.eq(currentLatestArchive - 1).toggleClass('hidden')
      $('#currentLatestArchive').text(currentLatestArchive)
    }
  })

  $('.latestArchivePrev').on('click', function (e) {
    if (currentLatestArchive > 1) {
      latestArchiveArray.eq(currentLatestArchive - 1).toggleClass('hidden')
      currentLatestArchive--;
      latestArchiveArray.eq(currentLatestArchive - 1).toggleClass('hidden')
      $('#currentLatestArchive').text(currentLatestArchive)
    }
  })
  // Home Latest from Archive section


  // Black Box Mobile Expand 
  $('.expandBlackboxButton').on('click', function () {
    let collapseSection = $(this).parent().parent().find('.blackBoxCollapse')

    collapseSection.toggleClass('openBlackBoxCollapse')
  })



  // Black Box Mobile Expand 


  // Trending Now Hover Effect





  $(".trendingShadowLayer").parent().on('mouseenter', function () {
    $(this).find($('.trendingShadowLayer')).css('background', 'linear-gradient(180deg,rgba(20, 20, 41, 0) 0%,rgba(9, 9, 21, 0.8) 80%)')
  });
  $(".trendingShadowLayer").parent().on('mouseleave', function () {
    $(this).find($('.trendingShadowLayer')).css('background', 'linear-gradient(180deg, rgba(20, 20, 41, 0) 0%, rgba(9, 9, 21, 0.61) 100% )')
  });

});

// HELPER FUNCTIONS
function removeWhiteSpace(string) {
  return string.replace(/(\r\n|\n|\r)/gm, "");
}