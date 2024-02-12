
using disneylandvotingapp.Api.Model;

namespace disneylandvotingapp.Api.Services
{
    public interface ICharactersService
    {
        Task<Character> GetById(int id);
        Task<IEnumerable<Character>> GetAll();
        Task<IEnumerable<Character>> GetByName(string name);
        Task<bool> UpdateCharacter(int id, CharacterDTO character);
        Task<Character> InsertCharacter(CharacterDTO character);
    }
}