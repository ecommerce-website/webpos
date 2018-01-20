angular.module('WebposApp').service('BuildUrl', function() {
    this.token = "931e54c126cfca6e31b0c905d36d6614";
    this.guard = "api";
    this.method = "rest";
    this.version = "v1";

    this.bindParams = function(url) {
        var self = this;
        var params = {};
        params.guard = self.guard;
        params.method = self.method;
        params.version = self.version;
        params.url = url;
        var part = '';
        $.each(params, function(key, value) {
            if (value != undefined && key != 'baseUrl' && key != 'guard') {
                part += "/";
            }
            part += value;

        });
        if (this.token != '')
            part += "?token=" + this.token;
        return part;
    };
});