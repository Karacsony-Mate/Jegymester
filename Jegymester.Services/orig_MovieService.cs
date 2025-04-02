using Jegymester.DataContext.Context;
using Jegymester.DataContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Jegymester.Services
{
    public interface IMovieService
    {
        List<Movie> List();
    }

    public class orig_MovieService : IMovieService
    {
        private readonly AppDbContext _context;

        public orig_MovieService(AppDbContext context)
        {
            _context = context;
        }

        public List<Movie> List()
        {
            return _context.Movies.ToList();
        }
    }
}