angular.module('websiteApp')
.controller('shelfController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		var items = {
			cans: 
			[{
				link: 'campbellbeef',
				source: '/graphics/Stock_Broth/stock/campbellbeef.png'
			},
			{
				link: 'kitchenchicken',
				source: '/graphics/Stock_Broth/stock/kitchenchicken.png'
			},
			{
				link: 'vegetable',
				source: '/graphics/Stock_Broth/stock/vegetable.png'
			},
			{
				link: 'swansonbeef',
				source: '/graphics/Stock_Broth/stock/swansonbeef.png'
			},
			{
				link: 'swansonchicken',
				source: '/graphics/Stock_Broth/stock/swansonchicken.png'
			}],
			seafood: 
			[{
				link: 'cod',
				source: '/graphics/Fish/fish/Cod.png'
			},
			{
				link: 'grouper',
				source: '/graphics/Fish/fish/Grouper.png'
			},
			{
				link: 'haddock',
				source: '/graphics/Fish/fish/Haddock.png'
			},
			{
				link: 'halibut',
				source: '/graphics/Fish/fish/Halibut.png'
			},
			{
				link: 'salmon',
				source: '/graphics/Fish/fish/Salmon.png'
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