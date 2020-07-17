let official_rank = echarts.init(document.getElementById('official_rank'));
let weibo_rank = echarts.init(document.getElementById('weibo_rank'));
let official_senIndex = echarts.init(document.getElementById('official_senIndex'));
let weibo_senIndex = echarts.init(document.getElementById('weibo_senIndex'));

// 数据
let localPath = '../public';
// 疫情防控平台官方数据
let official_rank_legend_data = [];
let official_rank_series_data = [];
let official_senIndex_series_data = [];
let official_senIndex_legend_data = [];
// 微博数据
let weibo_rank_legend_data = [];
let weibo_rank_series_data = [];
let weibo_senIndex_series_data = [];
let weibo_senIndex_legend_data = [];

let getOfficialData = function () {
    let url = localPath + '/official_rank_data.json';
    axios.get(url)
        .then(function (response) {
            let official_data = response.data;

            for (let i = 0; i < official_data.series_data.length; i++) {
                official_rank_legend_data.push(official_data.legend_data[i]);
                official_rank_series_data.push(official_data.series_data[i]);
            }

            official_rank.setOption(option_official_rank);
        });

    url = localPath + '/official_senIndex_data.json';
    axios.get(url)
        .then(function (response) {
            let data = response.data;

            for (let i = 0; i < data.series_data.length; i++) {
                official_senIndex_legend_data.push(data.legend_data[i]);
                official_senIndex_series_data.push(data.series_data[i]);
            }

            official_senIndex.setOption(option_official_senIndex);
        })
};

let getWeiboData = function () {
    let url = localPath + '/weibo_rank_data.json';
    axios.get(url)
        .then(function (response) {
            let weibo_data = response.data;

            for (let i = 0; i < weibo_data.series_data.length; i++) {
                weibo_rank_legend_data.push(weibo_data.legend_data[i]);
                weibo_rank_series_data.push(weibo_data.series_data[i]);
            }

            weibo_rank.setOption(option_weibo_rank);
        })

    url = localPath + '/weibo_senIndex_data.json';
    axios.get(url)
        .then(function (response) {
            let data = response.data;

            for (let i = 0; i < data.series_data.length; i++) {
                weibo_senIndex_legend_data.push(data.legend_data[i]);
                weibo_senIndex_series_data.push(data.series_data[i]);
            }

            weibo_senIndex.setOption(option_weibo_senIndex);
        })
};

let option_official_rank = {
    title: [
        {
            text: "疫情防控平台 TF-IDF Ranking",
            subtext: 'January 26 - February 20',
        }
    ],
    grid: {
        left: '12%'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        name: 'TF-IDF',
        type: 'value',
        min: 0,
        max: 0.35,
    },
    yAxis: {
        type: 'category',
        data: official_rank_legend_data,
        inverse: true,
        axisTick: {
            alignWithLabel: true
        },
    },
    series: [
        {
            type: 'bar',
            data: official_rank_series_data,
            name: 'TF-IDF',
        },
    ],
    legend: {
        show: false,
        data: ['TF-IDF'],
        top: '3%'
    },
    dataZoom: [
        {
            type: 'slider',
            yAxisIndex: 0,
            left: '1%'
        },
    ],
    color: '#48D1CC'
};

let option_weibo_rank = {
    title: [
        {
            text: "新浪微博 TF-IDF Ranking",
            subtext: 'January 1 - February 20',
            left: 'right'
        }
    ],
    grid: {
        right: '12%'
    },
    tooltip: {
        trigger: 'item',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: {
        name: 'TF-IDF',
        type: 'value',
        inverse: true,
        min: 0,
        max: 0.35
    },
    yAxis: {
        type: 'category',
        data: weibo_rank_legend_data,
        inverse: true,
        axisTick: {
            alignWithLabel: true
        },
        position: 'right',
    },
    series: [
        {
            type: 'bar',
            data: weibo_rank_series_data,
            name: 'TF-IDF',
        },
    ],
    legend: {
        show: false,
    },
    dataZoom: [
        {
            type: 'slider',
            yAxisIndex: 0,
            right: '1%',
        },
    ],
    color: '#F4A460'
};

let option_official_senIndex = {
    title: {
        text: '疫情防控平台情感指数分布',
        subtext: 'January 26 - February 20'
    },
    tooltip: {
        trigger: 'item',
    },
    xAxis: {
        data: official_senIndex_legend_data,
        name: '情感指数',
        axisTick: {
            alignWithLabel: true
        },
    },
    yAxis: {
        name: '消息个数',
        nameLocation: 'middle',
        nameGap: 40
    },
    series: [{
        type: 'bar',
        data: official_senIndex_series_data,
    }],
    color: '#48D1CC'
};

let option_weibo_senIndex = {
    title: {
        text: '微博情感指数分布',
        subtext: 'January 1 - February 20',
        left:'right'
    },
    tooltip: {
        trigger: 'item',
    },
    xAxis: {
        data:weibo_senIndex_legend_data,
        name: '情感指数',
        axisTick: {
            alignWithLabel: true
        },
        inverse:true
    },
    yAxis: {
        name: '消息个数',
        nameLocation: 'middle',
        nameGap: 40,
        position:'right'
    },
    series: [{
        type: 'bar',
        data: weibo_senIndex_series_data,
    }],
    color: '#F4A460'
};


// 事件
official_rank.on('dataZoom', function (params) {
    let weibo_start = option_weibo_rank.dataZoom[0].start;
    let weibo_end = option_weibo_rank.dataZoom[0].end;

    if (!(weibo_start === params.start && weibo_end === params.end)) {
        option_weibo_rank.dataZoom[0].start = params.start;
        option_weibo_rank.dataZoom[0].end = params.end;

        weibo_rank.setOption(option_weibo_rank)
    }
});

weibo_rank.on('dataZoom', function (params) {
    let official_start = option_official_rank.dataZoom[0].start;
    let official_end = option_official_rank.dataZoom[0].end;

    if (!(official_start === params.start && official_end === params.end)) {
        option_official_rank.dataZoom[0].start = params.start;
        option_official_rank.dataZoom[0].end = params.end;

        official_rank.setOption(option_official_rank)
    }
});

function poa_init() {
    official_rank_legend_data.splice(0, official_rank_legend_data.length);
    official_rank_series_data.splice(0, official_rank_series_data.length);
    official_senIndex_series_data.splice(0, official_senIndex_series_data.length);
    official_senIndex_legend_data.splice(0, official_senIndex_legend_data.length);
    weibo_rank_legend_data.splice(0, weibo_rank_legend_data.length);
    weibo_rank_series_data.splice(0, weibo_rank_series_data.length);
    weibo_senIndex_legend_data.splice(0, weibo_senIndex_legend_data.length);
    weibo_senIndex_series_data.splice(0, weibo_senIndex_series_data.length);

    getOfficialData();
    getWeiboData();
}
