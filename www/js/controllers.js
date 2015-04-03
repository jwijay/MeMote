angular.module('memote.controllers', [])

.controller('MoodCtrl', function($scope) {
  $scope.moodRating = 70;
})

.controller('QCtrl', function($scope, $stateParams, Questions) {

  $scope.order = $stateParams.order;

  $scope.questions = Questions.all();

  $scope.question = Questions.all()[$stateParams.order.toString()];
  
  $scope.numQuestions = Object.keys($scope.questions).length;

  if ($scope.order < $scope.numQuestions) {
    $scope.next_q = (parseInt($stateParams.order) + 1).toString();
  } else {
    $scope.next_q = $scope.order;
    //TODO: submit yar junks now
  }

  // parseInt, toString. I want to load the question based on the param (use a service to get the question from the database?
    // load question for each q:order substate
    // post to db, insert key-value in dayta.responses (after each question)

  // at first, order is ""
  // if order is "", order = 0
  // next_q = order++, unless order++ is > questions.length
  
  // on template, if next_q not null,
  // show next button with ui-sref today.q({order: next_q})
})

.controller('DayCtrl', function($scope) {})

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
