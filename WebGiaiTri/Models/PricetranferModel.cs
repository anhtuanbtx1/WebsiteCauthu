using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGiaiTri.Models
{
    public class PricetranferModel
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public decimal? PriceBuy { get; set; }
        public decimal? PriceSell { get; set; }
        public int? Ovr { get; set; }
    }
}
