namespace CodeProjectAngular.WebAPI
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class OdeToDb1 : DbContext
    {
        public OdeToDb1()
            : base("name=OdeToDb1")
        {
        }

        public virtual DbSet<RestaurantReview> RestaurantReviews { get; set; }
        public virtual DbSet<Restaurant> Restaurants { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RestaurantReview>()
                .Property(e => e.Body)
                .IsUnicode(false);

            modelBuilder.Entity<Restaurant>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Restaurant>()
                .Property(e => e.City)
                .IsUnicode(false);

            modelBuilder.Entity<Restaurant>()
                .Property(e => e.Country)
                .IsUnicode(false);
        }
    }
}
