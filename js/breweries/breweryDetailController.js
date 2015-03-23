module.exports=function($scope,config,$location,rest,$document,modalService){

	$scope.data = [];

	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	}
	$scope.activeBrewery=config.activeBrewery;
	
	var beers = "beers/" + config.activeBrewery.id;
	rest.getAll($scope.data, beers);

	$scope.countBeers = function(){
		// Soit la fontion ne s'execute pas (sur à 99,99%)
		// Soit quelque chose met à jour les données affichées juste après l'affichage (0,01%)
		if($scope.data[beers] == undefined){
			return 0;
		}
		else{
			miahou = $scope.data[beers].length;
			return miahou;
		}
	};

	$scope.viewBeers = function(){
		//A COMPLETER
	}

};