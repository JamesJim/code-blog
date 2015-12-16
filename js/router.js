$(function(){




  page.base('/');

  //page('/', blog.index);
  page('home', home);
  page('about', about);

  page();

  function home(){
    console.log('home() route callback run');
    $('article').show();
    $('#about-hide').hide();
    $('other').hide();

  }

  function about(){
    console.log('about() route callback run');

    $('#about-hide').show();
    $('article').hide();
  }



});
