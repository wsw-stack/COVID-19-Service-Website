using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Province : ICloneable
    {
        public string CountryName { get; set; }
        [Key]
        public long Id { get; set; }
        public string ProvinceShortName { get; set; }
        public int CurrentConfirmedCount { get; set; }
        public int ConfirmedCount { get; set; }
        public Nullable<int> SuspectedCount { get; set; }
        public int CuredCount { get; set; }
        public int DeadCount { get; set; }
        public List<City> Cities { get; set; }
        public long UpdateTime { get; set; }
        public string Date { get; set; }

        public Object Clone()
        {
            Province newProvince = (Province)this.MemberwiseClone();
            newProvince.Cities = new List<City>(Cities);
            return newProvince;
        }

        public Province() { }

        public Province(string name,string date)
        {
            CountryName = "中国";
            ProvinceShortName = name;
            CurrentConfirmedCount = ConfirmedCount = CuredCount = DeadCount = 0;
            SuspectedCount = 0;
            Date = date;
        }
    }
}
