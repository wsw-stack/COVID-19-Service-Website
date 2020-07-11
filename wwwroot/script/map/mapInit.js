let myChart = echarts.init(document.getElementById('map'));

const baseUrl = '/api/map';

let dataCertainDay = [];
let timeSeries = getTimeSeriesArray();

let getCertainDay = function (date) {
    myChart.showLoading();

    let url = baseUrl + '/province/certainDay';
    url = url + '?date=' + date;
    axios.get(url)
        .then(function (response) {
            dataCertainDay.splice(0, dataCertainDay.length);

            response.data.forEach(province => dataCertainDay.push(new ProvinceDataUnit(province.provinceShortName, province.confirmedCount)));
            console.log(dataCertainDay);
            myChart.hideLoading();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        })
};

let option = {
    baseOption: {
        timeline: {
            axisType: 'time',
            data: timeSeries,
            playInterval: 500
        },
        title: {
            text: 'China COVID-19 Visualization, 25 January - 31 March',
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
            top: 'bottom',
            feature: {
                dataView: {readOnly: true},
                restore: {},
                saveAsImage: {}
            }
        },
    }
};

myChart.on('timelinechanged', function (timelineIndex) {
    let arrIndex = parseInt(timelineIndex.currentIndex);
    getCertainDay(timeSeries[arrIndex]);
});

getCertainDay(timeSeries[0]);