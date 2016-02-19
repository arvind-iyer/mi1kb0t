var request = require('request');
var polls = [];
module.exports = {
  listeners: [{
    type: "regex",
    query: /.poll new/i,
    callback: newPoll
  },
  {
    type: "regex",
    query: /.poll list/i,
    callback: listPolls
  },
  {
    type: "regex",
    query: /.poll addto ([a-z0-9]+) ([a-z0-9]+)/i, //.poll addto <pollname> <option>
    callback: addOption
  },
  {
    type: "regex",
    query: /.poll show ([a-z0-9]+)/i,  //.poll show <pollname>
    callback: showOptions
  },
  {
    type: "regex",
    query: /.poll vote ([a-z0-9]+)/i,
    callback: vote
  }]
};

function newPoll(reply, message) {
  var match = message.body.match(/.poll new ([a-z]+)/);

  var poll = {
    name: "newpoll",
    options: [{name: "Blank", votes: 0}, {name: "Option", votes: 0} ]
  };
  if(match && match[1]){
    //Check if poll with current name exists
    console.log("Match: " + match[1] + "\t" + searchPollsByName(match[1]));
    if(searchPollsByName(match[1]) === -1) {
      poll.name = match[1];
    }
  }
  polls.push(poll);
  setTimeout(function() {
    reply("Create poll with title - " + poll.name);
  }, 100);
}

function listPolls(reply, message) {
  setTimeout(function() {
    reply("The current polls are: ");
  }, 100);

  polls.forEach(function(poll) {
    setTimeout(function() {
      reply(poll.name );
    }, 100);
  })
}

function addOption(reply, message, api, match) {
  if(match[1] && match[2]){
    var pollIndex = searchPollsByName(match[1]);
    if( pollIndex >= 0) {
      polls[pollIndex].options.push({name: match[2], votes: 0});
      setTimeout(function() {
        reply("Added option to "+match[1]+": "+match[2]);
      }, 100);
    }
  }
}

function showOptions(reply, message, api, match) {
  if(match && match[1]) {
    //find poll
    var pollIndex = searchPollsByName(match[1]);
    console.log(polls[0].options + " " + pollIndex);
    if( pollIndex > -1) {
      var output = polls[pollIndex].options.map(function(p){return p.name;}).join("\n");
      setTimeout(function() {
        reply(polls[pollIndex].name + " has options: \n" + output );
      }, 100);
    }
  }
  else {
    setTimeout(function() {
      reply("Please use command as: .poll show <pollname>" );
    }, 100);
  }
}

function vote(reply, message, api, match) {
  var pollIndex = searchPollsByName(match[1]);
  
}

function searchPollsByName(name) {
  //returns index of poll in polls, -1 if not found
  for (var i=0; i < polls.length; i++){
    if(polls[i].name == name){
      return i;
    }
  }
  return -1;
}
