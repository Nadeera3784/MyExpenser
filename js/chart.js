"use strict";
! function() {
    var e = {
            300: "#E3EBF6",
            600: "#95AAC9",
            700: "#6E84A3",
            800: "#152E4D",
            900: "#283E59"
        },
        t = {
            100: "#D2DDEC",
            300: "#A6C5F7",
            700: "#2C7BE5"
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
            color: e[300],
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
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(e) {
                            if (!(e % 10)) return "$" + e + "k"
                        }
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
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Sales",
                data: [25, 20, 30, 22, 17, 10, 18, 26, 28, 26, 20, 32]
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