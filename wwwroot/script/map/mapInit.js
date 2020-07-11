var myChart = echarts.init(document.getElementById('map'));
myChart.showLoading();
myChart.hideLoading();

var option = {
    series: [{
        name: '中国',
        type: 'map',
        mapType: 'china',
        selectedMode: 'multiple',
        label: {
            normal: {
                show: true, //显示省份标签
                // textStyle:{color:"#c71585"}//省份标签字体颜色
            },
            emphasis: {
                show: true, //对应的鼠标悬浮效果
                // textStyle:{color:"#800080"}
            }
        },
        itemStyle: {
            normal: {
                borderWidth: .5, //区域边框宽度
                borderColor: '#827a82', //区域边框颜色
                areaColor: "#ffb87c", //区域颜色
            },
            emphasis: {
                borderWidth: .5,
                borderColor: '#827a82',
                areaColor: "#c1ffff",
            }
        },
    }]
}

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);