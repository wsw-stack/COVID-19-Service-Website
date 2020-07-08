using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebApi.Shared;

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
        // GET: api/map/province?provinceName=湖北&&date=2020/2/4
        [HttpGet("province")]
        public ActionResult<Province> GetProvinceDataCertainDate(string provinceName,string date)
        {
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
        // Get: api/map/province?provinceName=湖北
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

        [HttpGet("city")]
        public ActionResult<City> GetCityDataCertainDate(string cityName,string date)
        {
            var query = QueryCity(cityName, date);

            if (query == null) 
            {

            }
            else
            {
                return query;
            }
            
        }

        private City QueryCity(string cityName,string date)
        {
            var query = from p in mapDb.Provinces
                        from q in mapDb.Cities
                        where p.Date == date && p.Id == q.ProvinceId && q.CityName == cityName
                        select q;

            return query as City;
        }


    }
}
