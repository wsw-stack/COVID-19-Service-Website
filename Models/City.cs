using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace newproject.Models
{ 
    public class City
    {
        [Key]
        public long LocationId { get; set; }
        public string CityName { get; set; }
        public string CityEnglishName { get; set; }
        public Nullable<int> CurrentConfirmedCount { get; set; }
        public Nullable<int> ConfirmedCount { get; set; }
        public Nullable<int> CuredCount { get; set; }
        public Nullable<int> DeadCount { get; set; }
        public long ProvinceId { get; set; }
        [ForeignKey("ProvinceId")]
        public Province Province { get; set; }
    }
}