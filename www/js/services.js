angular.module('memote.services', [])

.factory('Questions', function($http) {
  var questions = {

    1: {
      title: "What were your wins today?",
      placeholder: "Became a robot."
    },
    2: {
      title: "What did you learn?",
      placeholder: "Sewer plant. You can grow anywhere."
    },
    3: {
      title: "What is the most important thing you have to do tomorrow?",
      placeholder: "Seal clubbing project."
    },
    4: {
      title: "What is something new you can do tomorrow?",
      placeholder: "Travel to Mars."
    },
    5: {
      title: "Who are the most important people in your life?",
      placeholder: "My motherboard - send flowers for Motherboard Day."
    }
  };

  return {
    // all: function() {
    //   $http.get('http://localhost:3000/api/questions')
    //     .success(function(data) {
    //       console.log('data',data);
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // }

    all: function() {
      return questions;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
