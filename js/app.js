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
    if(moving) return;
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

  // function hover() {
  //   projects.off('mouseover', hover);
  //   console.log(projects, 'dont have hover');
  //   console.log('hover', $(this)[0].id);
  //   grow($(this)[0].id);
  // }
  //
  // function mouseout() {
  //   console.log('mouseOut', $(this));
  //   shrink($(this)[0].id);
  // }




  let animationPlaying = false;
  const isMobile = window.matchMedia('(max-width: 700px)').matches;

  if(isMobile) {
    projects.on('click', mobileGrow);
  } else {
    projects.on('mouseover', grow);
  }

  function mobileGrow() {
    const startHeight = $(this).height();
    const id = $(this)[0].id;
    resetMobile();
    if(startHeight < 150) {
      $(this).css('height', '700px');
      setTimeout(() => {
        $(`.projectDetails${id}`).fadeIn();
      }, 2000);
    }
  }

  function resetMobile() {
    projects.css('height', '110px');
    $('.projectDetails1').fadeOut();
    $('.projectDetails2').fadeOut();
    $('.projectDetails3').fadeOut();
    $('.projectDetails4').fadeOut();
    $('.projectDetails5').fadeOut();
  }


  function grow() {
    if(animationPlaying) return;
    projects.off('mouseover', grow);
    const id = $(this)[0].id;
    animationPlaying = true;
    $(this).css('flex-basis', '80%');
    if(parseInt(id) < 3) {
      gaps.first().css('flex-basis', '48%');
    } else if(parseInt(id) > 3) {
      gaps.last().css('flex-basis', '48%');
    }
    setTimeout(() => {
      // $(`.projectDetails${id}`).append(`<div class='projectText'>Project ${id} was great</div>
      // <div class='projectScreenshot${id}'></div>`);
      $(`.projectDetails${id}`).fadeIn();
      $(`#${id}`).on('mouseout', shrink);
      animationPlaying = false;
    }, 3000);

  }

  function shrink() {
    if(animationPlaying) return;
    animationPlaying = true;
    const id = $(this)[0].id;
    $(this).off('mouseout', shrink);
    $(`.projectDetails${id}`).fadeOut();
    $(`#${id}`).css('flex-basis', '15%');
    if(parseInt(id) < 3) {
      gaps.first().css('flex-basis', '1%');
    } else if(parseInt(id) > 3) {
      gaps.last().css('flex-basis', '1%');
    }
    setTimeout(() => {
      projects.on('mouseover', grow);
      animationPlaying = false;
    }, 3000);
  }

  $('.technology').on('mouseover', function() {
    $(this).css('color', '#FF7D08');
  });

  $('.technology').on('mouseout', function() {
    $(this).css('color', 'white');
  });

});
