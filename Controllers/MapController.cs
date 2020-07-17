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
            var query = mapDb.Provinces.Where(s => s.ProvinceShortName == provinceName).OrderBy(s => s.UpdateTime);
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
        /// <route>GET: api/map/province/certainDay?date=2020/3/14</route>
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
        /// 返回特定日期特定条件下前10省的疫情数据
        /// </summary>
        /// <param name="key"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>GET: api/map/province/top10?key=累计确诊&&date=2020/3/14</route>
        [HttpGet("province/top10")]
        public ActionResult<List<Province>> GetTopTenProvinces(string key, string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Provinces.Where(s => s.Date == date && s.ProvinceShortName != "中国");
            switch (key)
            {
                case ("累计确诊"):
                    query = query.OrderByDescending(s => s.ConfirmedCount);
                    break;
                case ("累计治愈"):
                    query = query.OrderByDescending(s => s.CuredCount);
                    break;
                case ("累计死亡"):
                    query = query.OrderByDescending(s => s.DeadCount);
                    break;
                case ("当前确诊"):
                    query = query.OrderByDescending(s => s.CurrentConfirmedCount);
                    break;
                default:
                    return NotFound();
            }

            return query.Take(10).ToList();
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
            var query = mapDb.Provinces.Where(s => s.ProvinceShortName == "中国").OrderBy(s => s.UpdateTime);
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

        /// <summary>
        /// 按关键词搜索谣言
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        /// <route>Get: api/map/rumor/bytitle?title=新冠&&skip=5&&take=10</route>
        [HttpGet("rumor/bytitle")]
        public ActionResult<List<Rumor>> GetRumorsByTitle(string title,int skip,int take)
        {
            var query = mapDb.Rumors.Where(s => s.Title.Contains(title)).Skip(skip).Take(take).OrderByDescending(s => s.CrawlTime);
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
        /// 分页查询所有谣言
        /// </summary>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <route>Get: api/map/rumor/all?skip=5&&take=10</route>
        [HttpGet("rumor/all")]
        public ActionResult<List<Rumor>> GetAllRumors(int skip,int take)
        {
            var query = mapDb.Rumors.Skip(skip).Take(take).OrderByDescending(s => s.CrawlTime);
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
        /// 向数据库中添加谣言
        /// </summary>
        /// <param name="rumor"></param>
        /// <returns></returns>
        /// <route>Post: api/map/rumor</route>
        [HttpPost("rumor")]
        public ActionResult<Rumor> PostRumor(Rumor rumor)
        {
            try
            {
                var query = mapDb.Rumors.FirstOrDefault(s => s.Title == rumor.Title || s.RumorId == rumor.RumorId);
                if (query != null)
                {
                    return BadRequest();
                }

                var date = DateCalculator.StringToDate(rumor.Date);
                rumor.CrawlTime = DateCalculator.DateToTicks(date);

                mapDb.Rumors.Add(rumor);
                mapDb.SaveChanges();

                return rumor;
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// 修改谣言
        /// </summary>
        /// <param name="rumorId"></param>
        /// <param name="rumor"></param>
        /// <returns></returns>
        /// <route>Put: api/map/rumor/title</route>
        [HttpPut("rumor/{id}")]
        public ActionResult<Rumor> PutRumor(long id,Rumor rumor)
        {
            if (id != rumor.RumorId) 
            {
                return BadRequest("It cannot be modified!");
            }

            try
            {
                mapDb.Entry(rumor).State = EntityState.Modified;
                mapDb.SaveChanges();

                return rumor;
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// 删除谣言
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        /// <route>Delete: api/map/rumor/title</route>
        [HttpDelete("rumor/delete/{title}")]
        public ActionResult DeleteRumor(string title)
        {
            try
            {
                var query = mapDb.Rumors.FirstOrDefault(s => s.Title == title);
                if (query != null) 
                {
                    mapDb.Remove(query);
                    mapDb.SaveChanges();

                    return Ok();
                }

                return BadRequest();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
