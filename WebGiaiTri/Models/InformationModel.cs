using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebGiaiTri.Models
{
    public class InformationModel
    {
        
        [Display(Name ="Id",ResourceType =typeof(Resources.ResourceInformationType))]
        public int Id { get; set; }        
        public string Name { get; set; }
        [Display(Name = "Descreption", ResourceType = typeof(Resources.ResourceInformationType))]
        public string Descreption { get; set; }
        [Display(Name = "Club", ResourceType = typeof(Resources.ResourceInformationType))]
        public string Club { get; set; }
        [Display(Name = "Image", ResourceType = typeof(Resources.ResourceInformationType))]
        public string Image { get; set; }
        [Display(Name = "Number", ResourceType = typeof(Resources.ResourceInformationType))]
        public int Number { get; set; }
        [Display(Name ="Status",ResourceType =typeof(Resources.ResourceInformationType))]
        public bool Status { get; set; }
    }
}
