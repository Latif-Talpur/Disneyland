
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Services
{
    public class VotingService(ApplicationDbContext context, ILogger<UserService> logger) : IVoteService
    {
        private readonly ApplicationDbContext _context = context;
        private readonly ILogger<UserService> _logger = logger;

        public int GetAllVotes()
        {
            return _context.Votes.Count<Vote>();
        }

        public void AddVote(int characterId)
        {
            var character = _context.Characters.Find(characterId) ?? throw new NotFoundException($"Character with ID {characterId} not found.");
            var newVote = new Vote
            {
                VotedAt = DateTime.Now,
                CharacterId = characterId
            };
            
            character.Votes ??= new List<Vote>();
            
            character.Votes.Add(newVote);

            _context.SaveChanges();
        }

        public List<CharacterPopularity> GetMostPopularCharactersInAfternoon()
        {
            var afternoonPopularity = _context.Votes
                .Where(v => v.VotedAt.Hour >= 12 && v.VotedAt.Hour < 18)
                .GroupBy(v => v.CharacterId)
                .OrderByDescending(g => g.Count())
                .Select(g => new CharacterPopularity
                            {
                                CharacterId = g.Key,
                                TotalVotes = g.Count(),
                                Character = _context.Characters.FirstOrDefault(c => c.Id == g.Key)
                             })
                .ToList();

            return afternoonPopularity;
        }

        public List<CharacterPopularity> GetMostPopularCharactersInMorning()
        {
            var morningPopularity = _context.Votes
                .Where(v => v.VotedAt.Hour >= 6 && v.VotedAt.Hour < 12)
                .GroupBy(v => v.CharacterId)
                .OrderByDescending(g => g.Count())
                .Select(g => new CharacterPopularity
                {
                    CharacterId = g.Key,
                    TotalVotes = g.Count(),
                    Character = _context.Characters.FirstOrDefault(c => c.Id == g.Key)
                })
                .ToList();

            return morningPopularity;
        }

        public List<Character> GetTop5Characters()
        {
            List<Character> top5Characters = _context.Characters
                            .OrderByDescending(c => c.Votes.Count)
                            .Take(5)
                            .ToList();
            return top5Characters;
        }

        public List<VotesOverTime> GetVotesReport(DateTime startDate, DateTime endDate)
        {
            var votesOverTime = _context.Votes
            .Where(v => v.VotedAt >= startDate && v.VotedAt <= endDate)
            .GroupBy(v => v.VotedAt.Date)
            .Select(g => new VotesOverTime { Date = g.Key, TotalVotes = g.Count() })
            .ToList();

            return votesOverTime;
        }
          
        public List<CharacterPopularity> GetVotesForCharacterInPeriod(DateTime startDate, DateTime endDate, int characterId)
        {
            var votesPerCharacter1 = _context.Votes;
            foreach (var item in votesPerCharacter1)
            {
                if (item.CharacterId == characterId)
                {
                    if (item.VotedAt >= startDate)
                        Console.WriteLine("VotedAt is greater then startTime");

                    if (item.VotedAt <= endDate)
                        Console.WriteLine("VotedAt is greater then startTime");
                }
            }
            var votesPerCharacter = _context.Votes.Where(v => v.VotedAt >= startDate && v.VotedAt <= endDate && v.CharacterId == characterId)
            .GroupBy(v => v.CharacterId)
            .Select(g => new CharacterPopularity
            {
                CharacterId = g.Key,
                TotalVotes = g.Count(),
                Character = _context.Characters.FirstOrDefault(c => c.Id == g.Key)
            })
            .ToList();

            return votesPerCharacter;
        }

        public List<CharacterPopularity> GetVotesForCharacters(IEnumerable<int> characterIds)
        {
            var votesForCharacters = _context.Votes
                .Where(v => characterIds.Contains(v.CharacterId) )
                .GroupBy(v => v.CharacterId)
                .Select(g => new CharacterPopularity
                {
                    CharacterId = g.Key,
                    TotalVotes = g.Count(),
                    Character = _context.Characters.FirstOrDefault(c => c.Id == g.Key)
                })
                .ToList();

            return votesForCharacters;
        }

        public List<CharacterPopularity> GetCharacterReports(DateTime startDate, DateTime endDate)
        {
            var votesPerCharacter = _context.Votes
            .Where(v => v.VotedAt >= startDate && v.VotedAt <= endDate)
            .GroupBy(v => v.CharacterId)
            .Select(g => new CharacterPopularity
            {
                CharacterId = g.Key,
                TotalVotes = g.Count(),
                Character = _context.Characters.FirstOrDefault(c => c.Id == g.Key)
            })
            .ToList();

            return votesPerCharacter;
        }

    }
}
