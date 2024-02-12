namespace disneylandvotingapp.Api.Model
{
    public class Vote
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public DateTime VotedAt { get; set; }
        public string? Secret { get; set; }

        // Navigation property
        public Character Character { get; set; }
    }
}
