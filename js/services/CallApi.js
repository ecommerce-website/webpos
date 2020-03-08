angular.module('WebposApp').service('CallApi', ['$http', '$httpParamSerializerJQLike', 'BuildUrl', function($http, $httpParamSerializerJQLike, BuildUrl) {

    /**
     * Call api rest GET
     * @param {*} apiUrl 
     */
    this.callRestApiGet = function callRestApiGet(apiUrl) {
        var url = BuildUrl.bindParams(apiUrl);
        return $http.get(url);
    };
    /**
     * Call api rest POST
     * @param {*} apiUrl 
     * @param {*} params 
     */
    this.callRestApiPost = function callRestApiPost(apiUrl, params) {
        var url = BuildUrl.bindParams(apiUrl);
        var config = {
            method: 'POST',
            url: url,
            data: JSON.stringify(params),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        return $http.post(url, params);
    };
    /**
     * Call api GET
     * @param {*} apiUrl 
     */
    this.callApiGet = function callApiGet(apiUrl) {
        return $http.get(apiUrl);
    };
    /**
     * Call api POST
     * @param {*} apiUrl 
     * @param {*} params 
     */
    this.callApiPost = function callApiPost(apiUrl, params) {
        var config = {
            method: 'POST',
            url: url,
            data: JSON.stringify(params),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        return $http.post(url, params);
    };

}]);