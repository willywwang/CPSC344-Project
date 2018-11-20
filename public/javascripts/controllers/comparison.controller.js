angular.module('websiteApp')
.controller('comparisonController', ['$scope', '$rootScope', '$http', '$window', '$uibModal', '$location', 'toaster',
	function($scope, $rootScope, $http, $window, $uibModal, $location, toaster) {
		$scope.categories = [
		{
			title: 'Date Caught',
			property: 'date',
			label: 'Date Caught'
		},
		{
			title: 'Origin',
			property: 'origin',
			label: 'Origin'
		},
		{
			title: 'Price per Weight',
			property: 'price',
			label: 'Price per Weight'
		},
		{
			title: 'Oceanwise',
			property: 'oceanwise',
			isBoolean: true,
			label: 'Oceanwise'
		},
		{
			title: 'Fresh',
			property: 'fresh',
			isBoolean: true,
			label: 'Fresh'
		}];

		$scope.selectedCategories = $scope.categories;

		var items = {
			Cod: {
				title: 'Cod',
				price: '$3.99/lb',
				origin: 'Norway',
				description: 'Fillet, fresh',
				source: '/images/cod.jpg',
				date: '11/11/2018',
				oceanwise: true,
				fresh: true
			},
			Grouper: {
				title: 'Grouper',
				price: '$9.99/lb',
				origin: 'Australia',
				description: 'Whole, gutted, fresh',
				source: '/images/grouper.jpg',
				date: '11/12/2018',
				oceanwise: false,
				fresh: true
			},
			Halibut: {
				title: 'Halibut',
				price: '$15.99/lb',
				origin: 'Alaska',
				description: 'Fillet, fresh',
				source: '/images/halibut.jpg',
				date: '11/13/2018',
				oceanwise: true,
				fresh: true
			},
			Haddock: {
				title: 'Haddock',
				price: '$12.99/lb',
				origin: 'Russia',
				source: '/images/haddock.jpg',
				date: '10/25/2018',
				oceanwise: true,
				fresh: false
			},
			Salmon: {
				title: 'Salmon',
				price: '$11.99/lb',
				origin: 'Victoria',
				description: 'Whole, fresh',
				source: '/images/salmon.jpg',
				date: '11/11/2018',
				oceanwise: false,
				fresh: true
			}
		};

		($scope.init = function() {
			$scope.pathName = $window.sessionStorage.getItem('path');

			if ($scope.pathName === 'home') {
				$scope.path = '/';
			} else {
				$scope.path = '/shelf';
			}

			findItems();
			$rootScope.$broadcast('comparisonOpened');
		})();

		$scope.changeQuantity = function(operation, item) {
			if (operation === '-') {
				item.quantity--;
				$rootScope.$broadcast('shoppingCartRemove');
				toaster.pop({
					type: 'info',
					body: item.title + ' removed from cart'
				});
			} else {
				item.quantity++;
				$rootScope.$broadcast('shoppingCartAdd');
				toaster.pop({
					type: 'info',
					body: item.title + ' added to cart'
				});
			}

			$window.sessionStorage.setItem(item.title.toLowerCase(), item.quantity);
		}

		function findItems() {
			$scope.items = [];

			Object.keys(items).forEach(function(key) {
				var item = $window.sessionStorage.getItem('compare' + key);
				var quantity = $window.sessionStorage.getItem(key.toLowerCase()) || '0';

				if (item) {
					items[key].quantity = parseInt(quantity);
					$scope.items.push(items[key]);
				}
			});
		}

		$scope.$on('comparisonCleared', function(event, args) {
			$scope.items = [];
			$window.location.href = '/';
		});
	}]);