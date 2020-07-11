let mapChart = echarts.init(document.getElementById('map_task1'));
let lineChart = echarts.init(document.getElementById('lineChart_task1'));

function showLoading() {
    mapChart.showLoading();
    lineChart.showLoading();
}

function hideLoading() {
    mapChart.hideLoading();
    lineChart.hideLoading();
}

function setOption() {
    mapChart.setOption(mapOption);
    lineChart.setOption(lineChartOption);
}

const baseUrl = '/api/map';

let dataCertainDay = [];
let timeSeries = getTimeSeriesArray(3);

let getCertainDay = function (date) {
    showLoading();  // 显示loading

    let url = baseUrl + '/province/certainDay';
    url = url + '?date=' + date;
    axios.get(url)
        .then(function (response) {
            dataCertainDay.splice(0, dataCertainDay.length);

            // 将后端返回数据进行填充
            response.data.forEach(province => dataCertainDay.push(new ProvinceDataUnit(province.provinceShortName, province.confirmedCount)));

            hideLoading();      // 隐藏loading
            setOption();        // 使用刚指定的配置项和数据显示图表。
        })
};

let mapOption = {
    baseOption: {
        timeline: {
            axisType: 'category',
            data: timeSeries.timeSeriesView,
            playInterval: 1000,
            loop: false,
            checkpointStyle: {
                symbol: 'diamond',
            }
        },
        title: {
            text: 'China COVID-19 Visualization, 25 January - 31 March, 2020',
            subtext: "Provided by Zhong Y., Guo H.P., Yan H.T., He R.D. and Sheng G.M. (Outside help)",
            sublink: 'https://github.com/ashyseer/COVID-19-Service-Website',
            left: 'right'
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                var value = (params.value + '').split('.');
                value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                return params.name + ': ' + value + '例';
            }
        },
        visualMap: {
            type: 'piecewise',
            splitNumber: 6,
            left: 'right',
            min: 0,
            max: 100000,
            pieces: [
                {gte: 10000, color: '#a50026'},       /*1-9*/
                {gte: 1000, lte: 9999, color: '#d73027'},     /*10-99*/
                {gte: 100, lte: 999, color: '#f46d43'},
                {gte: 10, lte: 99, color: '#fdae61'},
                {gte: 1, lte: 9, color: '#fee090'},
                {value: 0, color: '#ffffbf'}
            ],
            inRange: {
                color: ['#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            calculable: true
        },
        series: [
            {
                name: '中国COVID-19可视化',
                type: 'map',
                roam: true,
                mapType: 'china',

                label: {
                    emphasis: {
                        show: true, //对应的鼠标悬浮效果
                        // textStyle:{color:"#800080"}
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: .5, //区域边框宽度
                        borderColor: '#827a82', //区域边框颜色
                        areaColor: '#fff', //区域颜色
                    },
                    emphasis: {
                        borderWidth: .5,
                        borderColor: '#827a82',
                        areaColor: "#fffe13",
                    }
                },
                data: dataCertainDay
            }
        ],
        toolbox: {
            show: true,
            //orient: 'vertical',
            left: 'left',
            top: 'top',
            feature: {
                dataView: {readOnly: true},
                restore: {},
                saveAsImage: {}
            }
        },
    }
};

let lineChartOption = {
    legend: {},
    tooltip: {
        trigger: 'axis',
        showContent: false
    },
    dataset: {
        source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
        {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
                formatter: '{b}: {@2012} ({d}%)'
            },
            encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
            }
        }
    ]
}

<!--事件-->
mapChart.on('timelinechanged', function (timelineIndex) {
    let arrIndex = parseInt(timelineIndex.currentIndex);
    getCertainDay(timeSeries.timeSeries[arrIndex]);
});

lineChart.on('updateAxisPointer', function (event) {
    let xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
        let dimension = xAxisInfo.value + 1;
        lineChart.setOption({
            series: {
                id: 'pie',
                label: {
                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                    value: dimension,
                    tooltip: dimension
                }
            }
        });
    }
});

getCertainDay(dateToString(timeSeries.startDate));
lineChart.setOption(lineChartOption);