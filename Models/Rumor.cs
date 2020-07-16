using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class Rumor : ICloneable
    {
        [Key]
        public long RumorId { get; set; }
        public string Title { get; set; }
        public string MainSummary { get; set; }
        public int RumorType { get; set; }
        public string Body { get; set; }
        public long CrawlTime { get; set; }
        public string Date { get; set; }

        public object Clone()
        {
            return this.MemberwiseClone();
        }
    }
}
