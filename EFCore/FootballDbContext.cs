using System;
using Domain.Entitites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace EFCore
{
    public partial class FootballDbContext : DbContext
    {
        public FootballDbContext()
        {
        }

        public FootballDbContext(DbContextOptions<FootballDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Information> Information { get; set; }
        public virtual DbSet<Pricetranfer> Pricetranfers { get; set; }
        public virtual DbSet<Favourite> Favourites { get; set; }
        public virtual DbSet<Typestatuscheck> Typestatuschecks { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseNpgsql("Host=localhost;Database=mydb;Username=postgres;Password=123");
            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

            modelBuilder.Entity<Information>(entity =>
            {
                entity.ToTable("information");

                entity.Property(e => e.Id)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("Id");
                   

                entity.Property(e => e.Club).HasMaxLength(200);

                entity.Property(e => e.Descreption).HasMaxLength(250);

                entity.Property(e => e.Image).HasColumnType("character varying");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Number).HasPrecision(120);
                entity.Property(e => e.Status).HasColumnName("Status");
            });

            modelBuilder.Entity<Pricetranfer>(entity =>
            {
                entity.ToTable("pricetranfer");

                entity.Property(e => e.Id)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Ovr).HasColumnName("OVR");

                entity.Property(e => e.PriceBuy).HasColumnType("character varying");

                entity.Property(e => e.PriceSell).HasColumnType("money");
                entity.Property(e => e.Image).HasColumnType("character varying");
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");
                entity.Property(e => e.ID).HasColumnName("ID");
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Password).HasMaxLength(150);
                entity.Property(e => e.Capcha).HasMaxLength(50);
            });
            modelBuilder.Entity<Favourite>(entity =>
            {
                entity.ToTable("favourite");

                entity.Property(e => e.Id)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("Id");
                entity.Property(e => e.Name).HasMaxLength(200);
                entity.Property(e => e.Image).HasColumnType("character varying");
                entity.Property(e => e.Icon).HasColumnType("character varying");
            });
            modelBuilder.Entity<Typestatuscheck>(entity=>{
                entity.ToTable("typestatuscheck");
                entity.Property(e => e.Id)
                    .UseIdentityAlwaysColumn()
                    .HasColumnName("Id");
                entity.Property(e => e.TypeName).HasColumnType("character varying");    
                entity.Property(e => e.TypeStatus).HasColumnName("TypeStatus");
            });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
