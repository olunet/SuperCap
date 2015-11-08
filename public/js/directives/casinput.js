angular.module('SuperCap').directive('casInput', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><input type="text" ng-model="value" typeahead="{{valueExpr}} | filter:$viewValue" typeahead-on-select="onSelect($item,$model,$label)" class="form-control" placeholder="Enter a CAS number"></div>',
        scope: {
            value: '=',
            collection: '=',
            valueExpr: '@'
        },
        link: {
            pre: function (scope, el) {
            },
            post: function (scope, el, attrs) {
                scope.changed = false;
                scope.onSelect = function ($item, $model, $label) {
                    scope.changed = true;
                };
            }
        }
    };
});