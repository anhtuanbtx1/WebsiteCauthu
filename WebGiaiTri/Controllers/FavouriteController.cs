using Domain.Entitites;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGiaiTri.Common;
using WebGiaiTri.Models;

namespace WebGiaiTri.Controllers
{
    public class FavouriteController : Controller
    {
        private readonly IFavouriteRepo _favouriteRepo;
        public FavouriteController(IFavouriteRepo favouriteRepo)
        {
            _favouriteRepo = favouriteRepo;
        }
        public IActionResult Index()
        {
            var _listfavour = _favouriteRepo.GetAll();
            return View(_listfavour);
        }
        [HttpGet]
        public ActionResult Create()
        {
            
            return View();
        }
        [HttpPost]
        public ActionResult Create(Favourite favourite)
        {
            StatusQuery Notification;
            if(ModelState.IsValid)
            {
                try 
                {
                    _favouriteRepo.Insert(favourite);
                    var statusInsert = _favouriteRepo.SaveChanges();
                    if(statusInsert > 0)
                    {
                        TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Thêm thành công"));
                        return RedirectToAction("Index", "Favourite");
                    }
                    else
                    {
                        Notification = new StatusQuery("error", "", "Thêm mới thất bại");
                        ViewBag.Status = Notification.Status;
                        ViewBag.Value = Notification.Value;
                        ViewBag.Type = Notification.Type;
                    }
                }
                catch(Exception)
                {
                    return View(favourite);
                }
            }
            return View(favourite);
        }
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var editfavourite = _favouriteRepo.GetById(id);
            return View(editfavourite);
        }
        [HttpPost]
        public ActionResult Edit(Favourite model)
        {
            var editfavourite = _favouriteRepo.GetById(model.Id);
            editfavourite.Id = model.Id;
            editfavourite.Name = model.Name;
            editfavourite.Image = model.Image;
            editfavourite.Icon = model.Icon;
            var statusedit = _favouriteRepo.SaveChanges();
            if (statusedit > 0)
            {
                TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Sửa thành công"));
                return RedirectToAction("Index", "Favourite");
            }
            return View(editfavourite);
        }
        public ActionResult Delete(int id)
        {
            var _formationdelete = _favouriteRepo.GetById(id);
            return View(_formationdelete);
        }
        [HttpPost]
        public ActionResult Delete(Favourite model)
        {
            var delete = _favouriteRepo.GetById(model.Id);
           _favouriteRepo.Delete(delete);
            var statusdelete = _favouriteRepo.SaveChanges();
            if (statusdelete > 0)
            {
                TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Xoá thành công"));
                return RedirectToAction("Index", "Favourite");
            }
            return RedirectToAction("Index", "Information");
        }
    }
}
