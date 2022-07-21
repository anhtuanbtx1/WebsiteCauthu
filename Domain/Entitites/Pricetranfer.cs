using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Domain.Entitites
{
    public class Pricetranfer
    {

        public int Id { get; set; }
        [Display(Name = "Tên cầu thủ")]
        public string Name { get; set; }
        [DisplayFormat(DataFormatString ="{0:n}")]
        [Display(Name ="Hình ảnh")]
        public string PriceBuy { get; set; }
        [DisplayFormat(DataFormatString = "{0:n}")]
        [Display(Name = "Giá bán")]
        public decimal? PriceSell { get; set; }
        [Display(Name ="Chỉ số cầu thủ")]
        public int? Ovr { get; set; }
        public string Image { get; set; }
    }
}
