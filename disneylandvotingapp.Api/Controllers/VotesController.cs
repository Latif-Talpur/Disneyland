using disneylandvotingapp.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace disneylandvotingapp.Api.Controllers
{
    [Route("api/votes")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly IVoteService _voteService;

        public VotesController( IVoteService voteService)
        {
            _voteService = voteService;
        }

        // Post: /api/votes/add-vote
        [HttpPost("add-vote")]
        public IActionResult AddVote([FromBody] string characterId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _voteService.AddVote(Convert.ToInt32(characterId));
                return Ok(new { Message = "Vote added successfully!" });
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

        // GET: api/votes
        [HttpGet]
        public ActionResult<int> GetVotes()
        {
            return _voteService.GetAllVotes();
        }

        // GET: api/votes/reports?startDate=2022-01-01&endDate=2022-01-31
        [HttpGet("reports")]
        public IActionResult GetVotesReport(DateTime startDate, DateTime endDate)
        {
            var result = _voteService.GetVotesReport(startDate, endDate);
            return Ok(result);
        }

        // Get: api/votes/characters?startDate={startDate}&endDate={endDate}$characterId={1}
        [HttpGet("characters")]
        public IActionResult GetVotesForCharacterInPeriod(DateTime startDate, DateTime endDate, int characterId)
        {
            var result = _voteService.GetVotesForCharacterInPeriod(startDate, endDate, characterId);
            return Ok(result);
        }
        
        // Get: api/votes/top-5
        [HttpGet("top-5")]
        public IActionResult GetTop5Characters()
        {
            var result = _voteService.GetTop5Characters();
            return Ok(result);
        }

        // Get: api/votes/characters/popular-in-morning?startDate={startDate}&endDate={endDate}
        [HttpGet("characters/popular-in-morning")]
        public IActionResult GetMostPopularCharactersInMorning()
        {
            var result = _voteService.GetMostPopularCharactersInMorning();
            return Ok(result);
        }

        // Get: api/votes/characters/popular-in-afternoon?startDate={startDate}&endDate={endDate},
        [HttpGet("characters/popular-in-afternoon")]
        public IActionResult GetMostPopularCharactersInAfternoon()
        {
            var result = _voteService.GetMostPopularCharactersInAfternoon();
            return Ok(result);
        }

        // Get: api/votes/characters/votes?characterIds=1,2,3
        [HttpGet("characters/votes")]
        public IActionResult GetReportByCharacterFilter(string characterIds)
        {
            var characterIdList = characterIds.Split(',').Select(int.Parse);
            var result = _voteService.GetVotesForCharacters(characterIdList);
            return Ok(result);
        }

        // Get: api/votes/characters/reports?startDate={startDate}&endDate={endDate}
        [HttpGet("characters/reports")]
        public IActionResult GetCharacterReports(DateTime startDate, DateTime endDate)
        {
            var result = _voteService.GetCharacterReports(startDate, endDate);
            return Ok(result);
        }

    }
}
