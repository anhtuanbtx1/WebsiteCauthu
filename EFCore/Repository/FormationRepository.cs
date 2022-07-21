using Domain.Entitites;
using Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFCore.Repository
{
    public class FormationRepository : Repository<Information>, IFormationRepo
    {
        public FormationRepository(FootballDbContext context) : base(context)
            {

            }

    }
}
