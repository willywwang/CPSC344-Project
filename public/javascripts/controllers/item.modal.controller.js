angular.module('websiteApp')
.controller('itemModalController', ['$scope', '$rootScope','$uibModal', '$uibModalInstance', '$http', '$window', 'toaster', 'item',
	function($scope, $rootScope, $uibModal, $uibModalInstance, $http, $window, toaster, item) {
		var items = {
			cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/images/cod.jpg'
			},
			grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/images/grouper.jpg'
			},
			halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/images/halibut.jpg'
			},
			haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				description: 'Fillet, frozen',
				source: '/images/haddock.jpg'
			},
			salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/images/salmon.jpg'
			}
		};

		(function init() {
			$scope.item = items[item];
			var quantity = $window.sessionStorage.getItem(item) || '0';
			$scope.item.quantity = parseInt(quantity);

			var isCompared = $window.sessionStorage.getItem('compare' + $scope.item.title);

			if (isCompared) {
				$scope.isCompared = true;
			}
		})();

		$scope.changeQuantity = function(operation) {
			if (operation === '-') {
				$scope.item.quantity--;
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'info',
					body: $scope.item.title + ' removed from cart'
				});
			} else {
				$scope.item.quantity++;
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'info',
					body: $scope.item.title + ' added to cart'
				});
			}

			$window.sessionStorage.setItem(item, $scope.item.quantity);
		}

		$scope.updateComparison = function() {
			if ($scope.isCompared) {
				$window.sessionStorage.setItem('compare' + $scope.item.title, true);
			} else {
				$window.sessionStorage.removeItem('compare' + $scope.item.title);
			}

			$rootScope.$broadcast('comparisonUpdated');
		}

		$scope.close = function() {
			$uibModalInstance.close();
		};
	}]);