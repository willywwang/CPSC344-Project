angular.module('websiteApp')
.controller('shelfController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		var matchAll = ['seafood', 'fish'];

		$scope.isMatch = true;
		$scope.highlightedObjects = {
			'cod': false,
			'grouper': false,
			'haddock': false,
			'salmon': false,
			'halibut': false
		};

		(function init() {
			$window.sessionStorage.setItem('path', 'shelf');
			highlightObjects();
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

		function highlightObjects() {
			var isAllMatch = false;
			var searchTerm = $window.sessionStorage.getItem('search') || '';
			var searchTerms = searchTerm.split(' ');

			$scope.highlightedObjects = {
				'cod': false,
				'grouper': false,
				'haddock': false,
				'salmon': false,
				'halibut': false
			};

			_.each(searchTerms, function(term) {
				term = term.toLowerCase();
				if (matchAll.includes(term)) {
					isAllMatch = true;
				} else if (term == 'cod') {
					$scope.highlightedObjects['cod'] = true;
				} else if (term == 'grouper') {
					$scope.highlightedObjects['grouper'] = true;
				} else if (term == 'haddock') {
					$scope.highlightedObjects['haddock'] = true;
				} else if (term == 'salmon') {
					$scope.highlightedObjects['salmon'] = true;
				} else if (term == 'halibut') {
					$scope.highlightedObjects['halibut'] = true;
				}
			});

			if (isAllMatch) {
				$scope.highlightedObjects = {
					'cod': true,
					'grouper': true,
					'haddock': true,
					'salmon': true,
					'halibut': true
				};
			}
		}

		$scope.$on('searchUpdated', function(event, args) {
			highlightObjects();
		});
	}]);