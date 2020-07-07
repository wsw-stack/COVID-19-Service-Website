using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public Nullable<int> CurrentConfirmedCount { get; set; }
        public Nullable<int> ConfirmedCount { get; set; }
        public Nullable<int> SuspectedCount { get; set; }
        public Nullable<int> CuredCount { get; set; }
        public Nullable<int> DeadCount { get; set; }
        public List<City> Cities { get; set; }
        public long UpdateTime { get; set; }
    }
}
