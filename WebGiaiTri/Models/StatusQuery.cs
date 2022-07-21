using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGiaiTri.Models
{
    public class StatusQuery
    {
        public StatusQuery()
            {
            }
    public StatusQuery(string type, string status, string value)
    {
        this.Status = status;
        this.Value = value;
        this.Type = type;
    }
    public string Status { get; set; }
    public string Value { get; set; }
    public string Type { get; set; }
    }
}
