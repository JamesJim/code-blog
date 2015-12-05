$(function() {
  var textTitle = $('#textTitle');
  var textAuthor = $('#textAuthor');
  var textUrl = $('#textUrl');
  var textCategory = $('#textCategory');
  var textBody    = $('#textBody');

  var pHrawOut = $('#pHrawOut');
  var pMarkOut = $('#pMarkOut');
  var pJson    = $('#pJson');
  var mObj = {}; // Empty object, filled in to during JSON string update

  function render() {

    var titleVal = textTitle.val(); //raw title markup

    var authorVal = textAuthor.val(); //raw author markup
    var urlVal = textUrl.val(); //raw URL markup
    var categoryVal = textCategory.val();//raw category markup
    var bodVal = textBody.val(); // Raw body markup

    var t = marked(titleVal); //convert title markup to html
    var m = marked(bodVal); // Convert body markup to html
    var a = marked(authorVal); //convert author markup to html
    var u = marked(urlVal); // Convert URL markup to html
    var c = marked(categoryVal); //convert category markup to html
    var allTheBlock = m + a + u + t + c;


    pHrawOut.text(allTheBlock); // Render raw markup
    pMarkOut.html(allTheBlock); // Render article preview (rendered as HTML)

    // Update JSON article
    mObj.title = t;
    mObj.body = m;
    mObj.author = a;
    mObj.authorURL = u;
    mObj.category = c;



    console.log(mObj.body);
    var jsonStr = pJson.text(JSON.stringify(mObj));
  }

  // Any character change (article editing) updates the live output paragraphs
  textTitle.on('input', render);
  textBody.on('input', render);
  textAuthor.on('input', render);
  textUrl.on('input', render);
  textCategory.on('input', render);


  render(); // Render once on doc load
});
