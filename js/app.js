//document.ready
// $(function(){

var myFunctions = {};

// webDB.init();


   // var eTag;
   //AJAX call to remote server to get the eTag - SLOW PROCESS!
   myFunctions.eTagGetFromServer = function (){
     $.ajax({
       type: "HEAD", //Just checks head for data - use GET if want to get data
       url: "js/test.json",
       success: function(data, status, xhr){ //function must take all 3 parameters
         eTag = xhr.getResponseHeader('eTag'); //if successful, returns xhr
         console.log("GET SERVER eTag: " + eTag);
       } //end success response Function
     }).done(function(){

         console.log("GET LOCAL STORAGE eTag:"+localStorage.getItem('eTag'));

       if(localStorage.getItem('eTag')){
         console.log("Evaluating if local storage exists/is truthy...")

         if(localStorage.getItem('eTag') !== eTag){ //If tags don't match

           //load JSON file from server
           console.log('eTags NOT EQUAL');
           myFunctions.loadFromJson(eTag);
           console.log("LOADED FROM JSON");

           localStorage.setItem('eTag', eTag);
           console.log('SET LOCAL eTag: ' + localStorage.eTag);



         }else{
           //load from user local storage
           console.log('eTags ARE EQUAL');
           myFunctions.loadFromLocalStorage(eTag);


         }
       } else{
         //if no eTag, load from JSON
         console.log('No eTag found');
         myFunctions.loadFromJson(eTag);

         localStorage.setItem('eTag', eTag);
         console.log('SET LOCAL eTag: ' + localStorage.eTag);

       }
     } //end of function inside of 'done'
  )}; //end done method and end of eTagGetFromServer function

myFunctions.eTagGetFromServer();

