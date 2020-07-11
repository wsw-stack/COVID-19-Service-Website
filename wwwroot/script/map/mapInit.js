class ProvinceViewUnit {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

var myChart = echarts.init(document.getElementById('map'));
myChart.showLoading();

let url = "/api/map/province/certainDay?date=2020/3/14";

// $.ajax({
//     type: "get",
//     url: url,
//     dataType: 'json',
//     async: false,
//     success: function (result) {
//         result.forEach(province => dataCertainDay.push(new ProvinceViewUnit(province.provinceShortName, province.confirmedCount)));
//         myChart.hideLoading();
//     }
// });


let dataCertainDay = [];

// let result=[{"countryName":"中国","id":53,"provinceShortName":"云南","currentConfirmedCount":0,"confirmedCount":174,"suspectedCount":0,"curedCount":172,"deadCount":2,"cities":null,"updateTime":1584228357909,"date":"2020/3/14"},{"countryName":"中国","id":105,"provinceShortName":"天津","currentConfirmedCount":1,"confirmedCount":136,"suspectedCount":0,"curedCount":132,"deadCount":3,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":162,"provinceShortName":"广东","currentConfirmedCount":49,"confirmedCount":1356,"suspectedCount":0,"curedCount":1299,"deadCount":8,"cities":null,"updateTime":1584148243323,"date":"2020/3/14"},{"countryName":"中国","id":292,"provinceShortName":"北京","currentConfirmedCount":80,"confirmedCount":437,"suspectedCount":0,"curedCount":349,"deadCount":8,"cities":null,"updateTime":1584151798182,"date":"2020/3/14"},{"countryName":"中国","id":412,"provinceShortName":"浙江","currentConfirmedCount":15,"confirmedCount":1227,"suspectedCount":0,"curedCount":1211,"deadCount":1,"cities":null,"updateTime":1584151405518,"date":"2020/3/14"},{"countryName":"中国","id":471,"provinceShortName":"江苏","currentConfirmedCount":1,"confirmedCount":631,"suspectedCount":0,"curedCount":630,"deadCount":0,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":536,"provinceShortName":"湖北","currentConfirmedCount":11755,"confirmedCount":67790,"suspectedCount":0,"curedCount":52960,"deadCount":3075,"cities":null,"updateTime":1584179880660,"date":"2020/3/14"},{"countryName":"中国","id":660,"provinceShortName":"辽宁","currentConfirmedCount":11,"confirmedCount":125,"suspectedCount":0,"curedCount":113,"deadCount":1,"cities":null,"updateTime":1584144552403,"date":"2020/3/14"},{"countryName":"中国","id":865,"provinceShortName":"四川","currentConfirmedCount":25,"confirmedCount":539,"suspectedCount":0,"curedCount":511,"deadCount":3,"cities":null,"updateTime":1584159801810,"date":"2020/3/14"},{"countryName":"中国","id":925,"provinceShortName":"甘肃","currentConfirmedCount":41,"confirmedCount":132,"suspectedCount":0,"curedCount":89,"deadCount":2,"cities":null,"updateTime":1584230262402,"date":"2020/3/14"},{"countryName":"中国","id":1067,"provinceShortName":"重庆","currentConfirmedCount":1,"confirmedCount":576,"suspectedCount":0,"curedCount":569,"deadCount":6,"cities":null,"updateTime":1584228882863,"date":"2020/3/14"},{"countryName":"中国","id":1179,"provinceShortName":"黑龙江","currentConfirmedCount":22,"confirmedCount":482,"suspectedCount":0,"curedCount":447,"deadCount":13,"cities":null,"updateTime":1584144421138,"date":"2020/3/14"},{"countryName":"中国","id":1628,"provinceShortName":"香港","currentConfirmedCount":58,"confirmedCount":140,"suspectedCount":0,"curedCount":78,"deadCount":4,"cities":null,"updateTime":1584189738951,"date":"2020/3/14"},{"countryName":"中国","id":1674,"provinceShortName":"上海","currentConfirmedCount":26,"confirmedCount":353,"suspectedCount":0,"curedCount":324,"deadCount":3,"cities":null,"updateTime":1584230001051,"date":"2020/3/14"},{"countryName":"中国","id":1694,"provinceShortName":"台湾","currentConfirmedCount":32,"confirmedCount":53,"suspectedCount":0,"curedCount":20,"deadCount":1,"cities":null,"updateTime":1584169764950,"date":"2020/3/14"},{"countryName":"中国","id":1739,"provinceShortName":"山东","currentConfirmedCount":12,"confirmedCount":760,"suspectedCount":0,"curedCount":741,"deadCount":7,"cities":null,"updateTime":1584159801810,"date":"2020/3/14"},{"countryName":"中国","id":1782,"provinceShortName":"河南","currentConfirmedCount":1,"confirmedCount":1273,"suspectedCount":0,"curedCount":1250,"deadCount":22,"cities":null,"updateTime":1584179346329,"date":"2020/3/14"},{"countryName":"中国","id":1816,"provinceShortName":"贵州","currentConfirmedCount":1,"confirmedCount":146,"suspectedCount":0,"curedCount":143,"deadCount":2,"cities":null,"updateTime":1584147123290,"date":"2020/3/14"},{"countryName":"中国","id":1823,"provinceShortName":"宁夏","currentConfirmedCount":2,"confirmedCount":75,"suspectedCount":0,"curedCount":73,"deadCount":0,"cities":null,"updateTime":1584179346329,"date":"2020/3/14"},{"countryName":"中国","id":1833,"provinceShortName":"湖南","currentConfirmedCount":0,"confirmedCount":1018,"suspectedCount":0,"curedCount":1014,"deadCount":4,"cities":null,"updateTime":1584174305688,"date":"2020/3/14"},{"countryName":"中国","id":1853,"provinceShortName":"山西","currentConfirmedCount":0,"confirmedCount":133,"suspectedCount":0,"curedCount":133,"deadCount":0,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":1921,"provinceShortName":"澳门","currentConfirmedCount":0,"confirmedCount":10,"suspectedCount":0,"curedCount":10,"deadCount":0,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":1955,"provinceShortName":"福建","currentConfirmedCount":0,"confirmedCount":296,"suspectedCount":0,"curedCount":295,"deadCount":1,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":1972,"provinceShortName":"内蒙古","currentConfirmedCount":3,"confirmedCount":75,"suspectedCount":0,"curedCount":71,"deadCount":1,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":1980,"provinceShortName":"江西","currentConfirmedCount":0,"confirmedCount":935,"suspectedCount":0,"curedCount":934,"deadCount":1,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":1994,"provinceShortName":"河北","currentConfirmedCount":2,"confirmedCount":318,"suspectedCount":0,"curedCount":310,"deadCount":6,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2023,"provinceShortName":"吉林","currentConfirmedCount":0,"confirmedCount":93,"suspectedCount":0,"curedCount":92,"deadCount":1,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2046,"provinceShortName":"陕西","currentConfirmedCount":11,"confirmedCount":245,"suspectedCount":0,"curedCount":232,"deadCount":2,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2060,"provinceShortName":"海南","currentConfirmedCount":2,"confirmedCount":168,"suspectedCount":0,"curedCount":160,"deadCount":6,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2074,"provinceShortName":"广西","currentConfirmedCount":7,"confirmedCount":252,"suspectedCount":0,"curedCount":243,"deadCount":2,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2141,"provinceShortName":"新疆","currentConfirmedCount":0,"confirmedCount":76,"suspectedCount":0,"curedCount":73,"deadCount":3,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2163,"provinceShortName":"安徽","currentConfirmedCount":0,"confirmedCount":990,"suspectedCount":0,"curedCount":984,"deadCount":6,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2204,"provinceShortName":"青海","currentConfirmedCount":0,"confirmedCount":18,"suspectedCount":0,"curedCount":18,"deadCount":0,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"},{"countryName":"中国","id":2262,"provinceShortName":"西藏","currentConfirmedCount":0,"confirmedCount":1,"suspectedCount":0,"curedCount":1,"deadCount":0,"cities":null,"updateTime":1584144000000,"date":"2020/3/14"}]
// result.forEach(province => dataCertainDay.push(new ProvinceViewUnit(province.provinceShortName, province.confirmedCount)));
// console.log(dataCertainDay);
// myChart.hideLoading();


var option = {
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
            return params.name + ': ' + value+'例';
        }
    },
    visualMap: {
        type: 'piecewise',
        splitNumber:6,
        left: 'right',
        min:0,
        max:100000,
        pieces:[
            {gte:10000,color:'#a50026'},       /*1-9*/
            {gte:1000,lte:9999,color:'#d73027'},     /*10-99*/
            {gte:100,lte:999,color:'#f46d43'},
            {gte:10,lte:99,color:'#fdae61'},
            {gte:1,lte:9,color:'#fee090'},
            {value:0,color:'#ffffbf'}
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
    // timeline: {
    //     show: true,
    //     currentIndex: 0
    // }
}


axios.get(url)
    .then(function (response) {
        response.data.forEach(province => dataCertainDay.push(new ProvinceViewUnit(province.provinceShortName, province.confirmedCount)));
        myChart.hideLoading();

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })