using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace MapDBInit
{
    public class Province:ICloneable
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
    }

    public class City:ICloneable
    {
        [Key]
        public long Id { get; set; }
        public string CityName { get; set; }
        public string CityEnglishName { get; set; }
        public int CurrentConfirmedCount { get; set; }
        public int ConfirmedCount { get; set; }
        public int CuredCount { get; set; }
        public int DeadCount { get; set; }
        public long ProvinceId { get; set; }
        [ForeignKey("ProvinceId")]
        public Province Province { get; set; }
        public string Date { get => Province.Date; set => Date = value; }

        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }
}
