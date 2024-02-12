
using disneylandvotingapp.Api.Helper;
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Services
{
    public class UserService(ApplicationDbContext context, ILogger<UserService> logger) : IUserService
    {
        private ApplicationDbContext _context = context;
        private readonly ILogger<UserService> _logger = logger;

        public IEnumerable<ApplicationUser> GetAll()
        {
            return _context.Users.ToList();
        }

        public ApplicationUser GetById(string id)
        {
            return _context?.Users?.Find(id);
        }

        public ApplicationUser Create(ApplicationDTO user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new ApplicationException("Password is required");

            if (_context.Users.Any(x => x.FirstName == user.FirstName))
                throw new ApplicationException("User Name: " + user.FirstName + "' is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            ApplicationUser applicationUser = new ApplicationUser
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.FirstName,
                Title = user.Title.ToTitle(),
                Role = user.Role.ToRole(),
                Password= password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Users.Add(applicationUser);
            _context.SaveChanges();

            return applicationUser;
        }

        public void Update(string id, ApplicationDTO userParam, string password = null)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                throw new NotFoundException($"User with ID {id} not found.");

            if (userParam.FirstName != user.UserName)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.UserName == userParam.FirstName))
                    throw new ApplicationException("User Name:  " + userParam.FirstName + " is already taken");
            }

            // update user properties
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.UserName = userParam.FirstName;
            user.Email= userParam.Email;
            user.Title = userParam.Title.ToTitle();
            user.Role = userParam.Role.ToRole();

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }
     
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public string GetUserRoleById(string id)
        {
            ApplicationUser application = _context.Users.Find(id);
            return application.Role.ToString();
        }
    }
}
    

