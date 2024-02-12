using disneylandvotingapp.Api.Enums;
using disneylandvotingapp.Api.Helper;
using disneylandvotingapp.Api.Model;
using disneylandvotingapp.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace disneylandvotingapp.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(
        IAuthenticateService authService,
        IUserService userService,
        IOptions<ApplicationSetting> appSettings) : Controller
    {
        private readonly IAuthenticateService _authService = authService;
        private readonly ApplicationSetting _appSettings = appSettings.Value;
        private readonly IUserService _userService = userService;

        // Post: /api/auth/signin
        [AllowAnonymous]
        [HttpPost("signin")]
        public IActionResult Authenticate([FromBody] LoginCredentials loginCredentials)
        {
            var storeduser = _authService.Authenticate(loginCredentials.Username, loginCredentials.password );

            if (storeduser == null)
                return BadRequest("Username or password is incorrect");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, storeduser.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var roles = storeduser.Role.ToString();
            return Ok(new
            {
                storeduser.Id,
                storeduser.UserName,
                storeduser.FirstName,
                storeduser.LastName,
                roles,
                Token = tokenString
            });
        }

        // Post: /api/auth/signup
        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult Register([FromBody] ApplicationDTO user)
        {
            try
            {
                _userService.Create(user, user.Password);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
