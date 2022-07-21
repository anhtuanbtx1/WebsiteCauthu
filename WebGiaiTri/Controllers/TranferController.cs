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
    public class TranferController : Controller
    {
        private readonly IPricetranfer _pricetranfer;
        public TranferController(IPricetranfer pricetranfer)
        {
            _pricetranfer = pricetranfer;
        }
        public IActionResult Index()
        {
            StatusQuery Notification;
            var _listranfer = _pricetranfer.GetAll();
            Notification = TempDataHelper.Get<StatusQuery>(TempData, "Notification");
            if (Notification != null)
            {
                ViewBag.Status = Notification.Status;
                ViewBag.Value = Notification.Value;
                ViewBag.Type = Notification.Type;
            }
            return View(_listranfer);
        }     
        public ActionResult Create()
        {
            return View();
        }
        public IActionResult CreateSaved(Pricetranfer  pricetranfer)
        {
            StatusQuery Notification;
            if (ModelState.IsValid)
            {
                try
                {
                    _pricetranfer.Insert(pricetranfer);
                    var statusInsert = _pricetranfer.SaveChanges();
                    if(statusInsert > 0)
                    {
                        TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Thêm thành công"));
                        return RedirectToAction("Index","Tranfer");
                    }
                    else
                    {
                        Notification = new StatusQuery("error", "", "Thêm mới thất bại");
                        ViewBag.Status = Notification.Status;
                        ViewBag.Value = Notification.Value;
                        ViewBag.Type = Notification.Type;
                    }
                }
                catch (Exception)
                {
                    return View(pricetranfer);
                }
            }
            else
            {
                return View(pricetranfer);

            }
            return View(pricetranfer);
        }
        public ActionResult Delete(int id )
        {
            var _pricetranferdelete = _pricetranfer.GetById(id);
            return View(_pricetranferdelete);
        }
        public IActionResult DeleteSaved(int id)
        {
            var _pricetranferdelete = _pricetranfer.GetById(id);
            _pricetranfer.Delete(_pricetranferdelete);
            var statusdelete = _pricetranfer.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult Edit(int id)
        {
            var _pricetranferedit = _pricetranfer.GetById(id);
            return View(_pricetranferedit);
        }
        public ActionResult EditSaved(Pricetranfer model)
        {
            var _pricetranferedit = _pricetranfer.GetById(model.Id);
            _pricetranferedit.Id = model.Id;
            _pricetranferedit.Name = model.Name;
            _pricetranferedit.PriceBuy = model.PriceBuy;
            _pricetranferedit.PriceSell = model.PriceSell;
            _pricetranferedit.Ovr = model.Ovr;
            _pricetranferedit.Image = model.Image;
            var statusEdit = _pricetranfer.SaveChanges();
            if(statusEdit > 0)
            {
                TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Sửa thành công"));
                return RedirectToAction("Index", "Tranfer");
            }
            return View(_pricetranferedit);
        }
    }
}
