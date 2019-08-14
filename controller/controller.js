const path = require('path');
const fs = require("fs");
const {getCurrentWindow} = require('electron').remote;
let app = angular.module("App", ["ngRoute", "datatables",  "ui.bootstrap.contextMenu", "angular.switchery"]); 

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
      templateUrl : "views/mainui.html", 
      activeclass: "/"
    }).when("/category", {
      templateUrl : "views/categoryui.html",
      activeclass: "category"
    }).when("/settings", {
      templateUrl : "views/settingsui.html",
      activeclass: "settings"
    }).otherwise({
        templateUrl : "views/mainui.html"
    });
}).run(function ($rootScope, $route) {
    $rootScope.$route = $route;
});

app.controller('appController', function($scope, $rootScope, ContextMenuEvents, DTOptionsBuilder, DTColumnDefBuilder, DTDefaultOptions) {

    
    loader();


    $scope.selectionValidator = function(){
        if ($scope.category != "" && $scope.category != undefined && $scope.category != 0){
            $scope.selectError = false;
        }else{
            $scope.selectError = true;
        }
    }


    $scope.ContextMenu = [
        ['Delete', function($itemScope, event, modelValue, text, $li) {

            new NotificationHelper.NotificationHelpers().confirm('Are You Sure You Want To Delete This Record ?', function(){
                new NotificationHelper.NotificationHelpers().error('Aw, why not? :(', 2);
            }, function(){
                new SqlHelper.SqlHelpers().initialize().then(function(db){
                    var query = "DELETE  FROM expense WHERE id="+$itemScope.item[0];
                    db.exec(query);
                    fs.writeFileSync(path.join(__dirname, 'database/database.sqlite'), Buffer.from(db.export()));
                    new NotificationHelper.NotificationHelpers().success('The Selected Record Has Been Successfully Deleted!', 20);
                    location.reload();
                });
            });
        }]
    ];

    $scope.addModal = function(){
        new SqlHelper.SqlHelpers().initialize().then(function(db){
            var rowcategories = db.exec("select * from categories");
            var contentcategories = JSON.stringify(rowcategories);
            $scope.categories = JSON.parse(contentcategories)[0].values;
            $scope.$apply();
        });
        angular.element('#newModal').modal('show');
    }
    
    $scope.newItem = function(){
        if ($scope.identity_type!=undefined){
            $scope.typeError = true;
         }else{
            $scope.typeError = false;
         };

         new SqlHelper.SqlHelpers().initialize().then(function(db){
             var getIDQuery = db.exec("SELECT id FROM expense ORDER BY date DESC LIMIT 1");
             var  IDQuery =  JSON.stringify(getIDQuery);
             if(JSON.parse(IDQuery)[0].values[0][0]){
                 var ID = JSON.parse(IDQuery)[0].values[0][0] + 1;
             }else{
                var ID = 1;
             }
            db.exec("INSERT INTO expense VALUES ("+ID+", "+$scope.category+", "+$scope.identity_type+",  "+$scope.amount+", "+Date.now()+")");
            fs.writeFileSync(path.join(__dirname, 'database/database.sqlite'), Buffer.from(db.export()));
        });
        angular.element('#newModal').modal('hide');
        loader();
        location.reload();
    }
    
    function loader(){
        $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(3)
                        .withLanguage({
                            "oPaginate": {
                                "sNext":     "<i class='mdi mdi-arrow-right'></i>",
                                "sPrevious": "<i class='mdi mdi-arrow-left'></i>"
                            }
                        });
        new SqlHelper.SqlHelpers().initialize().then(function(db){
            var row = db.exec("select expense.*,categories.*,type.* from expense inner join categories on categories.category_id = expense.category_id inner join type on type.type_id = expense.type_id");
            var expense = db.exec("SELECT SUM(expense_amount) FROM expense WHERE type_id = 1");
            var income = db.exec("SELECT SUM(expense_amount) FROM expense WHERE type_id = 2");
            $scope.incomeCount = (income[0].values[0][0]) ? income[0].values[0][0] : 0;
            $scope.expenseCount = (expense[0].values[0][0]) ? expense[0].values[0][0] : 0;
            $scope.balanceCount = income[0].values[0][0] - expense[0].values[0][0];
            var content = JSON.stringify(row);
            $scope.items = JSON.parse(content)[0].values;
            var today = new Date();
            var dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var weekreport = db.exec("SELECT COUNT(expense_amount) as total FROM expense WHERE DATE(date) ="+dateTime);
            console.log(weekreport);
            $scope.$apply();
        });
    }

!function() {
    var e = {
            300: "#E3EBF6"
        },
        t = {
            700: "#e63757"
        },
        a = "#FFFFFF",
        o = "transparent",
        l = "Cerebri Sans",
        n = document.querySelectorAll('[data-toggle="chart"]'),
        r = document.querySelectorAll('[data-toggle="legend"]');


    "undefined" != typeof Chart && (Chart.defaults.global.responsive = !0, Chart.defaults.global.maintainAspectRatio = !1, Chart.defaults.global.defaultColor = e[600], Chart.defaults.global.defaultFontColor = e[600], Chart.defaults.global.defaultFontFamily = l, Chart.defaults.global.defaultFontSize = 13, Chart.defaults.global.layout.padding = 0, Chart.defaults.global.legend.display = !1, Chart.defaults.global.legend.position = "bottom", Chart.defaults.global.legend.labels.usePointStyle = !0, Chart.defaults.global.legend.labels.padding = 16, Chart.defaults.global.elements.point.radius = 0, Chart.defaults.global.elements.point.backgroundColor = t[700], Chart.defaults.global.elements.line.tension = .4, Chart.defaults.global.elements.line.borderWidth = 3, Chart.defaults.global.elements.line.borderColor = t[700], Chart.defaults.global.elements.line.backgroundColor = o, Chart.defaults.global.elements.line.borderCapStyle = "rounded", Chart.defaults.global.elements.rectangle.backgroundColor = t[700], Chart.defaults.global.elements.arc.backgroundColor = t[700], Chart.defaults.global.elements.arc.borderColor = a, Chart.defaults.global.elements.arc.borderWidth = 4, Chart.defaults.global.elements.arc.hoverBorderColor = a, Chart.defaults.global.tooltips.enabled = !1, Chart.defaults.global.tooltips.mode = "index", Chart.defaults.global.tooltips.intersect = !1, Chart.defaults.global.tooltips.custom = function(l) {
        var e = document.getElementById("chart-tooltip");
        if (e || ((e = document.createElement("div")).setAttribute("id", "chart-tooltip"), e.setAttribute("role", "tooltip"), e.classList.add("popover"), e.classList.add("bs-popover-top"), document.body.appendChild(e)), 0 !== l.opacity) {
            if (l.body) {
                var t = l.title || [],
                    n = l.body.map(function(e) {
                        return e.lines
                    }),
                    r = "";
                r += '<div class="arrow"></div>', t.forEach(function(e) {
                    r += '<h3 class="popover-header text-center">' + e + "</h3>"
                }), n.forEach(function(e, t) {
                    var a = '<span class="popover-body-indicator" style="background-color: ' + l.labelColors[t].backgroundColor + '"></span>',
                        o = 1 < n.length ? "justify-content-left" : "justify-content-center";
                    r += '<div class="popover-body d-flex align-items-center ' + o + '">' + a + e + "</div>"
                }), e.innerHTML = r
            }
            var a = this._chart.canvas,
                o = a.getBoundingClientRect(),
                s = (a.offsetWidth, a.offsetHeight, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
                c = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                i = o.top + s,
                d = o.left + c,
                u = e.offsetWidth,
                f = e.offsetHeight,
                p = i + l.caretY - f - 16,
                b = d + l.caretX - u / 2;
            e.style.top = p + "px", e.style.left = b + "px", e.style.visibility = "visible"
        } else e.style.visibility = "hidden"
    }, Chart.defaults.global.tooltips.callbacks.label = function(e, t) {
        var a = t.datasets[e.datasetIndex].label || "",
            o = e.yLabel,
            l = "";
        return 1 < t.datasets.length && (l += '<span class="popover-body-label mr-auto">' + a + "</span>"), l += '<span class="popover-body-value">' + o + "</span>"
    }, Chart.defaults.doughnut.cutoutPercentage = 83, Chart.defaults.doughnut.tooltips.callbacks.title = function(e, t) {
        return t.labels[e[0].index]
    }, Chart.defaults.doughnut.tooltips.callbacks.label = function(e, t) {
        var a = "";
        return a += '<span class="popover-body-value">' + t.datasets[0].data[e.index] + "</span>"
    }, Chart.defaults.doughnut.legendCallback = function(e) {
        var o = e.data,
            l = "";
        return o.labels.forEach(function(e, t) {
            var a = o.datasets[0].backgroundColor[t];
            l += '<span class="chart-legend-item">', l += '<i class="chart-legend-indicator" style="background-color: ' + a + '"></i>', l += e, l += "</span>"
        }), l
    }, Chart.scaleService.updateScaleDefaults("linear", {
        gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            //color: e[300],
            drawBorder: !1,
            drawTicks: !1,
            zeroLineColor: e[300],
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2]
        },
        ticks: {
            beginAtZero: !0,
            padding: 10,
            callback: function(e) {
                if (!(e % 10)) return e
            }
        }
    }), Chart.scaleService.updateScaleDefaults("category", {
        gridLines: {
            drawBorder: !1,
            drawOnChartArea: !1,
            drawTicks: !1
        },
        ticks: {
            padding: 20
        },
        maxBarThickness: 10
    }), n && [].forEach.call(n, function(e) {
        e.addEventListener("change", function() {
            e.dataset.add && s(e)
        }), e.addEventListener("click", function() {
            e.dataset.update && c(e)
        })
    }), r && document.addEventListener("DOMContentLoaded", function() {
        [].forEach.call(r, function(e) {
            ! function(e) {
                var t = i(e).generateLegend(),
                    a = e.dataset.target;
                document.querySelector(a).innerHTML = t
            }(e)
        })
    }))
}(),
function() {
    var e = document.querySelectorAll('[data-toggle="autosize"]');
    "undefined" != typeof autosize && e && [].forEach.call(e, function(e) {
        ! function(e) {
            autosize(e)
        }(e)
    })
}(),
function() {
    var e = document.getElementById("ordersChart");
    "undefined" != typeof Chart && e && new Chart(e, {
        type: "bar",
        options: {
            legend: {
                labels: {
                    fontColor: "#24b314",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "#607d8b",
                        callback: function(e) {
                            if (!(e % 10)) return "Rs" + e
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "#607d8b"
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(e, t) {
                        var a = t.datasets[e.datasetIndex].label || "",
                            o = e.yLabel,
                            l = "";
                        return 1 < t.datasets.length && (l += '<span class="popover-body-label mr-auto">' + a + "</span>"), l += '<span class="popover-body-value">$' + o + "k</span>"
                    }
                }
            }
        },
        data: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [{
                label: "Sales",
                data: [100, 220, 550, 670, 350, 600, 108]
            }]
        }
    })
}(),


function() {
    var e = document.querySelectorAll('[data-toggle="popover"]');
    e && $(e).popover()
}(),

function() {
    var e = document.querySelectorAll('[data-toggle="tooltip"]');
    e && $(e).tooltip()
}();

});

