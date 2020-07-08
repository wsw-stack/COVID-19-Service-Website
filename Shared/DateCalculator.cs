using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Shared
{
    public class DateCalculator
    {
        public static DateTime TicksToDate(long time)
        {
            return new DateTime(time * 10000 + 621355968000000000);
        }

        public static long DateToTicks(DateTime date)
        {
            DateTime startTime = TimeZoneInfo.ConvertTime(new DateTime(1970, 1, 1, 0, 0, 0, 0), TimeZoneInfo.Local);
            long t = (date.Ticks - startTime.Ticks) / 10000;   //除10000调整为13位      
            return t;
        }
    }
}
