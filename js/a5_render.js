$(function() {
  var textTitle = $('#textTitle');
  var textCategory = $('#textCategory');
  var textAuthor = $('#textAuthor');
  var textUrl = $('#textUrl');
  var textPublishedOn = $('#textPublishedOn')
  var textBody    = $('#textBody');
  var articleTemplate = $('#articleTemplate').html();
  var liveRawHtmlOutput = $('#liveRawHtmlOutput');
  var pMarkOut = $('#pMarkOut');
  var pJson    = $('#pJson');
  var mObj = {}; // Empty object, filled in to during JSON string update

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
    var b = marked(bodVal);

    // Update JSON object while values are not marked up (except body since we want tags)
    mObj.title = t;
    mObj.category = c;
    mObj.author = a;
    mObj.authorURL = u;
    mObj.publishedOn = p;
    mObj.body = b;

    //stringify JSON and set text value of pJson jQuery object
    pJson.text(JSON.stringify(mObj));


    //Use 'marked' on the rest of the items to prepare for raw HTML output
    //since we want to show tags
    var t = marked(titleVal);
    var c = marked(categoryVal);
    var a = marked(authorVal);
    var u = marked(urlVal);
    var p = marked(publishedOnVal);

    //Combine all inputs into one to send to raw HTML output
    var allTheBlock = t + c + a + u + p + b;

    //Output to raw HTML output
    liveRawHtmlOutput.text(allTheBlock);



    var secretData = {};
    var secretData = mObj;

    //Use our created object to fill template using Handlebars and ultimately send to markdown preview
    //Select template HTML
    var articleTemplate = $('#articleTemplate').html();
    //Use the 'Handlebars.compile() method'
    var renderer = Handlebars.compile(articleTemplate);
    //Compile data from object and html template
    var compiledHtml = renderer(mObj);
    //Send compiled data in html template to the markdown output div
    $('#pMarkOut').html(compiledHtml);


  }

  // Any character change (article editing) updates the live output paragraphs
  textTitle.on('input', render);
  textBody.on('input', render);
  textAuthor.on('input', render);
  textUrl.on('input', render);
  textCategory.on('input', render);

  var count = 0;
  render(); // Render once on doc load
});
