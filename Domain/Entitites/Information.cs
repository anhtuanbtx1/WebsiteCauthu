using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Domain.Entitites
{
    public class Information
    {
        public int Id { get; set; }
        [Display(Name = "Name")]
        public string Name { get; set; } = string.Empty;
        public string Descreption { get; set; }
        public string Club { get; set; }
        public string Image { get; set; }
        public int Number { get; set; }
        [Display(Name ="Legends")]
        public bool Status { get; set; }
    }
}
