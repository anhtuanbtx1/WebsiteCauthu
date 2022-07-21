using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebGiaiTri.Common
{
    public static class Utils
    {
        public static string NonUnicode(this string text)
        {
            string[] arr1 = new string[] {
                "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
                "đ", "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ","í","ì","ỉ","ĩ","ị","ó","ò","ỏ","õ",
                "ọ", "ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ","ú","ù","ủ","ũ","ụ","ư","ứ","ừ",
                "ử", "ữ","ự","ý","ỳ","ỷ","ỹ","ỵ","\n"};
            string[] arr2 = new string[] {
                "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
                "d", "e","e","e","e","e","e","e","e","e","e","e","i","i","i","i","i","o","o","o","o",
                "o","o","o","o","o","o","o","o","o","o","o","o","o","u","u","u","u","u","u","u","u",
                "u","u","u","y","y","y","y","y",""};
            for (int i = 0; i < arr1.Length; i++)
            {
                text = text.Replace(arr1[i], arr2[i]);
                text = text.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return text;
        }
        public enum EncodeType
        {
            SHA_256
        }
        public static string secretKey = "auth_api_3sdf43rc11239hsdcnsc0esdcsd!asd0023";
        private static byte[] saltBytes = new byte[] {5,6,1,7,4,2,8,9 };
        public static string EncodePassword(string pass, string encodeType)
        {
            if (string.IsNullOrEmpty(encodeType) || encodeType.ToLower() == "sha256")
                return EncodePassword(pass, EncodeType.SHA_256);

            return "encode type " + encodeType + " not support";
        }

        public static string DecodePassword(string pass, string encodeType)
        {
            if (string.IsNullOrEmpty(encodeType) || encodeType.ToLower() == "sha256")
                return DecodePassword(pass, EncodeType.SHA_256);

            return "encode type " + encodeType + " not support";
        }

        public static string EncodePassword(string pass, EncodeType encodeType)
        {
            switch (encodeType)
            {
                case EncodeType.SHA_256:
                    return EncryptPassSHA256(pass);
                default:
                    return "encode type " + encodeType.ToString() + " not support";
            }
        }

        public static string DecodePassword(string encodePass, EncodeType encodeType)
        {
            switch (encodeType)
            {
                case EncodeType.SHA_256:
                    return DecryptPassSHA256(encodePass);
                default:
                    return "encode type " + encodeType.ToString() + " not support";
            }
        }

        private static string EncryptPassSHA256(string pass)
        {
            try
            {
                //string secretKey = Util.secretKey;

                var bytesToBeEncrypted = Encoding.UTF8.GetBytes(pass);
                var passwordBytes = Encoding.UTF8.GetBytes(secretKey);

                passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

                var bytesEncrypted = EncryptSHA256(bytesToBeEncrypted, passwordBytes);
                return Convert.ToBase64String(bytesEncrypted);
            }
            catch (Exception ex)
            {
                return ex.Message + ex.StackTrace;
            }
        }

        private static string DecryptPassSHA256(string encryptedText)
        {
            try
            {
                //string secretKey = Util.secretKey;
                // Get the bytes of the string
                var bytesToBeDecrypted = Convert.FromBase64String(encryptedText);
                var passwordBytes = Encoding.UTF8.GetBytes(secretKey);

                passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

                var bytesDecrypted = DecryptSHA256(bytesToBeDecrypted, passwordBytes);

                return Encoding.UTF8.GetString(bytesDecrypted);
            }
            catch (Exception ex)
            {
                return ex.Message + ex.StackTrace;
            }
        }

        private static byte[] EncryptSHA256(byte[] bytesToBeEncrypted, byte[] passwordBytes)
        {
            byte[] encryptedBytes = null;

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;
                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                        cs.Close();
                    }

                    encryptedBytes = ms.ToArray();
                }
            }

            return encryptedBytes;
        }

        private static byte[] DecryptSHA256(byte[] bytesToBeDecrypted, byte[] passwordBytes)
        {
            byte[] decryptedBytes = null;

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                        cs.Close();
                    }

                    decryptedBytes = ms.ToArray();
                }
            }

            return decryptedBytes;
        }
    }
}
