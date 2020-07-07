using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace newproject.Models
{
    public class Province
    {
        public string CountryName { get; set; }
        [Key]
        public long LocationId { get; set; }
        public string ProvinceShortName { get; set; }
        public int CurrentConfirmedCount { get; set; }
        public int ConfirmedCount { get; set; }
        public int SuspectedCount { get; set; }
        public int CuredCount { get; set; }
        public int DeadCount { get; set; }
        public List<City> Cities { get; set; }
        public long UpdateTime { get; set; }
    }
}
