using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapDBInit
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new MapContext()) 
            {
                string jsonFile = @"C:\Users\zhongyuan\Desktop\DXY-COVID-19-Data-master\json\DXYArea-TimeSeries.json";

                FileStream fin= new FileStream(jsonFile, FileMode.Open, FileAccess.Read);
                StreamReader reader = new StreamReader(fin, Encoding.UTF8);
                var jsonData = reader.ReadToEnd();

                var startDate = new DateTime(2020, 1, 25);
                var endDate = new DateTime(2020, 4, 1);

                List<Province> provinces = JsonConvert.DeserializeObject<List<Province>>(jsonData);

                var provincesChina = provinces.Where(s => s.CountryName == "中国" && s.ProvinceShortName != "中国" && s.CurrentConfirmedCount >= 0 && s.UpdateTime < DateToTicks(endDate) && s.UpdateTime >= DateToTicks(startDate)).ToList();

                foreach(var provinceChina in provincesChina)
                {
                    provinceChina.Date = TicksToDate(provinceChina.UpdateTime).ToString("d");
                }

                List<Province> cleanData = new List<Province>();

                var groups = provincesChina.GroupBy(s => s.ProvinceShortName);
                foreach(var group in groups)
                {
                    // 一个group表示一个省的数据
                    var groupsByDate = group.GroupBy(s => s.Date);
                    foreach(var groupByDate in groupsByDate)
                    {
                        // 一个groupByDate表示一天的数据
                        var order = groupByDate.OrderByDescending(s => s.UpdateTime);   // 降序排列
                        cleanData.Add(order.First());   // 取一天中最后更新的
                    }
                }

                var cleanDataGroups = cleanData.GroupBy(s => s.ProvinceShortName);
                foreach (var group in cleanDataGroups)
                {
                    for (DateTime time = startDate; DateTime.Compare(time, endDate) < 0; time = time.AddDays(1))
                    {
                        var query = group.FirstOrDefault(s => s.Date == time.ToString("d"));
                        if (query == null)
                        {
                            Province newRecord = null;

                            if (time == startDate) 
                            {
                                newRecord = cleanData.First(s => s.ProvinceShortName == group.First().ProvinceShortName).Clone() as Province;
                                newRecord.ConfirmedCount = newRecord.CuredCount = newRecord.CurrentConfirmedCount = newRecord.DeadCount = 0;
                                newRecord.SuspectedCount = 0;
                                foreach(var city in newRecord.Cities)
                                {
                                    city.ConfirmedCount = city.CuredCount = city.CurrentConfirmedCount = city.DeadCount = 0;
                                }
                            }
                            else
                            {
                                newRecord = cleanData.FirstOrDefault(s => s.Date == time.AddDays(-1).ToString("d") && s.ProvinceShortName == group.First().ProvinceShortName).Clone() as Province;
                            }

                            newRecord.UpdateTime = DateToTicks(time);
                            newRecord.Date = time.ToString("d");

                            cleanData.Add(newRecord);
                        }
                    }
                }

                context.Provinces.AddRange(cleanData);
                context.SaveChanges();


                jsonFile = @"C:\Users\zhongyuan\Desktop\DXY-COVID-19-Data-master\json\DXYOverall-TimeSeries.json";
                fin = new FileStream(jsonFile, FileMode.Open, FileAccess.Read);
                reader = new StreamReader(fin, Encoding.UTF8);
                jsonData = reader.ReadToEnd();
                provinces = JsonConvert.DeserializeObject<List<Province>>(jsonData);

                var provincesOverall = provinces.Where(s => s.CurrentConfirmedCount >= 0 && s.UpdateTime < DateToTicks(endDate)).ToList();
                foreach (var provinceOverall in provincesOverall)
                {
                    provinceOverall.CountryName = "中国";
                    provinceOverall.ProvinceShortName = "中国";
                    provinceOverall.Date = TicksToDate(provinceOverall.UpdateTime).ToString("d");
                }

                cleanData = new List<Province>();


                    // 一个group表示一个省的数据
                var DataByDate = provincesOverall.GroupBy(s => s.Date);
                foreach (var groupByDate in DataByDate)
                {
                    // 一个groupByDate表示一天的数据
                    var order = groupByDate.OrderByDescending(s => s.UpdateTime);   // 降序排列
                    cleanData.Add(order.First());   // 取一天中最后更新的
                }

                context.Provinces.AddRange(cleanData);

                context.SaveChanges();
            }
        }

        static DateTime TicksToDate(long time)
        {
            return new DateTime(time * 10000 + 621355968000000000);
        }

        static long DateToTicks(DateTime date)
        {
            DateTime startTime = TimeZoneInfo.ConvertTime(new DateTime(1970, 1, 1, 0, 0, 0, 0), TimeZoneInfo.Local);
            long t = (date.Ticks - startTime.Ticks) / 10000;   //除10000调整为13位      
            return t;
        }
    }
}
