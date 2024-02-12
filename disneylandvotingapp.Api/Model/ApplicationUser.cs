using disneylandvotingapp.Api.Enums;
using Microsoft.AspNetCore.Identity;


namespace disneylandvotingapp.Api.Model
{
    public class ApplicationUser  :IdentityUser
    {
        public string? Id { get; set; }
        public Title Title { get; set; }
        public Roles Role { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        
    }
}
