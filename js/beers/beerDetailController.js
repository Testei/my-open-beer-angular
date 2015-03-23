module.exports=function($scope,config,$location,rest,$document,modalService){

	$scope.data = {};

	if(angular.isUndefined(config.activeBeer)){
		$location.path("beers/");
	}
	$scope.activeBeer=config.activeBeer;
	
	var brewery = "breweries/" + config.activeBeer.idBrewery;
	rest.getAll($scope.data, brewery);
	
	$scope.viewBeers = function(){
		$location.path("beers/");
	};

	$scope.viewBreweryName = function(){
		return $scope.data[brasserie].name; 
	}
/*
	$scope.viewBrewery = function(){
		if(angular.isDefined($scope.data[brasserie]))
		config.activeBrewery=angular.copy($scope.data[brasserie]);
		config.activeBrewery.reference=$scope.data[brasserie];
		$location.path("breweries/details");
	}
*/
	
	/*$scope._details=function(beer,force,callback){
		var result=false;
		if(force || $scope.detailsBeer.$dirty){
			if(angular.isUndefined(beer)){
				beer=$scope.activeBeer;
			}else{
				config.activeBeer=angular.copy(beer);
				config.activeBeer.reference=beer;
			}
			$scope.data.posted={
			    "name" : beer.name,
			    "description"  : beer.description
			};
			
			config.activeBeer.reference.name=$scope.activeBeer.name;
			config.activeBeer.reference.description=$scope.activeBeer.description;
			
		}else{
			result=true;
		}
		return result;
	}*/
};