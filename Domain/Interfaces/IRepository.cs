using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Insert(T entity);
        int SaveChanges();
        T GetById(object id);
        void Delete(T entityToDelete);
        void Update(T entity);
    }
}
