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
  $('#surveyButton').on('click', function (e) {
    $('#surveyModal').fadeIn(400);
  })

  $('#requestButton').on('click', function (e) {
    $('#requestModal').fadeIn(400);
  })

  $('.surveyCloseButton').on('click', function (e) {
    $('#surveyModal').fadeOut(250);
  })
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

});

// HELPER FUNCTIONS
function removeWhiteSpace(string) {
  return string.replace(/(\r\n|\n|\r)/gm, "");
}