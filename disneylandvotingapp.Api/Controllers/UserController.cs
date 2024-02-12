using AutoMapper;
using disneylandvotingapp.Api.Helper;
using disneylandvotingapp.Api.Model;
using disneylandvotingapp.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace disneylandvotingapp.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(
        IUserService userService,
        IOptions<ApplicationSetting> appSettings, IMapper mapper) : Controller
    {
        private IUserService _userService = userService;
        private readonly IMapper _mapper = mapper;

        // GET: api/users/role?id=${id},
        [HttpGet("role")]
        public IActionResult GetUserRoleById(string id)
        {
            var userRole = _userService.GetUserRoleById(id);

            if (userRole == null)
            {
                return NotFound();
            }

            return Json(new { UserRole = userRole });
        }

        // GET: api/users/all
        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var users =  _userService.GetAll();
            return Ok(_mapper.Map<IEnumerable<ApplicationDTO>>(users));
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var user = _userService.GetById(id);
            return Ok(_mapper.Map<ApplicationDTO>(user));
        }

        // GET: api/users/search?name=${name},
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetByName([FromQuery] string name)
        {
            var users = _userService.GetAll();
            if (string.IsNullOrEmpty(name))
            {
                return Ok(users);
            }

            var searchResults = users
                .Where(c => c.FirstName.Contains(name, System.StringComparison.OrdinalIgnoreCase))
                .ToList();

            return Ok(searchResults);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] ApplicationDTO user)
        {
            try
            {
                _userService.Update(id,user, user.Password);
                return Ok(new { Message = "User added successfully!" });
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostUser([FromBody] ApplicationDTO applicationUser)
        {
            try
            {
                if (applicationUser == null) return BadRequest();
                var dbUser = _userService.Create(applicationUser, applicationUser.Password);
                return CreatedAtAction("PostUser", new { id = dbUser.Id }, dbUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
