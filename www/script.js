$(document).ready(function(){
  const leaveButton = $('#leavingWrapper');
  const returnButton = $('#returningWrapper');
  const leaveContent = $('#leavingContentWrapper');
  const returnContent = $('#returningContentWrapper');
  const doneButton = $('.doneButton');
  const form = $('.form');
  const nameLeaveIn = $('#nameLeaveIn');
  const nameReturnIn = $('#nameReturnIn');
  const reasonIn = $('#reasonIn');
  const resultWrapper = $('#resultWrapper');
  const resultText = $('#resultText');

  nameLeaveIn.val('');
  nameReturnIn.val('');
  reasonIn.val('');

  leaveButton.click(function(){
    leaveContent.animate({'left': '0px'}, 400);
  });

  returnButton.click(function(){
    returnContent.animate({'left': '0px'}, 400);
  });

  doneButton.click(function(){
    $(this).parent().animate({'left': '-100%'}, 400);
  });

  function result(text, good){
    if(good) resultWrapper.css({'background-color': 'green'});
    else resultWrapper.css({'background-color': 'red'});
    resultText.text(text);
    resultWrapper.animate({'top': '0px', 'opacity': '1'}, 200);
    setTimeout(function(){
      resultWrapper.animate({'top': '-10%', 'opacity': '0'}, 200);
    }, 2000);
  }

  form.submit(function(e){
    e.preventDefault();
    if($(this).attr('submitType') == 'leave') formData = {type: 'leave', name: nameLeaveIn.val(), reason: reasonIn.val()};
    else if($(this).attr('submitType') == 'return') formData = {type: 'return', name: nameReturnIn.val()};
    $.ajax('http://42turtle.com/driverapp/php/submit.php', {
      type: 'POST',
      data: formData,
      success: function(data){
        console.log(data);
        let good;
        if(data == 'success') good = true;
        else good = false;
        result(data, good);
      }
    });
  });
});
