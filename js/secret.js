//This page is for the blog input html page

$(function() {

//This section is for when the admin types in markdown and we want to
//convert the markdown to raw html, a JSON object, and a live preview
//of the page
//This page is for the blog input html page

  //Set template jQuery objects
  var textTitle = $('#textTitle');
  var textCategory = $('#textCategory');
  var textAuthor = $('#textAuthor');
  var textUrl = $('#textUrl');
  var textPublishedOn = $('#textPublishedOn');
  var textBody    = $('#textBody');

  //Set admin page output div jQuery objects
  var liveRawHtmlOutput = $('#liveRawHtmlOutput'); //output to admin page raw html div
  var pMarkOut = $('#pMarkOut'); //output to admin page live preview div
  var pJson    = $('#pJson'); //output to admin page JSON div

  //Create empty object to store
  var data = {}; // Empty object, filled in to during JSON string update

  function render() {

    //Collect text from inputs
    var titleVal = textTitle.val();
    var categoryVal = textCategory.val();
    var authorVal = textAuthor.val();
    var urlVal = textUrl.val();
    var publishedOnVal = textPublishedOn.val();
    var bodVal = textBody.val();

    //Prepare all inputs for JSON (use 'marked' for body since we want tags)
    var t = titleVal;
    var c = categoryVal;
    var a = authorVal;
    var u = urlVal;
    var p = publishedOnVal;
    var b = marked(bodVal); //convert markup to html on body

    // Pre-stringify - Fill empty JSON object while values are not marked up (except body since we want tags)
    data.title = t;
    data.category = c;
    data.author = a;
    data.authorURL = u;
    data.publishedOn = p;
    data.body = b;

    console.log(data);


    // //Use 'marked' on the rest of the items to prepare for raw HTML output
    // //since we want to show tags
    // var t = marked(titleVal);
    // var c = marked(categoryVal);
    // var a = marked(authorVal);
    // var u = marked(urlVal);
    // var p = marked(publishedOnVal);
    //
    // //Combine all inputs into one to send to raw HTML output
    // var allTheBlock = t + c + a + u + p + b;

    //"Get" handlebars template from file, compile response with data,
    //send to admin page markdown preview
    $.get('template.html', function(template){
      //Use the 'Handlebars.compile() method'
      var compiler = Handlebars.compile(template);



      //Compile data from object and html template
      var compiledHtml = compiler(data);
      console.log(compiledHtml);

      //Send compiled data in html template to the markdown output div
      $('#pMarkOut').html(compiledHtml);

      $(document).ready(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });

      //Output to admin page raw HTML output div
      liveRawHtmlOutput.text(compiledHtml);

    }); //end $.get response function

    // $livePreview.find('pre code').each(function(i, block) {
    //   hljs.highlightBlock(block);
    // });

    //Make object a JSON object by stringifying it
    //At the same time, set the value of our admin page jQuery div to this JSON object
    pJson.text(JSON.stringify(data));

  };

  // Any character change (article editing) updates the live output paragraphs
  textTitle.on('input', render);
  textBody.on('input', render);
  textAuthor.on('input', render);
  textUrl.on('input', render);
  textCategory.on('input', render);

  render(); // Render once on doc load

}); //end document.ready
