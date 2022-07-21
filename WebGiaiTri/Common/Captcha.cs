using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebGiaiTri.Common.Utils;

namespace WebGiaiTri.Common
{
    public class Captcha
    {
        const string Letters = "23456789ABCDEFGHJKLMNPRTUVWXYZ";
        const string CaptchaCookieName = "CaptchaCode";
        public void RemoveCaptcha (HttpResponse Response)
        {
            Response.Cookies.Delete(CaptchaCookieName);
        }
        public void SaveCaptcha(string code, HttpResponse Response)
        {
            code = EncodePassword(code, EncodeType.SHA_256);
            RemoveCaptcha(Response);
            Response.Cookies.Append(CaptchaCookieName, code, new CookieOptions()
            {
                Expires = DateTime.Now.AddDays(1)
            });
        }
        public bool ValidateCaptchaCode(string userInputCaptcha, HttpRequest Request, HttpResponse Response)
        {
            if (userInputCaptcha == null)
                return false;

            if (Request.Cookies[CaptchaCookieName] == null)
                return false;

            string captchaCode = Request.Cookies[CaptchaCookieName];
            var isValid = EncodePassword(userInputCaptcha, EncodeType.SHA_256) == captchaCode;
            RemoveCaptcha(Response);
            return isValid;
        }

        public string GenerateCaptchaCode()
        {
            Random rand = new Random();
            int maxRand = Letters.Length - 1;

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < 5; i++)
            {
                int index = rand.Next(maxRand);
                sb.Append(Letters[index]);
            }

            return sb.ToString();
        }
    }
}
