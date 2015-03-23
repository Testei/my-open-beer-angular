module.exports=function($scope,config,$location,rest,$document,modalService){

	$scope.data = [];

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	var brewery = "breweries/" + config.activeBeer.idBrewery;
	rest.getAll($scope.data, brewery);

	$scope.viewBreweryName = function(){
		return $scope.data[brewery].name; 
	}

	$scope.viewBrewery = function(){
	//	if(angular.isDefined($scope.data[brewery]))
	//	config.activeBrewery=angular.copy($scope.data[brewery]);
	//	config.activeBrewery.reference=$scope.data[brewery];
		$location.path("breweries/details");
	}

};