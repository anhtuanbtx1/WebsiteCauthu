using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebGiaiTri.Common;
using WebGiaiTri.Models;
using static WebGiaiTri.Common.Status;

namespace WebGiaiTri.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFormationRepo _formation;
        private readonly ITypeS _typeS;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IFormationRepo formation, ITypeS typeS)
        {
            _formation = formation;
            _typeS = typeS;
        }

        public IActionResult Index()
        {
            HomeModel homeModel = new HomeModel
            {
                ListTypeOfPlayer = new List<DropDown>()
            };
            try
            {
                var listItem = _formation.GetAll();
                var typestatus = _typeS.GetAll();
                List<DropDown> ListTypeOfPlayer = new List<DropDown>();
                foreach(var item in typestatus)
                {
                    var getStatusChecked = listItem.Where(e => e.Status == item.TypeStatus).Count();
                    if (getStatusChecked != 0)
                    {
                        DropDown dropDownList = new DropDown()
                        {
                            Id = item.Id,
                            Value = getStatusChecked,
                            Name = item.TypeName.NonUnicode()
                        };
                        ListTypeOfPlayer.Add(dropDownList);
                    }
                }
                homeModel.ListTypeOfPlayer = ListTypeOfPlayer;
            }
            catch (Exception ex)
            {

            }
            return View(homeModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
