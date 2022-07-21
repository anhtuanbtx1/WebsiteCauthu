using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGiaiTri.Models;

namespace WebGiaiTri.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            List<UserModel> users = new List<UserModel>();
            return View();
        }
    }
}
