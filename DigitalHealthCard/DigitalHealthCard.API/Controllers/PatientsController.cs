using DigitalHealthCard.API.DTO;
using DigitalHealthCard.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DigitalHealthCard.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly PatientService _patientService;
        public PatientsController(PatientService patientService)
        {
            _patientService = patientService;
        }

        //Regiter Patient (Aadhaar Verification)
        [HttpPost("register")]
        public IActionResult Register([FromBody] PatientRegisterRequestDto dto)
        {
            try
            {
                var patient = _patientService.RegisterPatient(dto);

                return Ok(new
                {
                    patient.Id,
                    patient.Name,
                    patient.HealthCardNumber,
                    Message = "Patient registered successfully."

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
                //return BadRequest(new
                //{
                //    error = ex.InnerException?.Message,
                //    stack = ex.InnerException?.StackTrace
                //});
            }
        }


        //Get All Patients
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok("Get all patients to be implemented");
        }

        //Get Patient by Id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok($"Get patient by Id: {id} to be implemented");

        }
    }
}
