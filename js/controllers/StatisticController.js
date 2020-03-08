angular.module('WebposApp')
.directive('hcChart', function ($parse) {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            attrs.chart = new Highcharts.chart(element[0], {
                chart: {
                    animation: true,
                    renderTo: 'chart',
                    type: 'spline',
                },
                title: {
                    text: 'Thống kê thu nhập'
                },
                yAxis: {
                    title: {
                        text: 'VND'
                    }
                },
            });

            scope.$watch(function() {
                return attrs.categories;
            }, function() {
                if (attrs.chart.xAxis.length === 0) {
                    attrs.chart.addAxis($parse(attrs.categories)(scope));
                } else {
                    attrs.chart.xAxis[0].setCategories($parse(attrs.categories)(scope));
                }
            });

            scope.$watch(function() {
                return attrs.series;
            }, function() {
                var i;
                for (i = 0; i < $parse(attrs.series)(scope).length; i++) {
                    if (attrs.chart.series[i]) {
                        attrs.chart.series[i].setData($parse(attrs.series)(scope)[i].data);
                    } else {
                        attrs.chart.addSeries($parse(attrs.series)(scope)[i]);
                    }
                }

                // if (i < attrs.chart.series.length - 1) {
                //     var seriesLength = attrs.chart.series.length - 1;

                //     for (j = seriesLength; j > i; j--) {
                //         attrs.chart.series[j].remove();
                //     }
                // }
            });

        }
    };
})
.controller('StatisticController', function ($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {
    $scope.$on('$viewContentLoaded', function () {
        Layout.init();
        $scope.chartCategories = [];
        $scope.chartSeries = [];
        // $scope.product_stock_number = 1;
        //     // initialize core components
        //     App.initAjax();

        //     products.forEach(function(product) {
        //         Product.addProduct(product);
        //         Product.setProductSelect(product);
        //     });

        //     $log.info(Product);
        //     // $log.info(CallApi.callApiGet("https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&page=1"));
    });
    Layout.init();

    /** Time picker **/
    $scope.inlineOptions = {
        minDate: new Date(),
        showWeeks: true
    };

    $scope.openStart = function () {
        $scope.popupStart.opened = true;
    };

    $scope.openEnd = function () {
        $scope.popupEnd.opened = true;
    };

    $scope.format = 'dd/MM/yyyy'

    $scope.popupStart = {
        opened: false
    };

    $scope.popupEnd = {
        opened: false
    };

    $scope.rangeToDay = function () {
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.doStatistic();
    };

    $scope.rangeYesterday = function () {
        current = new Date(); tmpStart = new Date(); tmpEnd = new Date();
        tmpStart.setDate(current.getDate() - 1);
        tmpEnd.setDate(current.getDate() - 1);
        $scope.startDate = tmpStart;
        $scope.endDate = tmpEnd;
        $scope.doStatistic();
    };

    $scope.rangeThisWeek = function () {
        current = new Date(); tmpStart = new Date();
        tmpStart.setDate(current.getDate() - (current.getDay() - 1 + 7)%7);
        $scope.startDate = tmpStart;
        $scope.endDate = new Date();
        $scope.doStatistic();
    };

    $scope.rangeLastWeek = function () {
        current = new Date(); tmpStart = new Date();
        tmpStart.setDate(current.getDate() - 6);
        $scope.startDate = tmpStart;
        $scope.endDate = new Date();
        $scope.doStatistic();
    };

    $scope.rangeThisMonth = function () {
        current = new Date();
        $scope.startDate = new Date(current.getFullYear(), current.getMonth(), 1);
        $scope.endDate = new Date();
        $scope.doStatistic();
    };

    $scope.rangeLastMonth = function () {
        current = new Date(); tmpStart = new Date();
        tmpStart.setMonth(current.getMonth() - 1);
        tmpStart.setDate(tmpStart.getDate() + 1);
        $scope.startDate = tmpStart;
        $scope.endDate = new Date();
        $scope.doStatistic();
    };

    $scope.doStatistic = function () {
        tmp = new Date()
        tmp.setDate($scope.endDate.getDate() + 1);
        startDateStr = $scope.startDate.getFullYear() + '/' + ($scope.startDate.getMonth()+1) + '/' + $scope.startDate.getDate();
        endDateStr = tmp.getFullYear() + '/' + (tmp.getMonth()+1) + '/' + tmp.getDate();
        CallApi.callRestApiGet('statistic?startDate='+startDateStr+'&endDate='+endDateStr).then(function(data){
            console.log(data.data);
            $scope.chartCategories = data.data.listDate;
            $scope.chartSeries = [
                {
                    name: 'Bán hàng',
                    color: 'green',
                    data: data.data.income
                },
                {
                    name: 'Nhập hàng',
                    color: 'red',
                    data: data.data.outcome
                },
                {
                    name: 'Tổng doanh thu',
                    color: 'blue',
                    data: data.data.total
                }
            ];
            $scope.details = data.data.details;
            $scope.displayStartDate = $scope.startDate.getDate() + '/' + ($scope.startDate.getMonth()+1) + '/' + $scope.startDate.getFullYear();
            $scope.displayEndDate = $scope.endDate.getDate() + '/' + ($scope.endDate.getMonth()+1) + '/' + $scope.endDate.getFullYear();
            $scope.incomeValue = data.data.income.reduce((a, b) => a + b, 0);
            $scope.outcomeValue = data.data.outcome.reduce((a, b) => a + b, 0);
            $scope.totalValue = data.data.total.reduce((a, b) => a + b, 0)
        });
    };
    
    $scope.rangeLastWeek();

    /** Detail popup **/
    $scope.detailTransaction = function(transactionId){
        CallApi.callRestApiGet('transactions/show/'+transactionId).then(function(data){
            $scope.transaction = data.data;
            $scope.transaction.totalCost = 0;
            angular.forEach($scope.transaction.qltransactions, function(value, key){
                value.totalCost = value.ql_transactions_cost * value.ql_transactions_quantity_bought;
                $scope.transaction.totalCost += value.totalCost;
            });
        });
    }

    $scope.detailInvoice = function(invoiceId){
        CallApi.callRestApiGet('invoices/show/'+invoiceId).then(function(data){
            $scope.invoice = data.data;
            console.log($scope.invoice);
        });
    }
});