app.controller('categoryController', function($scope, ContextMenuEvents, DTOptionsBuilder, DTColumnDefBuilder, DTDefaultOptions){

    Categoryloader();

    $scope.ContextMenu = [
        ['Edit', function($itemScope, event, modelValue, text, $li) {
            new SqlHelper.SqlHelpers().initialize().then(function(db){
                var query = "SELECT * FROM categories WHERE category_id="+$itemScope.item[0];
                var getIDQuery = db.exec(query);
                var  IDQuery =  JSON.stringify(getIDQuery);
                new NotificationHelper.NotificationHelpers().input(JSON.parse(IDQuery)[0].values[0][1], function(a){
                }, function(b){
                    var category_title = b;
                    var Updatequery = "UPDATE categories SET category_title = '"+category_title+"' WHERE category_id="+$itemScope.item[0];
                    db.exec(Updatequery);
                    fs.writeFileSync(path.join(__dirname, 'database/database.sqlite'), Buffer.from(db.export()));
                    new NotificationHelper.NotificationHelpers().success('The Selected Record Has Been Successfully Deleted!', 20);
                    location.reload();
                });
            });

        }],
        ['Delete', function($itemScope, event, modelValue, text, $li) {
            new NotificationHelper.NotificationHelpers().confirm('Are You Sure You Want To Delete This Record ?', function(){
                new NotificationHelper.NotificationHelpers().error('Aw, why not? :(', 2);
            }, function(){
                new SqlHelper.SqlHelpers().initialize().then(function(db){
                    var query = "DELETE  FROM categories WHERE category_id="+$itemScope.item[0];
                    db.exec(query);
                    fs.writeFileSync(path.join(__dirname, 'database/database.sqlite'), Buffer.from(db.export()));
                    new NotificationHelper.NotificationHelpers().success('The Selected Record Has Been Successfully Deleted!', 20);
                    location.reload();
                });
            });
        }]
    ];

    $scope.addModal = function(){
        angular.element('#newModal').modal('show');
    }

    $scope.newItem = function(){
         new SqlHelper.SqlHelpers().initialize().then(function(db){
             var getIDQuery = db.exec("SELECT category_id FROM categories ORDER BY category_id DESC LIMIT 1");
             var  IDQuery =  JSON.stringify(getIDQuery);
             if(JSON.parse(IDQuery)[0].values[0][0]){
                 var ID = JSON.parse(IDQuery)[0].values[0][0] + 1;
             }else{
                var ID = 1;
             }
            db.run("INSERT INTO categories (category_id,category_title) VALUES (?,?)",[ID, $scope.title]);
            fs.writeFileSync(path.join(__dirname, 'database/database.sqlite'), Buffer.from(db.export()));
        });
        angular.element('#newModal').modal('hide');
        Categoryloader();
        location.reload();
    }

    function Categoryloader(){
        $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(5)
        .withLanguage({
            "oPaginate": {
                "sNext":     "<i class='mdi mdi-arrow-right'></i>",
                "sPrevious": "<i class='mdi mdi-arrow-left'></i>"
            }
        });

        new SqlHelper.SqlHelpers().initialize().then(function(db){
            var row = db.exec("select * from categories");
            var content = JSON.stringify(row);
            $scope.items = JSON.parse(content)[0].values;
            $scope.$apply();
        });
    }

});

app.filter('dateformatter', function() {
    return function(input) {
      var options = {  year: 'numeric', month: 'long', day: 'numeric' };
      var create_date = new Date(input).toLocaleDateString("en-US", options);
      return create_date;
    };
});

app.filter('badgeformatter', function() {
    return function(input) {
      return (input.toString() == "Expense") ? "danger" : "success";
    };
});


app.filter('numberformatter', function() {
    return function(input) {
      return (input > 0) ? input : 0;
    };
});