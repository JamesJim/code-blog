



function runSQLcmd(cmd) {
   webDB.execute(cmd,
                 function(r) { mylog('<hr>'+cmd+"<br>"+JSON.stringify(r)); }
                );

function checksemi(ev) {
  var cv = $cmd.val();
  if (cv.match(/.+;/)) {
//    mylog('SQL command: "'+cv+'"');
    runSQLcmd(cv);
  }
}
$dbOut = $('#dbOut');


$cmd.on('input', checksemi);
$rmLog.on('click', clearLog);
