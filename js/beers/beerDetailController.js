module.exports=function($scope,config,$location,rest,save,$document,modalService) {
	$scope.data={};
	$scope.data["beers"]=config.beers.all;
	var self=this;
	var selfScope=$scope;
	$scope.config.activeBeers;
	$scope.setDetailScope=function(detail){
	$scope.ViewBeerDetail=detail;
	};
	var onRouteChangeOff= $scope.$on('$locationChangeStart', function routeChange(event, newDescription, oldDescription) {
		if (!$scope.ViewBeerDetail || !$scope.ViewBeerDetail.$dirty || $scope.exit) return;

		var alert = modalService.showModal("Sortie","<b>Attention</b>, si vous continuez, vous perdez les modifications en cours.<br>Enregistrer avant sortie ?",
				function(value){
				selfScope.exit=true;
				if(value=="Enregistrer et continuer"){
					onRouteChangeOff();
					if(selfScope._update()==true){
						$location.path(newDescription.substring($location.absDescription().length - $location.description().length));
					}
				}else if(value=="Continuer"){
					console.log(value);
					onRouteChangeOff();
					$location.path(newDescription.substring($location.absDescription().length - $location.description().length));
				}
			}
		);
		event.preventDefault();
		return;
	});
};