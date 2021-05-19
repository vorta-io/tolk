function toggleStartButtons() {
  $(".js-start-batch-translation").toggle();
  $(".js-stop-batch-translation").toggle()
};

function setPercentage(percentage) {
  $('.js-percent-completed').html(percentage.toString() + '%');
  $('.card svg circle').css('stroke-dashoffset', (440 - (440 * percentage) / 100));
}

// global variable used to control continuos request for translation
var processing = false;

function send_translation_request(url) {
  $.ajax({
    url: $target.data('url'),
    data: {},
    method: 'POST',
    success: function (response) {
      $('.js-completed-translation-count').html(response.completed_translations_count);
      $('.js-without-translation-count').html(response.phrases_without_translation_count);

      if (processing) {
        send_translation_request(url);
      }
    }
  })
}

$(function () {  
  $(".js-start-batch-translation").click(function (e) {
    e.preventDefault();
    processing = true;
    toggleStartButtons();

    $target = $(e.currentTarget);
    send_translation_request($target.data('url'))
  });

  $(".js-stop-batch-translation").click(function (e) {
    e.preventDefault();
    processing = false
    toggleStartButtons();    
  });

  setPercentage($('.js-percent-completed').data('initial-value'));
})

