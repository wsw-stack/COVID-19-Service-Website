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

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController:ControllerBase
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
        /// <route>GET: api/map/province?provinceName="湖北"&&date="2020/2/4"</route>
        [HttpGet("province")]
        public ActionResult<Province> GetProvinceDataCertainDate(string provinceName,string date)
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
        /// <route>Get: api/map/province?provinceName="湖北"</route>
        [HttpGet("province")]
        public ActionResult<List<Province>> GetAllProvinceData(string provinceName)
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
        /// 返回特定日期的所有省数据
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        /// <route>GET: api/map/provnce?date="2020/3/14"</route>
        [HttpGet("province")]
        public ActionResult<List<Province>> GetAllProvinceDataCertainDay(string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Provinces.Where(s => s.Date == date);
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
        /// <route>Get: api/map/city?cityName="武汉"&&date="2020/3/14"</route>
        [HttpGet("city")]
        public ActionResult<City> GetCityDataCertainDate(string cityName,string date)
        {
            string pattern = @"2020/[0-9]+/[0-9]+$";
            if (!Regex.IsMatch(date, pattern))
            {
                return BadRequest();
            }

            var query = mapDb.Cities.FirstOrDefault(s => s.CityName == cityName && s.Date == date);

            if (query == null) 
            {
                // 如无数据，则查找前面的数据，直到找到数据为止
                for (DateTime time = DateCalculator.StringToDate(date).AddDays(-1); time >= new DateTime(2020, 1, 25); time = time.AddDays(-1)) 
                {
                    var theDayBefore = mapDb.Cities.FirstOrDefault(s => s.CityName == cityName && s.Date == time.ToString("d"));
                    if (theDayBefore != null) 
                    {
                        return theDayBefore;
                    }
                }

                // 直到起始日期都无数据
                return new City(cityName, date);
            }
            else
            {
                return query;
            }
        }

        /// <summary>
        /// 返回特定城市的2.15号到3.31号之间的每日数据
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns></returns>
        /// <route> Get: api/map/city?cityName="武汉"</route>
        [HttpGet("city")]
        public ActionResult<List<City>> GetAllCityData(string cityName)
        {
            var query = mapDb.Cities.Where(s => s.CityName == cityName);
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
        /// <route>Get: api/map/city?date="2020/3/14"</route>
        [HttpGet("city")]
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
    }
}
