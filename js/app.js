$(() => {

  const locations = [ '#header', '#projects', '#about', '#contact' ];
  let currentLocation = 0;
  let moving = false;

  $(window).on('scroll', () => {
    if(moving) return;
    if($(window).scrollTop() > $(locations[currentLocation]).offset().top) {
      currentLocation ++;
      if(currentLocation > locations.length - 1) {
        currentLocation = locations.length - 1;
      }
      movePage(locations[currentLocation]);
    } else {
      currentLocation --;
      if(currentLocation < 0) {
        currentLocation = 0;
      }
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

  projects.on('mouseover', hover);

  function hover() {
    projects.off('mouseover', hover);
    console.log(projects, 'dont have hover')
    console.log('hover', $(this)[0].id);
    grow($(this)[0].id);
  }

  function mouseout() {
    console.log('mouseOut', $(this));
    shrink($(this)[0].id);
  }

  function grow(id) {
    $(`#${id}`).css('flex-basis', '80%');
    if(parseInt(id) < 3) {
      gaps.first().css('flex-basis', '48%');
    } else if(parseInt(id) > 3) {
      gaps.last().css('flex-basis', '48%');
    }
    $(`.projectDetails${id}`).fadeIn();
    $(`#${id}`).on('mouseout', mouseout);
    console.log($(`#${id}`), 'has mouseout');

  }

  function shrink(id) {
    projects.off('mouseout', mouseout);
    console.log(projects, 'dont have mouseout');
    $(`.projectDetails${id}`).fadeOut();
    $(`#${id}`).css('flex-basis', '15%');
    if(parseInt(id) < 3) {
      gaps.first().css('flex-basis', '1%');
    } else if(parseInt(id) > 3) {
      gaps.last().css('flex-basis', '1%');
    }
    projects.on('mouseover', hover);
    console.log(projects, 'have hover');
  }

  $('.technology').on('mouseover', function() {
    $(this).css('color', '#FF7D08');
  });

  $('.technology').on('mouseout', function() {
    $(this).css('color', 'white');
  });

});
