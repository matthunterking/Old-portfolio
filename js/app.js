$(() => {

  const projects = $('.project');
  const gaps = $('.gap');

  console.log(projects);

  projects.on('mouseover', grow);
  projects.on('mouseout', shrink);

  function grow() {
    $(this).css('flex-basis', '80%');
    if(parseInt($(this).attr('class').split(' ')[1][7]) < 3) {
      gaps.first().css('flex-basis', '48%');
    } else if(parseInt($(this).attr('class').split(' ')[1][7]) > 3) {
      gaps.last().css('flex-basis', '48%');
    }
    setTimeout(() => {
      $('.projectDetails').css('visibility', 'visible');
      $(this).css('filter', 'grayscale(0%)');
    }, 3000);
  }

  function shrink() {
    $(this).css('flex-basis', '15%');
    $('.projectDetails').css('visibility', 'hidden');
    $(this).css('filter', 'grayscale(100%)');
    if(parseInt($(this).attr('class').split(' ')[1][7]) < 3) {
      gaps.first().css('flex-basis', '1%');
    } else if(parseInt($(this).attr('class').split(' ')[1][7]) > 3) {
      gaps.last().css('flex-basis', '1%');
    }
  }

});
