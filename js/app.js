$(() => {
  console.log('Thanks for checking out my website. If you would like to get in touch please contact me at matthunterking@gmail.com');
  console.table({
    email: 'matthunterking@gmail.com',
    linkedIn: 'linkedin.com/in/matthunterking',
    github: 'github.com/matthunterking'
  });

  const locations = ['#header', '#professional', '#projects', '#about', '#contact'];
  let currentLocation = 0;
  let moving = false;

  $(window).on('scroll', () => {
    if (moving) return;
    if ($(window).scrollTop() > $(locations[currentLocation]).offset().top) {
      currentLocation++;
      if (currentLocation > locations.length - 1) {
        currentLocation = locations.length - 1;
      }
      movePage(locations[currentLocation]);
    } else {
      currentLocation--;
      if (currentLocation < 0) {
        currentLocation = 0;
      }
      movePage(locations[currentLocation]);
    }
  });


  function movePage(location) {
    moving = true;
    $('.diamond').removeClass('selected');
    $(`.${location.slice(1)}`).addClass('selected');
    $('html, body').animate({
      scrollTop: $(location).offset().top
    }, 800, function () {
      window.location.hash = location;
    });
    setTimeout(() => {
      moving = false;
    }, 1200);
  }
});
