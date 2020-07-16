## Web API

|  方法  | 类型 |             URL              |                 功能介绍                  |        参数        | 返回值 |
| :----: | :--: | :--------------------------: | :---------------------------------------: | :----------------: | :----: |
|  GET   | 国家 |  api/map/country/certainDay  |        获取特定日期的全国疫情数据         |        date        | Object |
|  GET   | 国家 |  api/map/country/timeSeries  |         返回全国时间序列疫情数据          |         无         | Array  |
|  GET   |  省  |       api/map/province       |       获取特定日期特定省的疫情数据        | provinceName, date | Object |
|  GET   |  省  | api/map/province/timeSeries  | 获取特定省的时间序列疫情数据（1.25-3.31） |    provinceName    | Array  |
|  GET   |  省  | api/map/province/certainDay  |       获取特定日期所有省的疫情数据        |        date        | Array  |
|  GET   |  省  |    api/map/province/top10    |   获取特定日期特定条件下top10省疫情数据   |     key, date      | Array  |
|  GET   |  市  |         api/map/city         |       获取特定日期特定市的疫情数据        |   cityName, date   | Object |
|  GET   |  市  |   api/map/city/timeSeries    | 获取特定市的时间序列疫情数据（1.25-3.31） |      cityName      | Array  |
|  GET   |  市  |   api/map/city/certainDay    |       获取特定日期所有省的疫情数据        |        date        | Array  |
|  GET   | 谣言 |    api/map/rumor/bytitle     |             按关键词搜索谣言              | title, skip, take  | Array  |
|  GET   | 谣言 |      api/map/rumor/all       |             分页查询所有谣言              |     skip, take     | Array  |
|  POST  | 谣言 |        api/map/rumor         |            向数据库中添加谣言             |         无         |   无   |
|  PUT   | 谣言 |    api/map/rumor/{title}     |                 修改谣言                  |       title        |   无   |
| DELETE | 谣言 | api/map/rumor/delete/{title} |                 删除谣言                  |       title        |   无   |

### Web API示例

- URL: /api/map/province?provinceName=湖北&&date=2020/2/4

  Response Type: application/json

  Response:

  ```json
  {
      "countryName":"中国",
      "id":575,
      "provinceShortName":"湖北",
      "currentConfirmedCount":0,
      "confirmedCount":16678,
      "suspectedCount":0,
      "curedCount":522,
      "deadCount":479,
      "cities":null,
      "updateTime":1580859411761,
      "date":"2020/2/4"
  }
  ```

- URL: /api/map/country?certainDay=2020/3/14

  Response Type: application/json

  Response:

  ```json
  {
      "countryName":"中国",
      "id":2296,
      "provinceShortName":"中国",
      "currentConfirmedCount":12159,
      "confirmedCount":81033,
      "suspectedCount":95,
      "curedCount":65680,
      "deadCount":3194,
      "cities":null,
      "updateTime":1584230262402,
      "date":"2020/3/14"
  }
  ```

- URL: /api/map/province/top10?key=累计确诊&&date=2020/2/4

  Response Type: application/json

  Optional Keys: '累计确诊'、'累计死亡'、'累计治愈'、‘当前确诊''

- URL: /api/map/rumor/bytitle?title=新冠&&skip=0&&take=10

  Response Type: application/json

  Response:

  ```json
  [
    {
      "rumorId":4,
      "title":"新冠病毒传播途径有变化？",
      "mainSummary":"科技部社会发展科技司司长吴远彬：目前研究结论显示，呼吸道飞沫和密切接触传播仍然是主要传播途径",
      "rumorType":0,
      "body":"28日，科技部社会发展科技司司长吴远彬表示，目前研究结论显示，呼吸道飞沫和密切接触传播仍然是主要传播途径。粪口传播有一定风险，但传播能力和条件还需进一步相应研究证实。针对气溶胶传播，中国医科院实验动物所开展相应实验，气溶胶传播要同时满足密闭的空间、较长的时间、高浓度病毒三个条件，在这些条件下才有传染的可能性。通风条件良好的日常生活中气溶胶传播可能性小。",
      "crawlTime":1582882062909,
      "date":"2020/2/28"
    },
    {
      ......
    }
  ]
  ```

