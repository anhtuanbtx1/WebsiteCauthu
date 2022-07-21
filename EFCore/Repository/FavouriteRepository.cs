using Domain.Entitites;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCore.Repository
{
    public class FavouriteRepository : Repository<Favourite> , IFavouriteRepo
    {
        public FavouriteRepository(FootballDbContext context) : base(context)
        {

        }
    }
}
