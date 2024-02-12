
namespace disneylandvotingapp.Api.Model
{
    // Character Model
    public class Character
    {
        public int Id { get; set; }
        public  string? Name { get; set; }
        public string PictureUrl { get; set; }
        public ICollection<Vote> Votes { get; set; }
        public string? Secret { get; set; }
    }
}
