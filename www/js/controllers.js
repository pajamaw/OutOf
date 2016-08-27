app.controller('ContactsCtrl', function($scope, $cordovaContacts) {
  $scope.getContacts = function(){
    $scope.phoneContacts = [];
  function onSuccess(contacts){
    for(let i = 0; i < contacts.length; i++){
      var contact = contacts[i];
      $scope.phoneContacts.push(contact);
    }
  };
  function onError(contactError){
    alert(contactError);
  };
  var options = {};
  options.multiple = true;
  $cordovaContacts.find(options).then(onSuccess, onError);
};
});

app.controller('ItemsCtrl', function($scope, Items, $ionicModal, localStorageService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$scope.items = Items.all();
$scope.item = {};
$ionicModal.fromTemplateUrl('new-item-modal.html', {
  scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.newItemModal = modal;
  });
  $scope.openItemModal = function(){
    $scope.newItemModal.show();
  }
  $scope.closeItemModal = function(){
    $scope.newItemModal.hide();
  }
  //$scope.items = Items.all();


  $scope.createItem = function(item){
    Items.create(item);
  //  debugger;
    $scope.item = {};
    $scope.closeItemModal();
  }

  $scope.removeItem = function(item){
    Items.remove(item);
  }
//  $scope.items = Items.all();
  })


app.controller('ItemDetailsCtrl', function($scope, $stateParams, Items) {
  $scope.item = Items.get($stateParams.itemId);
})

app.controller('MessageCtrl', function($scope, $cordovaSms) {
  $scope.sms = {
    number: '0959052082',
    message: 'This is some dummy text'
  };

  document.addEventListener("deviceready", function() {

    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };

    $scope.sendSMS = function() {

      $cordovaSms
        .send('6075929358', 'This is some dummy text', options)
        .then(function() {
          alert('Success');
          // Success! SMS was sent
        }, function(error) {
          alert('Error');
          // An error occurred
        });
    }
  });
});
