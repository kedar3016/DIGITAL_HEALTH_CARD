using HealthCardAPI.DTOs;
using HealthCardAPI.Models;
using HealthCardAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace HealthCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LabTechniciansController : ControllerBase
    {
        private readonly ILabTechnicianService _service;

        public LabTechniciansController(ILabTechnicianService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAllLabTechnicians());
        }

        [HttpPost]
        public IActionResult Create(CreateLabTechnicianDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lab = new LabTechnician
            {
                LabName = dto.LabName,
                //LabType = dto.LabType,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email
            };

            return Ok(_service.CreateLabTechnician(lab));
        }
    }
}
