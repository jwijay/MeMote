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

.controller('DayCtrl', function($scope, Questions, MoodRating, Responses, Dayta) {
  $scope.questions = Questions.all();

  Dayta.get().success(function(data) {
    $scope.daytas = data;
    console.log('$scope.daytas',$scope.daytas);
    $scope.moodRatings = $scope.daytas.map(function(dayta) {
      return dayta.mood;
    });

    console.log('$scope.moodRatings',$scope.moodRatings);

  });

  // adding moon chart
  var ctx = $('#moodChart').get(0).getContext('2d');

  // sample data
  var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          // {
          //     label: "My First dataset",
          //     fillColor: "rgba(220,220,220,0.2)",
          //     strokeColor: "rgba(220,220,220,1)",
          //     pointColor: "rgba(220,220,220,1)",
          //     pointStrokeColor: "#fff",
          //     pointHighlightFill: "#fff",
          //     pointHighlightStroke: "rgba(220,220,220,1)",
          //     data: [65, 59, 80, 81, 56, 55, 40]
          // },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [2, 5.6, 6.6, 7.5, 3, 10, 9.8]
              // data: [20, 56, 66, 75, 30, 100, 98]
              // data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  var moodChart = new Chart(ctx).Line(data);




  $scope.MoodChart = {
    width : 500,
    height: 500,
    options : {},
    data : [
      {
        value: 30,
        color:"#F7464A"
      },
      {
        value : 50,
        color : "#E2EAE9"
      },
      {
        value : 100,
        color : "#D4CCC5"
      },
      {
        value : 40,
        color : "#949FB1"
      },
      {
        value : 120,
        color : "#4D5360"
      }
    ]
  };
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
