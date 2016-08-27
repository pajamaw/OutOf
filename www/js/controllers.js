app.controller('DashCtrl', function($scope) {})

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

app.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
