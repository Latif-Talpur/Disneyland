namespace disneylandvotingapp.Api.Model
{
    public class CharacterPopularity
    {
        public int CharacterId { get; set; }
        public int TotalVotes { get; set; }
        public Character Character { get; set; }
    }

}
