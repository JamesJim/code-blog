function index(){
  console.log('index() route callback run');

  $('article').show(':lt(1)');
  $('#about-hide').hide();
  $('#other-hide').hide();
}

function home(){
  console.log('home() route callback run');

  $('article').show(':lt(1)');
  $('#about-hide').hide();
  $('#other-hide').hide();
}

function about(){
  console.log('about() route callback run');

  $('#about-hide').show();
  $('article').hide();
  $('#other-hide').hide();
}

function other(){
  console.log('other() route callback run');

  $('#other-hide').show();
  $('article').hide();
  $('#about-hide').hide();
}
