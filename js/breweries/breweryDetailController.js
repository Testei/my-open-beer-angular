module.exports=function($scope,config,$location,rest,$document,modalService){

	$scope.data = [];

	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	}
	$scope.activeBrewery=config.activeBrewery;
	
	var beers = "beers/brewery/" + config.activeBrewery.id;
	rest.getAll($scope.data, beers);

	$scope.countBeers = function(){
		if($scope.data[beers] == undefined){
			return 0;
		}
		else{
			return $scope.data[beers].length;
		}
	};

	$scope.viewBeers = function(){//vue avec plusieurs bieres
		//A COMPLETER
	}
};