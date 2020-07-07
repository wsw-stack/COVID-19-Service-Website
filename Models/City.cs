using newproject.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public class City
{
    [Key]
    public long LocationId { get; set; }
    public string CityName { get; set; }
    public string CityEnglishName { get; set; }
    public int CurrentConfirmedCount { get; set; }
    public int ConfirmedCount { get; set; }
    public int CuredCount { get; set; }
    public int DeadCount { get; set; }
    public long ProvinceId { get; set; }
    [ForeignKey("ProvinceId")]
    public Province Province { get; set; }
}