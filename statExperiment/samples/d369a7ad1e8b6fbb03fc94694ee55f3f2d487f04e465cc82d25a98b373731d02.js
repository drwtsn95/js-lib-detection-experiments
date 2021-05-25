/*
This files table contents are outlined below >>>>>
**************************************************
01. Simple Pie Chart JS
02. Simple Donut Chart JS
03. Monochrome Pie Chart JS
04. Gradient Donut Chart JS
*/
 
(function($) {
    "use strict";
    jQuery(document).on('ready', function() {

        /* 01. Simple Pie Chart
        -------------------------------------------------*/
        var options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'pie',
            },
            labels: ['UK', 'USA', 'Canada', 'Australia', 'Italy'],
            series: [44, 55, 13, 43, 22],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            legend: {
                horizontalAlign: 'right',
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#apex-simple-pie-chart"),
            options
        );

        chart.render();


        /* 02. Simple Donut Chart Js
        -------------------------------------------------*/
        var options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'donut',
            },
            labels: ['UK', 'USA', 'Canada', 'Australia', 'Italy'],
            series: [44, 55, 41, 17, 15],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }

        var chart = new ApexCharts(
            document.querySelector("#apex-simple-donut-chart"),
            options
        );
        
        chart.render();


        /* 03. Monochrome Pie Chart JS
        -------------------------------------------------*/
        var options = {
            chart: {
                width: '100%',
                height: 430,
                type: 'pie',
            },
            series: [25, 15, 44, 55, 41, 17],
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            theme: {
                monochrome: {
                    enabled: true
                }
            },
            title: {
                text: "Number of leads"
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }

        var chart = new ApexCharts(
            document.querySelector("#apex-monochrome-pie-chart"),
            options
        );

        chart.render();

 
        /* 04. Gradient Donut Chart JS
        -------------------------------------------------*/
        var options = {
            chart: {
                width: '100%',
                height: 455,
                type: 'donut',
            },
            dataLabels: {
                enabled: false
            },
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            series: [44, 55, 41, 17, 15, 35],
            fill: {
                type: 'gradient',
            },
            legend: {
                formatter: function(val, opts) {
                    return val + " - " + opts.w.globals.series[opts.seriesIndex]
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
        var chart = new ApexCharts(
            document.querySelector("#apex-gradient-donut-chart"),
            options
        );
        chart.render();
        const paper = chart.paper()
    });
}(jQuery))