// $(function(){


function generateStats(data){

  //raw data
  var blogArticles = data;
  console.log('Raw Data: ', blogArticles);


  /******* TOTAL NUMBER OF ARTICLES ******/

  //get length of array
  function getNumArticles(array) {
    return array.length;
  } //end getNumArticles function

  var totalArticles = getNumArticles(blogArticles);

  //Send to DOM element with ID
  $('#totalNumArticles').html(totalArticles);
  console.log('Total # Articles: ', totalArticles);

  //Set local storage
  localStorage.setItem('numArticles', totalArticles);
  console.log('Set Local Storage - Total Number of Articles: ' + localStorage.numArticles);


  /******* TOTAL NUMBER OF DISTINCT AUTHORS ******/

  //obtain an array of authors
  var authors = blogArticles.map(getAuthors);

  //In object, return each value of object key 'author'
  function getAuthors(obj) {
    return obj.author;
  } //end getAuthors function
  console.log('All Authors: ', authors);

  //get distinct authors from array of authors
  var distinctAuthors = authors.filter(getDistinctAuthors);

  //pushes each value to new array only once, leaves out repeats
  function getDistinctAuthors(v, i) {
    return authors.indexOf(v) == i;
  }; //end GetDistinctAuthors function
  console.log('Distinct Authors: ', distinctAuthors);

  //Set local storage
  localStorage.setItem('distinctAuthors', distinctAuthors);
  console.log('Set Local Storage - Distinct Authors: ' + localStorage.distinctAuthors);



  // //Get bodies for distinct Authors in order to get word length by author
  // var BodiesOfDistinctAuthors = distinctAuthors.map(getBodiesOfDistinctAuthors);
  //
  // function getBodiesOfDistinctAuthors(index, blogArticles){
  //     if(index = blogArticles.author){
  //       return obj.body;
  //     }
  // }
  // console.log('TEST GET OBJ BODY FOR DISTINCT AUTHOR: ', BodiesOfDistinctAuthors);



  //get # of distinct authors from array of distinct authors
  var numDistinctAuthors = distinctAuthors.length;

  //print to DOM element with ID
  $('#totalNumDistinctAuthors').html(numDistinctAuthors);
  console.log('Number of Distinct Authors: ', numDistinctAuthors);

  //Set local storage
  localStorage.setItem('numDistinctAuthors', numDistinctAuthors);
  console.log('Set Local Storage - Total # Distinct Authors: ' + localStorage.numDistinctAuthors);


  // /******* WORDS PER DISTINCT AUTHOR ******/
  //
  // //get articles by distinct author
  // var authorsWithBodies = blogArticles.map(getAuthorsWithBodies);
  //
  // //get objects containing author and body keys
  // function getAuthorsWithBodies(obj) {
  //     if (obj.markdown) {
  //       obj.body = marked(obj.markdown);
  //     }
  //     return {
  //       author: obj.author,
  //       body: $(obj.body).text()};
  //
  // } //end getAuthorsWithBodies function
  // console.log('authorsWithBodies: ', authorsWithBodies);
  //
  // //filter array of objects with author and body keys by distinct author
  // var distinctAuthorsWithBodies = distinctAuthors.map(getDistinctAuthorsWithBodies);
  //
  // function getDistinctAuthorsWithBodies(array){
  //   if(index = authorsWithBodies.author){
  //     return {
  //
  //     }
  //   }
  // }
  //


  /******* TOTAL NUMBER OF WORDS ******/

  //Get array of markdown or body values
  var allBodies = blogArticles.map(getAllBodies);

  //get all body or markdown values
  //if markdown, run 'marked' on it and call it body
  function getAllBodies(obj) {
      if (obj.markdown) {
        obj.body = marked(obj.markdown);
      }
      return $(obj.body).text();

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
  $('#totalNumWords').html(totalWords.toLocaleString());
  console.log('Total Words: ',totalWords);

  //Set local storage
  localStorage.setItem('totalWords', totalWords);
  console.log('Set Local Storage - Total Words: ' + localStorage.totalWords);



  //GET TOTAL CHARACTERS (NO SPACES)
  var totalCharacters = statsPerArticleBody.reduce(addChars, 0);

  function addChars(sum, obj){
    return (sum + obj.charactersNoSpaces);
  }
  console.log('Total Characters: ', totalCharacters);

  var avgWordLength = (totalCharacters/totalWords);
  $('#avgWordLength').html(avgWordLength.toFixed(2));
  console.log('AVG Word Length: ', avgWordLength);

  //Set local storage
  localStorage.setItem('avgWordLength', avgWordLength);
  console.log('Set Local Storage - Avg Word Length: ' + localStorage.avgWordLength);



} //end generateStats function



  // var testCountArray = ["Skate ipsum dolor sit amet, 270 slap maxwell pool lipslide flail."];
  // var testCount = testCountArray.map(testCount);
  //
  // //get stats on words for each array of text
  // //returns an array of objects
  // function testCount(val) {
  //   return {
  //     charactersNoSpaces: val.replace(/[\s\.\\/,"'<>]+/g, '').length,
  //     characters: val.length,
  //     words: val.match(/\S+/g).length
  //   };
  // } //end wordCount function
  // console.log('Test: ',testCount);

// }); //end document.ready
