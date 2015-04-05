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

  // converting date for labels
  var dateConverter = $scope.dateConverter = function(isoDate) {
      var date = new Date(isoDate);
      return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  };

  // adding mood chart
  var ctx = $('#moodChart').get(0).getContext('2d');

  // sample data
  var moodChartData = {
      labels: $scope.dates,
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
              data: $scope.dates
          }
      ]
  };

  Dayta.get().success(function(apiData) {
    $scope.daytas = apiData;
    $scope.moodRatings = $scope.daytas.map(function(dayta) {
      return dayta.mood;
    });
    $scope.dates = $scope.daytas.map(function(dayta) {
      return dateConverter(dayta.date);
      
    });
    moodChartData.datasets[0].data = $scope.moodRatings;
    moodChartData.labels = $scope.dates;
    var moodChart = new Chart(ctx).Line(moodChartData);
  });

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
