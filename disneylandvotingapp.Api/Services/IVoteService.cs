
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Services
{
    public interface IVoteService
    {
        int GetAllVotes();
        List<VotesOverTime> GetVotesReport(DateTime startDate, DateTime endDate);
        List<CharacterPopularity> GetVotesForCharacterInPeriod(DateTime startDate, DateTime endDate, int characterId);
        List<Character> GetTop5Characters();
        List<CharacterPopularity> GetMostPopularCharactersInMorning();
        List<CharacterPopularity> GetMostPopularCharactersInAfternoon();
        List<CharacterPopularity> GetVotesForCharacters(IEnumerable<int> characterIds);
        List<CharacterPopularity> GetCharacterReports(DateTime startDate, DateTime endDate);
        void AddVote(int characterId);
    }
}
