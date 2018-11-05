$(() => {

  const locations = [ '#header', '#projects', '#about', '#contact' ];
  let currentLocation = 0;
  let moving = false;

  $(window).on('scroll', () => {
    if(moving) return;
    if($(window).scrollTop() > $(locations[currentLocation]).offset().top) {
      console.log('down');
      currentLocation ++;
      if(currentLocation > locations.length - 1) {
        currentLocation = locations.length - 1;
      }
      console.log(currentLocation);
      movePage(locations[currentLocation]);
    } else {
      console.log('up');
      currentLocation --;
      if(currentLocation < 0) {
        currentLocation = 0;
      }
      console.log(currentLocation);
      movePage(locations[currentLocation]);
    }
  });


  $('a').on('click', function() {
    movePage(this.hash);
  });

  function movePage(location) {
    moving = true;
    $('.diamond').removeClass('selected');
    $(`.${location.slice(1)}`).addClass('selected');
    $('html, body').animate({
      scrollTop: $(location).offset().top
    }, 800, function(){
      window.location.hash = location;
    });
    setTimeout(() => {
      moving = false;
    }, 1200);
  }





  const projects = $('.project');
  const gaps = $('.gap');

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
    // $(this).css('filter', 'grayscale(100%)');
    if(parseInt($(this).attr('class').split(' ')[1][7]) < 3) {
      gaps.first().css('flex-basis', '1%');
    } else if(parseInt($(this).attr('class').split(' ')[1][7]) > 3) {
      gaps.last().css('flex-basis', '1%');
    }
  }

  let circles = [];
  let currentCircle;

  $('#header').on('mousemove', (event) => {
    const circle = $('<div class="circle"></div>');
    currentCircle = circle;
    $('#header').append(circle);
    circles.push(circle);
    circle.css({ top: event.clientY - 200, left: event.clientX - 200 });
    const circlesToRemove = circles.filter((circle, index) => index !== circles.length -1);
    console.log(circlesToRemove);
    circlesToRemove.forEach(circle => {
      setTimeout(() => {
        circle.css({ top: event.clientY - 50, left: event.clientX - 50, height: '100px', width: '100px', opacity: 0 });
        currentCircle.css({ top: event.clientY - 200, left: event.clientX - 200, height: '400px', width: '400px', opacity: 0.6 });
      }, 100);
    });
  });

  setInterval(() => {
    circles.forEach(circle => circle.remove());
    const circle = $('<div class="circle"></div>');
    currentCircle = circle;
    circles.push(circle);
    $('#header').append(circle);
    console.log(circles);
    circle.css({ top: event.clientY - 200, left: event.clientX - 200 });
  }, 4000);


});
