/*********** Class-01 Branch ************/


//Constructor function for articles
  function makeArticle(obj){
    this.title = obj.title;
    this.category = obj.category;
    this.author = obj.author;
    this.authorUrl = obj.authorUrl;
    this.publishedOn = obj.publishedOn;
    this.body = obj.body;
  }


// Prototype function to insert blog info into DOM
  makeArticle.prototype.toHtml = function() {
    var $newAr = $('.arTemplate').clone();
    $newAr.removeClass('arTemplate');
    $newAr.find('h1.title').html(this.title);
    $newAr.find('a.authorUrl').before('Author: ');
    $newAr.find('a.authorUrl').html(this.author);
    $newAr.find('a.authorUrl').attr('href', this.authorUrl);
    $newAr.find('h3.category').html('Category: '+this.category);
    $newAr.find('h3.date').html('Posted ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    $newAr.find('section.article-body').html(this.body).children().not(':lt(3)').hide();
    $newAr.find('#expand-article').html('<button class="expand-button" type="button">Show full article</button>');
    $newAr.append('<hr>');
    return $newAr;
  };



  //function to sort raw data
  $(function() {

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

    //temporarily store data in array to create new instance for each article then print to DOM
    var dataArray = {};
    for(i=0; i<blog.rawData.length; i++){
      dataArray = new makeArticle(blog.rawData[i]);
      $('#articles').append(dataArray.toHtml());
    }
  });


/*********** Class-02 Branch ************/


  //Filter arrays and return unique values
  $(function() {

    //function to build array of all category names from blog.rawData
    function getCategoryFilterItems(){
      var tempFilterArray = [];
      for(i=0; i<blog.rawData.length; i++){
        tempFilterArray.push(blog.rawData[i].category);
      }
      console.log(tempFilterArray);
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
      console.log(tempFilterArray);
      return tempFilterArray;
    }
    //Store returned array in a variable
    var authorStrings = getAuthorFilterItems();

    //Function to put all the unique items in an array
    function getUnique(inputArray){

      var outputArray = [];

      for (i=0; i < inputArray.length; i++){
        if (($.inArray(inputArray[i], outputArray)) == -1)
        {
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
        $(elementId).append("<option value='"+array[i]+"'>"+array[i]+"</option>");
        console.log(array[i]);
      }
    }
    printToSelect(uniqueCategories, '#category-filter');
    printToSelect(uniqueAuthors, '#author-filter');

    //On Author or Category select change, hide all divs, then show selected's preview
    $('select').on('change', function (e) {
      var $selection = $(this).val();
      // if($(this).val() = null){
      if($(this).attr('id') == 'author-filter'){
        $('article').hide();
        $(".authorUrl:contains('" + $selection + "')").parents('article').show(':lt(3)');
      } else {
        $('article').hide();
        $(".category:contains('" + $selection + "')").parents('article').show(':lt(3)');
      }
    });

    //When button clicked, toggle button text; toggle expand and retract
    $('.expand-button').on('click', function(e){
      $(this).text(function(i, text){
        return text === "Show Less" ? "Show Full Article" : "Show Less";
      });

      $(this).parent().prev().children().show(function(i, show){
        return show === ':gt(0)' ? ':lt(3)' : ':gt(0)';
      });

      if($(this).text() == 'Show Full Article') {
        $(this).parent().prev().children().hide(':gt(2)');
      }

    });







  });

  // $(function() {
  //
  //
  //
  //
  //
  //
  //
  // });
