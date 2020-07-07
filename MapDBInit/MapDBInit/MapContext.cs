using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapDBInit
{
    public class MapContext : DbContext
    {
        public MapContext() : base("MapDatabase")
        {
            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MapContext>());
            Database.SetInitializer(new DropCreateDatabaseAlways<MapContext>());
        }

        public DbSet<Province> Provinces { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}
