// $(function(){


$.getJSON('js/blogArticles.json', function(data) {
  var blogArticles = data;
  console.log('Raw Data: ', blogArticles);

  /******* TOTAL NUMBER OF ARTICLES ******/

  function getNumArticles(array) {
    return array.length;
  } //end getNumArticles function

  var totalArticles = getNumArticles(blogArticles);
  $('#totalNumArticles').html(totalArticles);
  console.log('Total # Articles: ', totalArticles);



  /******* TOTAL NUMBER OF DISTINCT AUTHORS ******/

  //obtain an array of authors
  var authors = blogArticles.map(getAuthors);

  function getAuthors(obj) {
    return obj.author;
  } //end getAuthors function
  console.log('All Authors: ', authors);

  //get distinct authors from array of authors
  var distinctAuthors = authors.filter(getDistinctAuthors);

  function getDistinctAuthors(v, i) {
    return authors.indexOf(v) == i;
  }; //end GetDistinctAuthors function
  console.log('Distinct Authors: ', distinctAuthors);

  //get # of distinct authors from array of distinct authors
  var numDistinctAuthors = distinctAuthors.length;
  $('#totalNumDistinctAuthors').html(numDistinctAuthors);
  console.log('Number of Distinct Authors: ', numDistinctAuthors);




  /******* TOTAL NUMBER OF WORDS ******/

  //Get array of markdown or body values
  var allBodies = blogArticles.map(getAllBodies);

  //get all body or markdown values
  //if markdown, run 'marked' on it and call it body
  function getAllBodies(obj) {
    if (obj.author || obj.markdown) {
      if (obj.markdown) {
        obj.body = marked(obj.markdown);
      }
      return $(obj.body).text();

    }
  }; //end getAllBodies function
  console.log('Array of All Article Bodies: ', allBodies);



  //On each array body of just text, run word count function
  var statsPerArticleBody = allBodies.map(wordCount);

  //get stats on words for each array of text
  //returns an array of objects
  function wordCount(val) {
    return {
      charactersNoSpaces: val.replace(/[\s\.\\/"'<>]+/g, '').length,
      characters: val.length,
      words: val.match(/\S+/g).length
    };
  } //end wordCount function
  console.log('Stats per Article Body: ', statsPerArticleBody);


  //GET TOTAL WORDS
  var totalWords = statsPerArticleBody.reduce(addWords, 0);

  function addWords(sum, obj){
    return (sum + obj.words);
  }
  $('#totalNumWords').html(totalWords);
  console.log('Total Words: ',totalWords);


  //GET TOTAL CHARACTERS (NO SPACES)
  var totalCharacters = statsPerArticleBody.reduce(addChars, 0);

  function addChars(sum, obj){
    return (sum + obj.charactersNoSpaces);
  }
  console.log('Total Characters: ', totalCharacters);

  var avgWordLength = (totalCharacters/totalWords);
  $('#avgWordLength').html(avgWordLength);
  console.log('AVG Word Length: ', avgWordLength);




  var testCountArray = ["Skate ipsum dolor sit amet, 270 slap maxwell pool lipslide flail."];
  var testCount = testCountArray.map(testCount);

  //get stats on words for each array of text
  //returns an array of objects
  function testCount(val) {
    return {
      charactersNoSpaces: val.replace(/[\s\.\\/,"'<>]+/g, '').length,
      characters: val.length,
      words: val.match(/\S+/g).length
    };
  } //end wordCount function
  console.log('Test: ',testCount);






}); //end getJSON call






// }); //end document.ready
