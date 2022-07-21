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
    public class InformationController : Controller
    {
        private readonly IFormationRepo _formation;
        public InformationController(IFormationRepo formation)
        {
            _formation = formation;
        }           
        public IActionResult Index()
        {
            StatusQuery Notification;
            Notification = TempDataHelper.Get<StatusQuery>(TempData, "Notification");
            if (Notification != null)
            {
                ViewBag.Status = Notification.Status;
                ViewBag.Value = Notification.Value;
                ViewBag.Type = Notification.Type;
            }
            var _listInfor = _formation.GetAll();
            List<InformationModel> ListInformationTypeModel = new List<InformationModel>();
            foreach (var item in _listInfor)
                if (item.Status)
                {
                    var informmodel = new InformationModel()
                    {
                        Descreption = "Huyền thoại bóng đá",
                        Name = item.Name,
                        Id = item.Id,
                        Number = item.Number,
                        Club = item.Club,
                        Status = item.Status,
                        Image = item.Image
                    };
                    ListInformationTypeModel.Add(informmodel);
                }
                else
                {
                    var informmodel = new InformationModel()
                    {
                        Descreption = "Siêu sao bóng đá",
                        Name = item.Name,
                        Id = item.Id,
                        Number = item.Number,
                        Club = item.Club,
                        Status = item.Status,
                        Image = item.Image
                    };
                    ListInformationTypeModel.Add(informmodel);
                }
            return View(ListInformationTypeModel);
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Information information)
        {
            StatusQuery Notification;
            if (ModelState.IsValid)
            {
                try
                {
                    var obj = _formation.GetAll().FirstOrDefault(item => item.Name.ToLower() == information.Name.ToLower());
                    if(obj != null)
                    {
                        Notification = new StatusQuery("warning", "", "Vui lòng kiểm tra lại");
                        ViewBag.Status = Notification.Status;
                        ViewBag.Value = Notification.Value;
                        ViewBag.Type = Notification.Type;
                        ModelState.AddModelError("Name", "Tên người dùng đã tồn tại");
                        return View(information);
                        
                    }                    
                        _formation.Insert(information);
                        var statusInsert = _formation.SaveChanges();
                        if (statusInsert > 0)
                        {
                            TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("success", "", "Thêm thành công"));
                            return RedirectToAction("Index", "Information");
                        }
                }
                catch(Exception)
                {
                    return View(information);
                }
            }
            else
            {
                return View(information);

            }              
            return RedirectToAction("Index");
        }
        public ActionResult Delete(int id )
        {
            var _formationdelete = _formation.GetById(id);
            return View(_formationdelete);
        }
        public IActionResult DeleteChanged(int id)
        {
            var _formationdelete = _formation.GetById(id);
            _formation.Delete(_formationdelete);
            var statusdelete = _formation.SaveChanges();
            if (statusdelete > 0)
            {
                TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("error", "", "Xoá thành công"));               
            }
            return RedirectToAction("Index", "Information");
        }
        public ActionResult Edit(int id )
        {
            var _formationedit = _formation.GetById(id);
            return View(_formationedit);
        }
        public IActionResult EditConfirm(Information model)
        {
            var _formationedit = _formation.GetById(model.Id);
            _formationedit.Id = model.Id;
            _formationedit.Name = model.Name;
            _formationedit.Descreption = model.Descreption;
            _formationedit.Club = model.Club;
            _formationedit.Image = model.Image;
            _formationedit.Number = model.Number;
            _formationedit.Status = model.Status;
            var statusEdit = _formation.SaveChanges();
            if (statusEdit > 0)
            {
                TempDataHelper.Put<StatusQuery>(TempData, "Notification", new StatusQuery("warning", "", "Sửa thành công"));
            }
            return RedirectToAction("Index","Information");
        }
    }
}
