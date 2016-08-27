app.factory('Items', function(localStorageService) {
  // Might use a resource here that returns a JSON array
  var itemData = 'item';
  var items = [];
  return {
    all: function() {
      if (localStorageService.get(itemData)){
       items = localStorageService.get(itemData);
       return items;
      }else{
        items = [];
      }
    },
    create: function(item){
      items.push(item);
      localStorageService.set(itemData, items)
    },
    remove: function(item) {
      items.splice(items.indexOf(item), 1);
      localStorageService.set(itemData, items);
    },
    get: function(itemId) {
      items = Items.all();
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    }
  };
});
