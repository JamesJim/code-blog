
  function home(){
    console.log('home() route callback run');
    $('#about-hide').hide();
    $('#other-hide').hide();
    $('article').show(':lt(1)');

  }

  function about(){
    console.log('about() route callback run');

    $('article').hide();
    $('#other-hide').hide();
    $('#about-hide').show();
  }

  function other(){
    console.log('about() route callback run');

    $('article').hide();
    $('#about-hide').hide();
    $('#other-hide').show();

  }