var data;
myFunctions.loadFromJson = function(eTag){

  //remove old outdated table and set up new table
  $.getJSON('js/test.json', function(data){
    console.log('LOADED FROM JSON', data);

    webDB.init();
    webDB.execute('DROP TABLE articles;');
    webDB.setupTables();
    myFunctions.convertMarkdown(data);
    myFunctions.sortByDate(data);
    webDB.insertAllRecords(data);
    //run data through handlebars template
    console.log('FROM JSON BEFORE HANDLEBARS', data);
    handlebarsOutput(data);
    generateStats(data);


    //Set eTag since user local storage is not up to date


  }).done( function(){//end getJSON CALL
    console.log('getJSON.done');
    //  webDB.execute('DROP TABLE articles;');

      // localStorage.setItem('blogArticles', JSON.stringify(data));

     //  //generate statistics
     //  console.log('GENERATING STATS...',data);


   }); //end .done()

  }//end loadFromJSON function

  var cachedBlog;
  //load page from local storage when cache is up to date
  myFunctions.loadFromLocalStorage = function(){
    // cachedBlog = JSON.parse(localStorage.getItem('blogArticles'));

    $dbOut = $('#dbOut');
    webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
    webDB.getAllArticles();
    console.log('FROM LOCAL STORAGE, BEFORE HANDLEBARS', data);

    // cachedBlog = webDB.execute('SELECT * FROM articles;');

    handlebarsOutput(data);
    console.log("LOADED FROM LOCAL", data);

    //generate statistics
  //   console.log('GENERATING STATS...');
    // generateStats(data);

  }; //end loadFromLocalStorage function


  function handlebarsOutput(object){
    console.log('HANDLEBARS IS RUNNING');
    var data = object;

    webDB.getDistinctAuthors(showDistinctAuthors);
    webDB.getDistinctCategories(showDistinctCategories);

    /***** MOVE STEP TO COMPILE FUNCTION ******/

    // webDB.getAllArticles(showArticles);
    // console.log('AFTER TABLE SETUP', data);
    //
    // $dbOut = $('#dbOut');
    // console.log('$dbOut: ',$dbOut);

    /************ GET DATA **************/

    //Handlebars now gets it's shape from the template.handlebars file
    $.get('handlebarstemplate.html', function(template){
      console.log('GOT HANDLEBARS TEMPLATE', template);


      //compile the template
      var compiler = Handlebars.compile(template); //this is a string
      //save our data array in a variable so that we can make it an object
      console.log('COMPILED HANDLEBARS', template);


      /************* COMPILE TEMPLATE *************/

      var compiledHtml = compiler({data});
      //add compiled html to DOM by inserting an id attribute in an element
      $('#handlebarsOutput').html(compiledHtml);



      /********************EVENT LISTENERS******************************/
      //preview first paragraph
      $('.article-body').find('p').hide().show(':lt(1)');

      //On Author or Category select change, hide all divs, then show selected's preview
      $('select').on('change', function (e) {

        // console.log('this', this)
        var $selection = $(this).val();
        console.log('selection: '+ $selection);

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


      /****************** TOGGLE EXPAND BUTTON *******************/

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

      /****************** ABOUT/OTHER PAGE **********************/

      // //Toggle class of About when link clicked
      // $('.about-link').on('click', function(e){
      //   $('article').hide();
      //   $('#about-hide').css('display', 'flex');
      // });
      //
      // //Close about section
      // $('.about-button').on('click', function(e){
      //   $('article').show(':lt(1)');
      //   $('#about-hide').css('display', 'none');
      // });
      //
      // //Toggle class of OTHER when link clicked
      // $('.other-link').on('click', function(e){
      //   $('article').hide();
      //   $('#other-hide').css('display', 'flex');
      // });
      //
      // //Close about section
      // $('.other-button').on('click', function(e){
      //   $('article').show(':lt(1)');
      //   $('#about-hide').css('display', 'none');
      // });

      /************* CALCULATE DAYS PUBLISHED *************/

      $('.date').find('time').each( function(){
        var datePublished = $(this).text();
        var daysOld = 'Posted ' + parseInt((new Date() - new Date(datePublished))/60/60/24/1000) + ' days ago';
        $(this).text(daysOld);
      }); //end date calculation function


      //UPDATE THIS!!!  USED TO SELECT TEMPLATE ARTICLE BODY AND HIDE ALL BUT FIRST PARAGRAPH
      $('section.article-body').each( function(){
        $(this).children().not(':lt(3)').hide();
      }); //end preview article function


      $(document).ready(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
   }); //end '.get' statement for template

  }; //end handlebars output statement

  myFunctions.sortByDate = function(A) {
    console.log('SORT BY DATE IS RUNNING');

    A.sort(
     function(a, b) {
       if (a.publishedOn < b.publishedOn) { return 1; }
       if (a.publishedOn > b.publishedOn) { return -1; }
       return 0;
     }
   );//end sort
 }//end sort by Date function


 myFunctions.convertMarkdown = function(data){
   console.log('CONVERT MARKDOWN IS RUNNING');

      for(i=0; i<data.length; i++){
       if(data[i].markdown){
          data[i].body = marked(data[i].markdown);
       }
      };
         console.log("Markdown Converted", data);
      }

 // //load unique arrays into html select elements
 // myFunctions.printCategoryToSelect = function(array, elementId){
 //   console.log('PRINT CATEGORY TO SELECT IS RUNNING');
 //   for(i=0; i<array.length; i++){
 //     $(elementId).append('<option value=\''+array[i].category+'\'>'+array[i].category+'</option>');
 //     console.log('TO FILTER: ',array[i].category);
 //   }
 // } //end printToSelect function

 // //load unique arrays into html select elements
 // myFunctions.printAuthorToSelect = function(array, elementId){
 //   console.log('PRINT AUTHOR TO SELECT IS RUNNING');
 //   for(i=0; i<array.length; i++){
 //     $(elementId).append('<option value=\''+array[i].author+'\'>'+array[i].author+'</option>');
 //     console.log('TO FILTER: ',array[i]);
 //   }
 // } //end printToSelect function





  // }); //end document.ready
