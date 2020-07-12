using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApi.Shared;
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using MySql.Data.MySqlClient;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : ControllerBase
    {
        private readonly MapContext mapDb;

        public MapController(MapContext context)
        {
            this.mapDb = context;
        }

        /// <summary>
        /// 返回特定时间特定省的疫情数据
        /// </summary>
        /// <param name="provinceName"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>GET: api/map/province?provinceName=湖北&&date=2020/2/4</route>
        [HttpGet("province")]
        public ActionResult<Province> GetProvinceDataCertainDate(string provinceName, string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Provinces.FirstOrDefault(s => s.ProvinceShortName == provinceName && s.Date == date);
            if (query == null)
            {
                return new Province(provinceName, date);
            }
            else
            {
                return query;
            }
        }

        /// <summary>
        /// 返回特定省的2.15号到3.31号之间的每日数据
        /// </summary>
        /// <param name="provinceName"></param>
        /// <returns></returns>
        /// <route>Get: api/map/province/timeSeries?provinceName=湖北</route>
        [HttpGet("province/timeSeries")]
        public ActionResult<List<Province>> GetProvinceSeriesData(string provinceName)
        {
            var query = mapDb.Provinces.Where(s => s.ProvinceShortName == provinceName);
            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query.ToList();
            }
        }

        /// <summary>
        /// 返回特定日期的所有省疫情数据
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>GET: api/map/provnce/certainDay?date=2020/3/14</route>
        [HttpGet("province/certainDay")]
        public ActionResult<List<Province>> GetAllProvinceDataCertainDay(string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Provinces.Where(s => s.Date == date && s.ProvinceShortName != "中国");
            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query.ToList();
            }
        }

        /// <summary>
        /// 返回特定日期的全国数据
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>GET: api/map/country/certainDay?date=2020/3/14</route>
        [HttpGet("country/certainDay")]
        public ActionResult<Province> GetOverallCertainDay(string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Provinces.FirstOrDefault(s => s.Date == date && s.ProvinceShortName == "中国");
            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query;
            }
        }

        /// <summary>
        /// 返回全国数据时间序列
        /// </summary>
        /// <returns></returns>
        /// <route>GET: api/map/country/timeSeries</route>
        [HttpGet("country/timeSeries")]
        public ActionResult<List<Province>> GetOverallTimeSeries()
        {
            var query = mapDb.Provinces.Where(s => s.ProvinceShortName == "中国");
            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query.ToList();
            }
        }


        /// <summary>
        /// 返回特定时间特定城市的疫情数据
        /// </summary>
        /// <param name="cityName"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>Get: api/map/city?cityName=武汉&&date=2020/3/14</route>
        [HttpGet("city")]
        public ActionResult<City> GetCityDataCertainDate(string cityName, string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            try
            {
                //var result = mapDb.Cities.FromSqlInterpolated($"SELECT * FROM cities WHERE CityName={cityName} AND Date={date}").FirstOrDefault();
                var result = mapDb.Cities.FirstOrDefault(s => s.CityName == cityName && s.Date == date);

                //var result = QueryCityCertainDay(cityName, date);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return result;
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// 返回特定城市的2.15号到3.31号之间的每日数据
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns></returns>
        /// <route> Get: api/map/city/timeSeries?cityName=武汉</route>
        [HttpGet("city/timeSeries")]
        public ActionResult<List<City>> GetCitySeriesData(string cityName)
        {
            IQueryable<City> query = mapDb.Cities.Where(s => s.CityName == cityName);

            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query.ToList();
            }
        }

        /// <summary>
        /// 返回特定日期的所有城市数据
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>Get: api/map/city/certainDay?date=2020/3/14</route>
        [HttpGet("city/certainDay")]
        public ActionResult<List<City>> GetAllCityDataCertainDay(string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Cities.Where(s => s.Date == date);
            if (query == null)
            {
                return NotFound();
            }
            else
            {
                return query.ToList();
            }
        }

        private City QueryCityCertainDay(string cityName, string date)
        {
            using(MySqlConnection connection=GetConnection())
            {
                string sql = $"SELECT * FROM cities WHERE CityName='{cityName}' AND Date='{date}'";
                using (MySqlCommand cmd = new MySqlCommand(sql, connection))
                {
                    using(MySqlDataReader reader=cmd.ExecuteReader())
                    {
                        if (reader.Read()) 
                        {
                            City result = new City()
                            {
                                Id = reader.GetInt32(0),
                                CityName = reader.GetString(1),
                                CityEnglishName = reader.GetString(2),
                                CurrentConfirmedCount = reader.GetInt32(3),
                                ConfirmedCount = reader.GetInt32(4),
                                CuredCount = reader.GetInt32(5),
                                DeadCount = reader.GetInt32(6),
                                ProvinceId = reader.GetInt32(7),
                                Date = reader.GetString(8)
                            };

                            return result;
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }

        private static MySqlConnection GetConnection()
        {
            MySqlConnection connection = new MySqlConnection(
                "datasource=localhost;username=root;" +
                "password=312725802;database=mapDB;charset=utf8");
            connection.Open();
            return connection;
        }
    }
}
