using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{   [ApiController]
    [Route("[controller]")]
    public class ValuesController : Controller
    {
        private readonly ILogger<ValuesController> _logger;
        private DataContext _context ;

        public ValuesController(DataContext context, ILogger<ValuesController> logger)
        {
            _context = context;
            _logger = logger;
            
        }


        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.values.ToListAsync();
            return Ok(values);
        }

             [HttpGet ("{id}")]
        public async Task<ActionResult> GetValue(int id)
        {
            var value = await _context.values.FirstOrDefaultAsync(x=> x.Id == id);
            if(value!=null)
            return Ok(value);
            return NotFound();
        }

    }
}