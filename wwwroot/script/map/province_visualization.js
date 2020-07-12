let mapChart = echarts.init(document.getElementById('map_task1'));
let lineChart = echarts.init(document.getElementById('lineChart_task1'));
let barChart = echarts.init(document.getElementById('barChart_task1'));

// 基本方法
function overallDataInit() {
    confirmedOverall.splice(0, confirmedOverall.length);
    curedOverall.splice(0, curedOverall.length);
    deadOverall.splice(0, deadOverall.length);
    currentConfirmedOverall.splice(0, currentConfirmedOverall.length);
}

function rankDataInit() {
    provinceNames.splice(0, provinceNames.length);
    curedRank.splice(0, curedRank.length);
    confirmedRank.splice(0, confirmedRank.length);
    deadRank.splice(0, deadRank.length);
    currentConfirmedRank.splice(0, currentConfirmedRank.length);
    pieData.splice(0, pieData.length);
}

// 字段定义
let step = 3;
const baseUrl = '/api/map';
let timeSeries = getTimeSeriesArray(step);      // timeSeries对象，包含两个属性:timeSeries（日期格式：yyyy/m/d）和timeViewSeries（日期格式：m/d）
let key = '累计确诊';

// map
let mapData = [];
// linechart
let confirmedOverall = [];
let curedOverall = [];
let deadOverall = [];
let currentConfirmedOverall = [];
// barchart
let provinceNames = [];
let confirmedRank = [];
let curedRank = [];
let deadRank = [];
let currentConfirmedRank = [];
let pieData = [];

// 业务逻辑

// 获取特定日期的各省数据并渲染
let getCertainDay = function (key = '累计确诊', dateIndex) {
    // 地图
    //mapChart.showLoading();
    let url = baseUrl + '/province/certainDay';
    url = url + '?date=' + timeSeries.timeSeries[dateIndex];

    // 调用后端web api
    axios.get(url)
        .then(function (response) {
            mapData.splice(0, mapData.length);

            // 将后端返回数据进行填充
            response.data.forEach(province => mapData.push(new ProvinceDataUnit(province.provinceShortName, province.confirmedCount)));

            //mapChart.hideLoading();
            mapOption.baseOption.timeline.currentIndex = dateIndex;
            mapChart.setOption(mapOption);
        });

    getTop10Data(key, dateIndex);    // 柱状图
};

// 获取全国的时间序列数据，用于渲染线状图
let getDataOverall = function (step = 3) {
    //lineChart.showLoading();

    let url = baseUrl + '/country/timeSeries';

    // 调用后端web api
    axios.get(url)
        .then(function (response) {
            overallDataInit();

            // 将后端返回数据进行填充
            let i = 0;
            response.data.forEach(s => {
                if (i % step === 0) {
                    confirmedOverall.push(s.confirmedCount);
                    curedOverall.push(s.curedCount);
                    deadOverall.push(s.deadCount);
                    if (s.currentConfirmedCount === 0) {
                        let count = s.confirmedCount - s.curedCount - s.deadCount;
                        currentConfirmedOverall.push(count);
                    } else {
                        currentConfirmedOverall.push(s.currentConfirmedCount);
                    }
                }
                i++;

            });

            lineChart.hideLoading();
            lineChart.setOption(lineChartOption);
        })
};

// 获取特定日期前10省份数据，用于渲染bar chart
let getTop10Data = function (key, dateIndex) {
    //barChart.showLoading();

    let url = baseUrl + '/province/top10';
    url = url + '?key=' + key + '&&date=' + timeSeries.timeSeries[dateIndex];

    // 调用后端web api
    axios.get(url)
        .then(function (response) {
            rankDataInit();

            let others = 0;
            let i = 1;

            response.data.forEach(s => {
                provinceNames.push(s.provinceShortName);
                confirmedRank.push(s.confirmedCount);
                curedRank.push(s.curedCount);
                deadRank.push(s.deadCount);
                if (s.currentConfirmedCount === 0) {
                    let count = s.confirmedCount - s.curedCount - s.deadCount;
                    currentConfirmedRank.push(count);
                } else {
                    currentConfirmedRank.push(s.currentConfirmedCount);
                }

                let top_value = 0;
                let others_value = 0;

                switch (key) {
                    case ('累计确诊'):
                        top_value = others_value = s.confirmedCount;
                        break;
                    case('累计死亡'):
                        top_value = others_value = s.deadcOUNT;
                        break;
                    case('累计治愈'):
                        top_value = others_value = s.curedCount;
                        break;
                    case('当前确诊'):
                        top_value = others_value = s.currentConfirmedCount;
                        break;
                }

                if (i <= 3) {
                    pieData.push({name: s.provinceShortName, value: top_value});
                } else {
                    others += others_value;
                }

                i++;
            });

            pieData.push({name: '其它', value: others});

            barChart.hideLoading();
            barChart.setOption(barChartOption);
        })
}

// echarts options
let mapOption = {
    baseOption: {
        timeline: {
            axisType: 'category',
            data: timeSeries.timeSeriesView,
            playInterval: 500,
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
                data: mapData
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
    title: {
        text: '全国疫情趋势'
    },
    legend: {
        data: ['累计确诊', '累计死亡', '累计治愈', '现存确诊'],
    },
    tooltip: {
        trigger: 'axis',
        showContent: true,
    },
    xAxis: {
        type: 'category',
        data: timeSeries.timeSeriesView,
        splitLine: {
            show: false
        },
    },
    yAxis: {gridIndex: 0},
    series: [
        {name: '累计确诊', type: 'line', smooth: true, seriesLayoutBy: 'row', data: confirmedOverall},
        {name: '累计死亡', type: 'line', smooth: true, seriesLayoutBy: 'row', data: deadOverall},
        {name: '累计治愈', type: 'line', smooth: true, seriesLayoutBy: 'row', data: curedOverall},
        {name: '现存确诊', type: 'line', smooth: true, seriesLayoutBy: 'row', data: currentConfirmedOverall}
    ]
};

let barChartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: provinceNames,
        inverse: true,
    },
    series: [
        {
            type: 'bar',
            data: confirmedRank,
            name: '累计确诊',
            stack: 'a'
        },
        {
            type: 'bar',
            data: deadRank,
            name: '累计死亡',
            stack: 'a'
        },
        {
            type: 'bar',
            data: curedRank,
            name: '累计治愈',
            stack: 'a'
        },
        {
            type: 'pie',
            name: '湖北省占比',
            center: ['55%', '65%'],
            radius: '30%',
            seletedMode: 'single',
            data: pieData,
            hoverAnimation: false,
            color: ['#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            label: {
                normal: {
                    formatter: '{b}: {d}%'
                }
            },
        }
    ],
    legend: {
        data: ['累计确诊', '累计死亡', '累计治愈']
    }
};

// 事件
mapChart.on('timelinechanged', function (timelineIndex) {
    let arrIndex = parseInt(timelineIndex.currentIndex);
    getCertainDay(key, arrIndex);
});

lineChart.on('updateAxisPointer', function (event) {
    let xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
        let dimension = xAxisInfo.value;
        getCertainDay(key, dimension);
    }
});

getDataOverall(step);
getCertainDay(key, 0);
lineChart.setOption(lineChartOption);