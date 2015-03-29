module.exports=function($scope,config,$location,rest,$document,modalService){

	$scope.data = [];

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	//récupere les données de la brasserie produisant la Biere
	var brewery = "breweries/" + config.activeBeer.idBrewery;
	rest.getAll($scope.data, brewery);

	$scope.viewBreweryName = function(){
		return $scope.data[brewery].name; 
	}

	$scope.viewBrewery = function(){
	//non réussi à coriger : renvoie sur la liste des brasseries et non sur celle qui est selectionner
		config.activeBeer=angular.copy($scope.data[brewery].id);
		config.activeBeer.reference=$scope.data[brewery].id;
	
		$location.path("breweries/details/");
	}

};