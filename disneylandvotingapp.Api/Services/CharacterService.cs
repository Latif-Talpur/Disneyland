using disneylandvotingapp.Api.Model;
using Microsoft.EntityFrameworkCore;

namespace disneylandvotingapp.Api.Services
{
    public class CharacterService(ApplicationDbContext context, ILogger<UserService> logger) : ICharactersService
    {
        private ApplicationDbContext _context = context;
        private readonly ILogger<UserService> _logger = logger;

        public async Task<IEnumerable<Character>> GetAll()
        {
            return await _context.Characters.ToListAsync<Character>();
        }

        public async Task<Character> GetById(int id)
        {
            return await _context.Characters.FindAsync(id);
        }

        public async Task<IEnumerable<Character>> GetByName(string name)
        {
            var charcters = from m in _context.Characters
                            select m;

            if (!string.IsNullOrEmpty(name))
            {
                charcters = charcters.Where(c => c.Name.Contains(name));
            }

            return await charcters.ToListAsync();
        }

        public async Task<bool> UpdateCharacter(int id, CharacterDTO character)
        {
            var characterDB = _context.Characters.Find(id) ?? throw new NotFoundException($"Character with ID {id} not found.");
            characterDB.Name = character.Name;
            characterDB.PictureUrl = character.PictureUrl;
            characterDB.Votes= new List<Vote>();
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Character> InsertCharacter(CharacterDTO characterDTO)
        {
            Character character = new()
            {
                Name = characterDTO.Name,
                PictureUrl = characterDTO.PictureUrl,
                Votes = new List<Vote>()
            };
            _context.Characters.Add(character);
            await _context.SaveChangesAsync();
            return character;
        }
    }
}