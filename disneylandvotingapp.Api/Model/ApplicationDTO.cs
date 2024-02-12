using disneylandvotingapp.Api.Enums;

namespace disneylandvotingapp.Api.Model
{
    public class ApplicationDTO
    {
        public string id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Title { get; set; }
        public string ConfirmPassword { get; set; }

    }
}
