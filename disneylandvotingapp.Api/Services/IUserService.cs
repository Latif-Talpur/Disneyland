
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Services
{
    public interface IUserService
    {
        IEnumerable<ApplicationUser> GetAll();
        ApplicationUser Create(ApplicationDTO user, string password);
        void Update(string id, ApplicationDTO user, string password = null);
        ApplicationUser GetById(string id);
        string GetUserRoleById(string id);
    }
}
