angular.module('websiteApp')
.controller('shelfController', ['$scope', '$rootScope', '$http', '$window', '$uibModal',
	function($scope, $rootScope, $http, $window, $uibModal) {
		(function init() {
			$window.sessionStorage.setItem('path', 'shelf');
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