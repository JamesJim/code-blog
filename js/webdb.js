var webDB = {};

webDB.verbose = function (verbose) {
  var msg;
  if (verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    msg = 'html5sql verbosity on';
  } else {
    html5sql.logInfo = false;
    html5sql.logErrors = false;
    html5sql.putSelectResultsInArray = false;
    msg = 'html5sql verbosity off';
  }
  console.log(msg);
};

webDB.init = function() {
  // Open and init DB
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
      webDB.setupTables();
    } else {
      console.log('Web Databases not supported.');
    }
  } catch (e) {
    console.error('Error occured during DB init. Web Database may not be supported.');
  }
};

webDB.connect = function (database, title, size) {
  console.log('CONNECT IS RUNNING');
  html5sql.openDatabase(database, title, size);
};

webDB.importArticlesFrom = function (path) {
  // Import articles from JSON file
  $.getJSON(path, webDB.insertAllRecords);
};

webDB.insertAllRecords = function (articles) {
  console.log('INSERT ALL RECORDS IS RUNNING');

  articles.forEach(webDB.insertRecord);
};

webDB.setupTables = function () {
  console.log('SET UP TABLES IS RUNNING');

  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, authorUrl VARCHAR (255), category VARCHAR(20), publishedOn DATETIME, body TEXT NOT NULL);',
    function() {
      // on success
      console.log('Success setting up tables.');
    }
  );
};

webDB.insertRecord = function (a) {
  console.log('INSERT RECORD IS RUNNING');

  // insert article record into database
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.body],
      }
    ],
    function () {
      console.log('Success inserting record for ' + a.title);
    }
  );
};
//
webDB.defer = function (callback) {
  callback = callback || function() {};
  html5sql.process(
    'SELECT * FROM articles WHERE 0=1;',
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};

// webDB.deleteRecord = function(callback) {
//   // Delete article record in database
//   webDB.execute(
//     'DROP TABLE articles';
//     ,
//     callback
//   );
// };
var data = [];

webDB.getAllArticles = function (callback) {
  console.log('GET ALL ARTICLES IS RUNNING');
  callback = callback || function() {};
  html5sql.process(
    'SELECT * FROM articles;',
    function (tx, result, resultArray) {
      resultArray.forEach(function(item){
        data.push(item);
      });

      handlebarsOutput(data);
      console.log('LOADED FROM LOCAL', data);
      $('.article-body').find('p').hide().show(':lt(1)');
      console.log('DATA AFTER GETALLARTICLES',data);
      generateStats(data);
    }
  );
};


function storeAllArticles(A){
  console.log('STORE ALL ARTICLES RUNNING', data);
  data = A;
  console.log('ALL ARTICLES FROM DB STORED: ', data);
}

function showArticles(A) {
  console.log('SHOW ALL ARTICLES IS RUNNING');

  articles = A;
  console.log('A: ',A);
  console.log('Async: Near top of showArticles(): articles='+articles);
  $.each(articles, function(i, a) {
    console.log('  a=' + a);
    $row = $('<tr>');
    $cell0 = $('<td>').text(a.author); $row.append($cell0);
    $cell1 = $('<td>').text(a['title']); $row.append($cell1);
    $cell2 = $('<td>').text(a['body']); $row.append($cell2);
    $cell3 = $('<td>').text(a['authorUrl']); $row.append($cell3);
    $cell4 = $('<td>').text(a['category']); $row.append($cell4);
    $cell5 = $('<td>').text(a['publishedOn']); $row.append($cell5);
    $dbOut.append($row);
  });
}

/*************** GET DISTINCT AUTHORS ******************/

webDB.getDistinctAuthors = function (callback) {
  console.log('GET DISTINCT AUTHORS IS RUNNING');

  callback = callback || function() {};
  html5sql.process(
    'SELECT DISTINCT author FROM articles;',
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};

var uniqueAuthors;
function showDistinctAuthors(A){
  console.log('SHOW DISTINCT AUTHORS IS RUNNING');

  uniqueAuthors = A;
  $.each(uniqueAuthors, function(i, a){
    // console.log('a=', a.author);
    a.author;
    $('#author-filter').append('<option value=\''+a.author+'\'>'+a.author+'</option>');
  });

};


/****************** GET DISTINCT CATEGORIES ******************/

webDB.getDistinctCategories = function (callback) {
  console.log('GET DISTINCT CATEGORIES IS RUNNING');

  callback = callback || function() {};
  html5sql.process(
    'SELECT DISTINCT category FROM articles;',
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};

var uniqueCategories;
function showDistinctCategories(C){
  console.log('SHOW DISTINCT CATEGORIES IS RUNNING');

  uniqueCategories = C;
  $.each(uniqueCategories, function(i, a){
    // console.log('a=', a.category);
    $('#category-filter').append('<option value=\''+a.category+'\'>'+a.category+'</option>');
  });
};



webDB.execute = function (sql, callback) {
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};
