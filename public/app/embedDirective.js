app.directive('embedDirective', function() {
  return {
    restrict: 'A',
    template: '<div style="height:315px;width:560px;"><iframe class="video" style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>'
  };
});