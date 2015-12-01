

//Constructor function for articles
  function makeAr(obj){
    this.title = obj.title;
    this.category = obj.category;
    this.author = obj.author;
    this.authorUrl = obj.authorUrl;
    this.publishedOn = obj.publishedOn;
    this.body = obj.body;
  }


// Prototype function to insert blog info into DOM
  makeAr.prototype.toHtml = function() {
    var $newAr = $('.arTemplate').clone();
    $newAr.removeClass('arTemplate');
    $newAr.find('h1.title').html(this.title);
    $newAr.find('a.authorUrl').before('Author: ');
    $newAr.find('a.authorUrl').html(this.author);
    $newAr.find('a.authorUrl').attr('href', this.authorUrl);
    $newAr.find('h3.category').html('Category: '+this.category);
    $newAr.find('h3.date').html('Posted ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
    $newAr.find('section.article-body').html(this.body);
    $newAr.append('<hr>');
    return $newAr;
  };

  //function to store each object in an array
  $(function() {
    var dataArray = {};

    for(i=0; i<blog.rawData.length; i++){
      dataArray = new makeAr(blog.rawData[i]);
      $('#articles').append(dataArray.toHtml());
      console.log(dataArray);
    }
  });

  // function sortByDate(A) {
  //   A.sort(
  //    function(a, b) {
  //      if (a.publishedOn > b.publishedOn) { return 1; }
  //      if (a.publishedOn < b.publishedOn) { return -1; }
  //      return 0;
  //    }
  //  );
  // }





  // $(function(){
  //   for(i=0; i<dataArray.length; i++){
  //     $('#articles').append(dataArray[i].toHtml());
  //   }
  //
  // })


  // arObj0 = new makeAr(blog.rawData[0]);

      // }
      // else {
      //   arObj0 = new makeAr(rawStuff[0]);
      //   arObj1 = new makeAr(rawStuff[1]);

    // for(i=0; i<blog.rawData.length; i++){
    //
    //   new makeAr(blog.rawData[i]);


  //   } //end for loop
  // }


  // sortByDate(blog.rawData);
  // getData(blog.rawData);
  // console.log('Empty auto-run');





//
// /*var pLog = document.getElementById("pLog");
// function clearLog() { pLog.innerHTML = ""; }
// function mylog(v) { pLog.innerHTML += (v + "<br>") }
// var jqPLOG = $('#pLog');*/
// /*------------------*
//  | jQuery blog demo |
//  *------------------*/
// function makeAr(obj) {
//   this.title = obj.title;
//   this.pubdate = obj.pubdate;
//   this.body = obj.body;
// }
// makeAr.prototype.toHtml = function() {
//   var $newAr = $('article.arTemplate').clone();
//   $newAr.removeClass('arTemplate');
//   $newAr.find('h1:first').html(this.title);
//   $newAr.find('time').html('exactly ' + parseInt((new Date() - new Date(this.pubdate))/60/60/24/1000) + ' days ago');
//   $newAr.find('.article-body').html(this.body);
//   $newAr.append('<hr>');
//   return $newAr;
// }
// var rawStuff = [
//   { title  : "A History of Pencils",
//     pubdate : "1950-12-15",
//     body : "<p>Hello</p><div>There!</div>"
//   },
//   { title : "Antigravity Designs",
//     pubdate : "1850-01-01",
//     body: "If number is negative, then this publication date is from the future. Fly without using energy.<table><tr><td>AAA</td><td>BBB  </td></tr>  <tr><td>CCC</td><td>12345</td></tr> </table>"
//   },
// ];
// // Not coded well ON PURPOSE
// $(function() {
//   var arObj0 = {};
//   var arObj1 = {};
//   if (rawStuff[0].pubdate < rawStuff[1].pubdate) {
//     arObj0 = new makeAr(rawStuff[1]);
//     arObj1 = new makeAr(rawStuff[0]);
//   }
//   else {
//     arObj0 = new makeAr(rawStuff[0]);
//     arObj1 = new makeAr(rawStuff[1]);
//   }
//   $('#articles').append(arObj0.toHtml());
//   $('#articles').append(arObj1.toHtml());
// console.log("Empty auto-run");
//   }
// );
