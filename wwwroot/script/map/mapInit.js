let mapChart = echarts.init(document.getElementById('map_task1'));
let lineChart = echarts.init(document.getElementById('lineChart_task1'));

// 基本方法
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

function overallDataInit() {
    confirmedOverall.splice(0, confirmedOverall.length);
    curedOverall.splice(0, curedOverall.length);
    deadOverall.splice(0, deadOverall.length);
    currentConfirmedOverall.splice(0, currentConfirmedOverall.length);
}

// 字段定义
const baseUrl = '/api/map';
let mapData = [];
let confirmedOverall = [];
let curedOverall = [];
let deadOverall = [];
let currentConfirmedOverall = [];
let timeSeries = getTimeSeriesArray(3);

// 业务逻辑

// 获取特定日期的各省数据并渲染
let getCertainDay = function (date) {
    mapChart.showLoading();

    let url = baseUrl + '/province/certainDay';
    url = url + '?date=' + date;

    // 调用后端web api
    axios.get(url)
        .then(function (response) {
            mapData.splice(0, mapData.length);

            // 将后端返回数据进行填充
            response.data.forEach(province => mapData.push(new ProvinceDataUnit(province.provinceShortName, province.confirmedCount)));

            mapChart.hideLoading();
            mapChart.setOption(mapOption);
        });
};

// 获取全国的时间序列数据，用于渲染线状图
let getDaraOverall = function () {
    lineChart.showLoading();

    let url = baseUrl + '/country/timeSeries';

    // 调用后端web api
    axios.get(url)
        .then(function (response) {
            overallDataInit();

            // 将后端返回数据进行填充
            response.data.forEach(s => {
                confirmedOverall.push(s.confirmedCount);
                curedOverall.push(s.curedCount);
                deadOverall.push(s.deadCount);
                currentConfirmedOverall.push(s.currentConfirmedCount);

                lineChart.hideLoading();
                lineChart.setOption(lineChartOption);
            })
        })
};

// echarts options
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
                data: mapDataCertainDay
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
    legend: {
        data: ['累计确诊', '累计死亡', '累计治愈', '现存确诊']
    },
    tooltip: {
        trigger: 'axis',
        showContent: false
    },
    xAxis: {type: 'category'},
    yAxis: {gridIndex: 0},
    grid: {top: '55%'},
    series: [
        {type: 'line', smooth: true, seriesLayoutBy: 'row', data: confirmedOverall},
        {type: 'line', smooth: true, seriesLayoutBy: 'row', data: deadOverall},
        {type: 'line', smooth: true, seriesLayoutBy: 'row', data: curedOverall},
        {type: 'line', smooth: true, seriesLayoutBy: 'row', data: currentConfirmedOverall}
    ]
};

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

getDaraOverall();
getCertainDay(dateToString(timeSeries.startDate));
lineChart.setOption(lineChartOption);