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
    console.log(bodVal);

    var t = titleVal; //convert title markup to html
    var b = marked(bodVal); // Convert body markup to html
    var a = authorVal; //convert author markup to html
    var u = urlVal; // Convert URL markup to html
    var c = categoryVal; //convert category markup to html
    var allTheBlock = b + a + u + t + c;


    pHrawOut.text(allTheBlock); // Render raw markup
    pMarkOut.html(allTheBlock); // Render article preview (rendered as HTML)

    // Update JSON article
    mObj.title = t;
    mObj.body = b;
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
