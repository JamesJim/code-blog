//document.ready
$(function(){
  // function getAllArticles(){
  //   $.getJSON('js/blogArticles.json', function(data){
  //     blogArticles = JSON.parse(data);
  //     console.log(blogArticles);
  //   });
  // }
  // getAllArticles();


  function sortByDate(A) {
    A.sort(
     function(a, b) {
       if (a.publishedOn < b.publishedOn) { return 1; }
       if (a.publishedOn > b.publishedOn) { return -1; }
       return 0;
     }
   );//end sort
 }//end dort by Date function



  function handlebarsOutput(object){
    //Handlebars now gets it's shape from the template.handlebars file
    $.get('template.handlebars', function(template){
      //compile the template
      var compiler = Handlebars.compile(template); //this is a string
      //save our data array in a variable so that we can make it an object
      var data = object;
      console.log(data.length);

      //function to build array of all category names from blog.rawData
      function getCategoryFilterItems(){
        var tempFilterArray = [];

        for(i=0; i<data.length; i++){
          tempFilterArray.push(data[i].category);

        }
        // console.log(tempFilterArray);
        return tempFilterArray;
      }
      //Store returned array in a variable
      var categoryStrings = getCategoryFilterItems();
      console.log(categoryStrings);
      console.log(categoryStrings.length);

      //function to build array of all author names from blog.rawData
      function getAuthorFilterItems(){
        var tempFilterArray = [];
        for(i=0; i<data.length; i++){
          tempFilterArray.push(data[i].author);
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
      } //end getUnique array function

      //Store returned unique arrays in a variable
      var uniqueCategories = getUnique(categoryStrings);
      var uniqueAuthors = getUnique(authorStrings);

      console.log(uniqueCategories);


      //load unique arrays into html select elements
      function printToSelect(array, elementId){
        for(i=0; i<array.length; i++){
          $(elementId).append('<option value=\''+array[i]+'\'>'+array[i]+'</option>');
          // console.log(array[i]);
        }
      } //end printToSelect function
      printToSelect(uniqueCategories, '#category-filter');
      printToSelect(uniqueAuthors, '#author-filter');


      console.log(uniqueCategories.length);
      console.log(uniqueAuthors.length);



      //sort by date Function
      sortByDate(data);
      console.log(data[0])
      //compile data and template
      var compiledHtml = compiler({data});
      //add compiled html to DOM by inserting an id attribute in an element
      $('#handlebarsOutput').html(compiledHtml);

    }); //end '.get' statement
  }; //end handlebars output statement


    function loadFromJson(eTag){
      //Set eTag since user local storage is not up to date
      localStorage.setItem('eTag', eTag);
      console.log('loadFromJson set local eTag: ' + localStorage.eTag);

      //Load articles from server and set data to local storage
      $.getJSON('js/blogArticles.json', function(data){
        localStorage.setItem('blogArticles', JSON.stringify(data));

        //run data through handlebars template
        handlebarsOutput(data);
        console.log("LOADED FROM JSON");
      });
    }//end loadFromJSON function

    var cachedBlog;
    //load page from local storage when cache is up to date
    function loadFromLocalStorage(){
      cachedBlog = JSON.parse(localStorage.getItem('blogArticles'));
      handlebarsOutput(cachedBlog);
      console.log("LOADED FROM LOCAL");

    };
    console.log("Access cachedBlog outside of fx: "+ cachedBlog);
// loadFromLocalStorage();


    // var eTag;
    //AJAX call to remote server to get the eTag - SLOW PROCESS!
    function eTagGetFromServer(){
      $.ajax({
        type: "HEAD", //Just checks head for data - use GET if want to get data
        url: "js/blogArticles.json",
        success: function(data, status, xhr){ //function must take all 3 parameters
          eTag = xhr.getResponseHeader('eTag'); //if successful, returns xhr
          console.log("Server eTag: " + eTag);
        } //end success response Function
      }).done(function(){

          // getBlogArticles();

          console.log("Local Storage eTag:"+localStorage.getItem('eTag'));
        if(localStorage.getItem('eTag')){
          console.log("if local storage exists truthy")
          if(localStorage.getItem('eTag') !== eTag){ //If tags don't match
          //load JSON file from server
          console.log('If eTags NOT EQUAL...LOAD FROM JSON');
          loadFromJson(eTag);
          }else{
          //load from user local storage
          console.log('If eTags ARE EQUAL...LOAD FROM LOCAL SERVER');
          loadFromLocalStorage(eTag);
          }
        } else{
          //if no eTag, load from JSON
          console.log('No eTag found');
          loadFromJson(eTag);
        }
        } //end of function inside of 'done'
      )}; //end done method and end of eTagGetFromServer function

eTagGetFromServer();



  $('.date').find('time').each( function(){
    var datePublished = $(this).text();
    var daysOld = 'Posted ' + parseInt((new Date() - new Date(datePublished))/60/60/24/1000) + ' days ago';
    $(this).text(daysOld);
  }); //end date calculation function

  //UPDATE THIS!!!  USED TO SELECT TEMPLATE ARTICLE BODY AND HIDE ALL BUT FIRST PARAGRAPH
  $('section.article-body').each( function(){
    $(this).children().not(':lt(1)').hide();
  }); //end preview article function







/*********** Class-02 Branch ************/


/******************Filter arrays and return unique values***********************/









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
    }); //end hide/show of appropriate articles on change when using filters


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
    }); //end expand button on click function



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

  }); //end document.ready
