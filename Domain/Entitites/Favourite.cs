﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entitites
{
    public class Favourite
    {
        public int Id { get; set; }      
        public string Name { get; set; } = string.Empty;       
        public string Image { get; set; }
        public string Icon { get; set; }
    }
}
