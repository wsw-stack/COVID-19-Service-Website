var myChart = echarts.init(document.getElementById('map'));
myChart.showLoading();
myChart.hideLoading();

var option = {
    title: {
        text: 'China COVID-19 Visualization, 25 January - 31 March',
        subtext: "Provided by Zhong Y., Guo H.P., Yan H.T., He R.D. and Sheng G.M. (Outside help)",
        sublink: 'https://github.com/ashyseer/COVID-19-Service-Website',
        left: 'right'
    },
    visualMap: {
        left: 'right',
        min: 0,
        max: 80000,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        text: ['High', 'Low'],           // 文本，默认为数值文本
        calculable: true
    },
    series: [{
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
                areaColor: '#313695', //区域颜色
            },
            emphasis: {
                borderWidth: .5,
                borderColor: '#827a82',
                areaColor: "#ffff14",
            }
        },
    }]
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);