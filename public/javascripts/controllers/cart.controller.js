angular.module('websiteApp')
.controller('cartController', ['$scope', '$rootScope', '$window', 'toaster', 'items',
	function($scope, $rootScope, $window, toaster, items) {
		(function init() {
			$scope.pathName = $window.sessionStorage.getItem('path');

			if ($scope.pathName === 'Store Map') {
				$scope.path = '/';
			} else {
				$scope.path = '/shelf';
			}

			findItems();
		})();;

		$scope.changeQuantity = function(item, operation) {
			console.log(item);
			if (operation === '-') {
				item.quantity--;
				$window.sessionStorage.setItem(item.search.toLowerCase(), item.quantity);
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'info',
					body: item.title + ' removed from cart'
				});
			} else {
				item.quantity++;
				$window.sessionStorage.setItem(item.search.toLowerCase(), item.quantity);
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'info',
					body: item.title + ' added to cart'
				});
			}

			findItems();
		}

		function findItems() {
			$scope.items = [];
			$scope.totalQuantity = 0;
			$scope.totalPrice = 0;
			$scope.hasSeafood = false;
			$scope.hasStockBroth = false;

			Object.keys(items).forEach(function(itemKey) {
				var quantity = $window.sessionStorage.getItem(itemKey);

				if (quantity && quantity > 0) {
					var item = items[itemKey];
					item.quantity = parseInt(quantity);
					item.totalPrice = item.quantity * item.numPrice;
					item.totalPrice = parseFloat(Math.round(item.totalPrice * 100) / 100).toFixed(2);
					
					$scope.items.push(item);

					$scope.totalQuantity += item.quantity;
					$scope.totalPrice += item.totalPrice;

					if (item.seafood) {
						$scope.hasSeafood = true;
					} else {
						$scope.hasStockBroth = true;
					}
				}
			});

			$scope.totalPrice = parseFloat(Math.round($scope.totalPrice * 100) / 100).toFixed(2);
		}
	}]);