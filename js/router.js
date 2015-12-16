page.base('/');

$(function(){
  page();

  //page('/', blog.index);
  page('home', home);
  page('about', about);
  page('other', other);

});
