//document.ready
$(function(){

  function sortByDate(A) {
    A.sort(
     function(a, b) {
       if (a.publishedOn < b.publishedOn) { return 1; }
       if (a.publishedOn > b.publishedOn) { return -1; }
       return 0;
     }
   );
  }
  sortByDate(blog.rawData);


  function handlebarsOutput(){
    //Handlebars now gets it's shape from the template.handlebars file
    $.get('template.handlebars', function(template){

      //compile the template
      var renderer = Handlebars.compile(template); //this is a string
      //save our data array in a variable so that we can make it an object
      var data = blog.rawData;                  /*blog.rawData*/;
      //pass data to the template
      var compiledHtml = renderer({data});
      //add compiled html to DOM by inserting an id attribute in an element
      $('#handlebarsOutput').html(compiledHtml);
    });
  };

  handlebarsOutput();




  $(function() {

  //This section gets and sets local Storage
  //Check local storage for prior eTag
    //If no eTag, load data from server and set local storage eTag and data
    //If eTag, compare to server remote from AJAX call

  var eTagLocalStorage;

  //Check local storage for an eTag that would have been set prior
  function eTagCheckLocalStorage(){
    eTagLocalStorage = localStorage.getItem('eTagLocal', eTagLocal);
    console.log(eTagLocalStorage);
  }
  eTagCheckLocalStorage();

  //Used to set local storage eTag to what remote eTag was when they're not in sync
  function eTagSetLocalStorage(){
    localStorage.setItem('eTagLocal', eTag)
  }

  //AJAX call to remote server to get the eTag - SLOW PROCESS!
  function eTagGetFromServer(){
    $.ajax({
      type: "HEAD", //Just checks head for data - use GET if want to get data
      url: "js/blogArticles.json",
      success: function(data, status, xhr){ //function must take all 3 parameters
        eTag = xhr.getResponseHeader('eTag'); //if successful, returns xhr
        console.log("Server eTag: " + eTag);
      } //end success response Function
    }); //end ajax call
  } //end eTagGetFromServer Function
  eTagGetFromServer();

  function
  //save remote server eTag to localStorage prior to comparison
  // localStorage.setItem('remoteEtag', remoteEtag);
  // console.log(localStorage.remoteEtag);

//If there is a localStorage eTag, use AJAX to obtain eTag from remote server

  //
  //     //Compare remote and local eTags
  //     if(localStorage.setItem === doesEtagExist){
  //       //if eTags match, user's localStorage is up to date, render from local cache
  //       var toRender = JSON.parse(localStorage.getItem(blogArticles));
  //       //Then call handlebars?
  //       handlebars(toRender);
  //
  //     } else{
  //       //eTags do not match, remote is newer so render from remote server and set localStorage
  //       //Set local Storage
  //       localStorage.setItem('blogArticles', JSON.stringify(blogArticles.json));
  //
  //       //render from remote server as usual by calling function that outputs handlebars
  //       handlebars();
  //
  //
  //     }
  //
  //
  // }); //end ajax
  //
  // //If remote and local don't match, save remote's eTag as local storage
  //
  //
  // //When loading from Remote Server because local was not up to date...set local storage item
  // localStorage.setItem('blogArticles', JSON.stringify(blogArticles));
  // console.log("Local Storage Data: "+ localStorage.data);
  //
  // //When loading from Remote Server because local was not up to date...get JSON from file
  // $.getJSON('blogArticles.json').done( handlebarsOutput());




  }); //end document.ready













  $('.date').find('time').each( function(){
    var datePublished = $(this).text();
    var daysOld = 'Posted ' + parseInt((new Date() - new Date(datePublished))/60/60/24/1000) + ' days ago';
    $(this).text(daysOld);
  });

  $('section.article-body').each( function(){
    $(this).children().not(':lt(1)').hide();
  });


});




/*********** Class-02 Branch ************/


/******************Filter arrays and return unique values***********************/
  $(function() {

    //function to build array of all category names from blog.rawData
    function getCategoryFilterItems(){
      var tempFilterArray = [];
      for(i=0; i<blog.rawData.length; i++){
        tempFilterArray.push(blog.rawData[i].category);
      }
      // console.log(tempFilterArray);
      return tempFilterArray;
    }
    //Store returned array in a variable
    var categoryStrings = getCategoryFilterItems();

    //function to build array of all author names from blog.rawData
    function getAuthorFilterItems(){
      var tempFilterArray = [];
      for(i=0; i<blog.rawData.length; i++){
        tempFilterArray.push(blog.rawData[i].author);
      }
      // console.log(tempFilterArray);
      return tempFilterArray;
    }
    //Store returned array in a variable
    var authorStrings = getAuthorFilterItems();




    //Function to put all the unique items in an array
    function getUnique(inputArray){

      var outputArray = [];

      for (i=0; i < inputArray.length; i++){
        //If inputArray item is not in outputArray, then push item to output array
        if (($.inArray(inputArray[i], outputArray)) == -1){
          outputArray.push(inputArray[i]);
        }
      }
      return outputArray;
    }
    //Store returned unique arrays in a variable
    var uniqueCategories = getUnique(categoryStrings);
    var uniqueAuthors = getUnique(authorStrings);





    //Functions to print unique arrays and option tags to the select tag
    function printToSelect(array, elementId){
      for(i=0; i<array.length; i++){
        $(elementId).append('<option value=\''+array[i]+'\'>'+array[i]+'</option>');
        // console.log(array[i]);
      }
    }
    printToSelect(uniqueCategories, '#category-filter');
    printToSelect(uniqueAuthors, '#author-filter');


    /********************EVENT LISTENERS******************************/

    //On Author or Category select change, hide all divs, then show selected's preview
    $('select').on('change', function (e) {
      // console.log('event', e);
      // console.log('this', this)
      var $selection = $(this).val();
      console.log($selection);
      if( ($selection == 'Filter by category') || ($selection == 'Filter by author')){
        $('article').show();
      } else if($(this).attr('id') == 'author-filter'){
        // console.log($(this).attr('id'));
        $('article').hide();
        console.log($('.authorUrl:contains(\'' + $selection + '\')').parents('article'));
        $('.authorUrl:contains(\'' + $selection + '\')').parents('article').show(':lt(2)');
      } else {
        $('article').hide();
        $('.category:contains(\'' + $selection + '\')').parents('article').show(':lt(2)');
      }
    });





    //When button clicked, toggle button text; toggle expand and retract
    $('.expand-button').on('click', function(e){
      var $this = $(this);

      //Scroll to the top of the section when clicked
      $('html, body').animate({ scrollTop: $this.parents('article').offset().top }, 100);

      //Toggle the button text each time it's clicked
      $this.text(function(i, text){
        return text === 'I\'m Done!' ? 'Show Full Post' : 'I\'m Done!';
      });

      //Was trying to use the same toggle language but realized you can't 'hide' a 'show!'
      $(this).parent().prev().children().show(function(i, show){
        return show === ':gt(0)' ? ':lt(3)' : ':gt(0)';
      });

      //So then I tried to add language to say, when everything is shown (based on button text),
      //hide all but first three paragraphs
      if($(this).text() == 'Show Full Post') {
        $(this).parent().prev().children().hide(':gt(2)');
      }
    });



    //Toggle class of About when link clicked
    $('.about-link').on('click', function(e){
      $('article').hide();
      $('#about-hide').css('display', 'flex');
    });

    //Close about section
    $('.about-button').on('click', function(e){
      $('article').show();
      $('#about-hide').css('display', 'none');
    });

  });
