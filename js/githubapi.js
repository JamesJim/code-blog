
function show(data){
  console.log('AJAX CALL RUNNING',data);

  var githubOutput = '<h5><a target="_blank" class="githubLink "href="'+ data.html_url +'">';
  githubOutput += data.login + '</a></h5>';
  githubOutput += '<img width="150px" src="'+ data.avatar_url+'">';
  githubOutput += '<h5>Public Repos: '+ data.public_repos+'</h5>';
  githubOutput += '<h5>Go to Github and star the repos!</h5>';
  $('#githubApi').append(githubOutput);
  // getNext();
}

function showRepos(data){
  console.log('AJAX CALL RUNNING',data);
  for(var i=0; i<data.length; i++){
    var githubOutput = '<h5><a target="_blank" class="githubLink" href="'+data[i].html_url+'">'+ data[i].name + '</a></h5>';
    $('#githubApi').append(githubOutput);
  }
}

$.ajax({
  url: 'https://api.github.com/users/JamesJim',
  type: 'GET',
  dataType: 'JSON',
  success: show,
});

$.ajax({
  url: 'https://api.github.com/users/JamesJim/repos',
  type: 'GET',
  dataType: 'JSON',
  success: showRepos,
});
