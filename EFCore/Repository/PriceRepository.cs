using Domain.Entitites;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCore.Repository
{
   public class PriceRepository : Repository<Pricetranfer>, IPricetranfer
    {
        public PriceRepository(FootballDbContext context) : base(context)
        {

        }
    }
}
