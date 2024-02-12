using Microsoft.AspNetCore.Mvc;
using disneylandvotingapp.Api.Model;
using disneylandvotingapp.Api.Services;

namespace disneylandvotingapp.Api.Controllers
{
    [Route("api/characters")]
    [ApiController]
    public class CharactersController(ICharactersService service,  ILogger<CharactersController> logger) : ControllerBase
    {
        private readonly ICharactersService _service = service;
        private readonly ILogger<CharactersController> _logger = logger;

        // GET: api/characters/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Character>>> GetAllCharacters()
        {
            var characters = await _service.GetAll();

            if (characters == null)
                return NotFound();
            
            return Ok(characters);
        }

        // GET: api/characters/search?name=${name},
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharactersByName([FromQuery] string name)
        {
            var characters = await _service.GetByName(name);

            if (characters == null)
                return NotFound();

            return Ok(characters);
        }

        // GET: api/characters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            var character = await _service.GetById(id);

            if (character == null)
                return NotFound();

            return Ok(character);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id,[FromBody] CharacterDTO character)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _service.UpdateCharacter(Convert.ToInt32(id), character);
                return Ok(new { Message = "Character update successfully!" });
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Character>> PostCharacter([FromBody] CharacterDTO characterDTO)
        {
            try
            {
                if (characterDTO == null) return BadRequest();
                var character= await _service.InsertCharacter(characterDTO);
                return CreatedAtAction("PostCharacter", new { id = character.Id }, character);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
