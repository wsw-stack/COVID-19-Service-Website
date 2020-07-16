using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    public class MapContext:DbContext
    {
        public MapContext(DbContextOptions<MapContext> options):base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Province> Provinces { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Rumor> Rumors { get; set; }
    }
}
