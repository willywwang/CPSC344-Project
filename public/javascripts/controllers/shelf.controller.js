angular.module('websiteApp')
.controller('shelfController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		var items = {
			cans: 
			[{
				link: 'campbellbeef',
				source: '/graphics/stock_broth/stock/campbellbeef.png'
			},
			{
				link: 'kitchenchicken',
				source: '/graphics/stock_broth/stock/kitchenchicken.png'
			},
			{
				link: 'vegetable',
				source: '/graphics/stock_broth/stock/vegetable.png'
			},
			{
				link: 'swansonbeef',
				source: '/graphics/stock_broth/stock/swansonbeef.png'
			},
			{
				link: 'swansonchicken',
				source: '/graphics/stock_broth/stock/swansonchicken.png'
			}],
			seafood: 
			[{
				link: 'cod',
				source: '/graphics/Fish/fish/Cod.png'
			},
			{
				link: 'grouper',
				source: '/graphics/Fish/fish/grouper.png'
			},
			{
				link: 'haddock',
				source: '/graphics/Fish/fish/haddock.png'
			},
			{
				link: 'halibut',
				source: '/graphics/Fish/fish/halibut.png'
			},
			{
				link: 'salmon',
				source: '/graphics/Fish/fish/salmon.png'
			}]
		};

		$scope.isSeafood = false;

		(function init() {
			var category = $window.sessionStorage.getItem('shelf');
			$scope.items = items[category];

			if (category === 'seafood') {
				$scope.isSeafood = true;
			}

			$window.sessionStorage.setItem('path', 'Shelf');
		})();

		$scope.openModal = function(itemName) {
			$uibModal.open({
				templateUrl: 'item-modal.html',
				controller: 'itemModalController',
				resolve: {
					item: function() {
						return itemName;
					}
				}
			});
		}
	}]);