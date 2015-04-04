angular.module('memote.controllers', [])

.controller('MoodCtrl', function($scope, MoodRating) {
  $scope.moodRating = MoodRating.get();

  $scope.changeMoodRating = function(moodRating) {
    MoodRating.set(moodRating);
  };
})

.controller('QCtrl', function($scope, $stateParams, Questions, Responses, MoodRating, Dayta) {
  $scope.order = $stateParams.order;
  $scope.questions = Questions.all();
  $scope.question = $scope.questions[$stateParams.order.toString()];
  $scope.numQuestions = Object.keys($scope.questions).length;

  if ($scope.order < $scope.numQuestions) {
    $scope.next_q = (parseInt($stateParams.order) + 1).toString();
  } else {
    $scope.next_q = null;
  }

  $scope.addResponse = function(response) {
    Responses.add($scope.question.title, response);

    if ($scope.next_q === null) {
      // make http request (to POST to db)
      Dayta.add(MoodRating.get()/10, Responses.get());
    }
  };
})

.controller('DayCtrl', function($scope, MoodRating, Responses) {
  console.log('Responses.get()',Responses.get());
  console.log('MoodRating.get()',MoodRating.get());
})

.controller('WeekCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MonthCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
