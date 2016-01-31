angular.module('grocery.services')

.factory('Items', function($http, $ionicLoading, $ionicPopup) {
  // Might use a resource here that returns a JSON array
  return {
    all: function() {
      return $http.get(baseUrl + market + "/closest/publications/" + postalCode).then(function(data){
          var products = [];
          data.data.forEach(function(e){
              e.items.forEach(function(i){
                  i.title_fr = util.toUpper(i.title_fr);
                  i.words = i.key_words ? i.key_words.join(' ') : '';
                  products.push(i);
              });
          });
          return _.sortBy(products, 'category_fr');
      });
    },

      get: function(itemId, publicationId) {

        return $http.get(baseUrl + market + "/products/" + publicationId + '/' + itemId).then(function(data){
          var i = data.data;
          i.title_fr = util.toUpper(i.title_fr);
          i.words = i.key_words ? i.key_words.join(' ') : '';
          return i;
      });
      },

      getOne: function (itemId, publicationId)
      {
        return $http.get(baseUrl + "groceries/products/" + publicationId + "/" + itemId).then(function (product)
        {
          product = product.data;
          product.title_fr = util.toUpper(product.title_fr);
          return product;
        });
      }
    };
  });
