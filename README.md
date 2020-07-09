# COVID-19-Service-Website

![GitHub top language](https://img.shields.io/github/languages/top/ashyseer/COVID-19-Service-Website?color=green)![GitHub](https://img.shields.io/github/license/ashyseer/COVID-19-Service-Website?color=blueviolet)  ![GitHub repo size](https://img.shields.io/github/repo-size/ashyseer/COVID-19-Service-Website)![GitHub contributors](https://img.shields.io/github/contributors/ashyseer/COVID-19-Service-Website)  ![GitHub last commit](https://img.shields.io/github/last-commit/ashyseer/COVID-19-Service-Website)

## Web API

| 类型 |       URL        |                 功能介绍                  |        参数        |         返回值         |
| :--: | :--------------: | :---------------------------------------: | :----------------: | :--------------------: |
| GET  | api/map/province |       获取特定日期特定省的疫情数据        | provinceName, date |   Province (Object)    |
| GET  | api/map/province | 获取特定省的时间序列疫情数据（1.25-3.31） |    provinceName    | List<Province> (Array) |
| GET  | api/map/province |       获取特定日期所有省的疫情数据        |        date        | List<Province> (Array) |
| GET  |   api/map/city   |       获取特定日期特定市的疫情数据        |   cityName, date   |     City (Object)      |
| GET  |   api/map/city   | 获取特定市的时间序列疫情数据（1.25-3.31） |      cityName      |   List<City> (Array)   |
| GET  |   api/map/city   |       获取特定日期所有省的疫情数据        |        date        |   List<City> (Array)   |

### Web API示例

