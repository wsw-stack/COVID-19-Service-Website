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
      "rumorId":5,
      "title":"新冠病毒尚未发生明显变异？",
      "mainSummary":"中国-世界卫生组织新冠肺炎联合专家考察组：病毒尚未发生明显变异",
      "rumorType":1,
      "body":"中国-世界卫生组织新冠肺炎联合专家考察组24日在北京举行发布会。考察组中方组长梁万年：通过对不同地点分离出的104株新冠病毒株进行全基因组测序，证实同源性达99.9%，提示病毒尚未发生明显变异。",
      "crawlTime":1582628880292,
      "date":"2020/2/25"
    },
    {
      "rumorId":8,
      "title":"新冠病毒会通过皮肤侵入人体？",
      "mainSummary":"中科院院士周琪：新冠病毒不能通过皮肤侵入人体",
      "rumorType":0,
      "body":"21日，国务院应对新型冠状病毒感染肺炎疫情联防联控机制举行新闻发布会。针对病毒是怎么侵入人体的问题，周琪解释：病毒主要是从人体黏膜侵入，如口腔、鼻腔和眼部，因此必须做好对这些部位的重点防护。周琪指出，科学试验证明，新冠病毒是不会通过皮肤传播的。即使如大家担心的粪口传播，只要保持正确的洗手方法和养成勤洗手的习惯，也可避免病毒通过这些途径传播。",
      "crawlTime":1582357402346,
      "date":"2020/2/22"
    },
    {
      "rumorId":9,
      "title":"地铁票会传播新冠病毒？",
      "mainSummary":"中国疾控中心研究员冯录召：循环使用的地铁票沾染病毒的概率非常低。",
      "rumorType":2,
      "body":"中国疾控中心研究员冯录召表示，循环使用的地铁票沾染病毒的概率是非常低的，但为了避免可能的接触，还是推荐使用公交卡或手机App来支付，乘坐地铁后及时洗手。目前，新冠肺炎的传播途径仍然是以飞沫传播和接触传播为主，戴口罩、勤洗手、保持卫生是有效预防病毒的手段。",
      "crawlTime":1582292333014,
      "date":"2020/2/21"
    },
    {
      "rumorId":10,
      "title":"新冠肺炎病人的肺部损伤不可逆？",
      "mainSummary":"中国工程院副院长王辰：我们有限的观察提示，肺功能能够相当的成长或完全的恢复",
      "rumorType":0,
      "body":"有网友发出所谓「新冠病毒对肺部影响的CT图像」，并称「所有被啃噬、机化的肺组织都不会再恢复了，愈后会形成无任何肺功能的瘢痕组织」。 实际上此说法不实，中国工程院副院长，呼吸与危重症医学专家王辰表示：「我们有限的观察提示，肺功能能够相当的成长或完全的恢复。」也就是说，受损的肺是完全有机会修复的，大家不要被谣言骗了。",
      "crawlTime":1582187525459,
      "date":"2020/2/20"
    },
    {
      "rumorId":14,
      "title":"吃大蒜可以杀灭新冠病毒？",
      "mainSummary":"丁香医生团队辟谣：不管是直接吃、榨汁喝还是炖冰糖都没用",
      "rumorType":0,
      "body":"大蒜提取物是能杀菌，但是从大蒜变成大蒜提取物差距很大。而且目前还没有临床试验数据证明大蒜的抗病毒效果，就不要指望它能杀灭新型冠状病毒啦。",
      "crawlTime":1580310776194,
      "date":"2020/1/29"
    }
  ]
  ```

