using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalHealthCard.API.Migrations
{
    /// <inheritdoc />
    public partial class FixAadhaarDataTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
               "ALTER TABLE Patients MODIFY Phone_Number VARCHAR(20) NOT NULL;"
           );

            migrationBuilder.Sql(
                "ALTER TABLE Patients MODIFY Aadhaar_Number VARCHAR(12) NOT NULL;"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
               "ALTER TABLE Patients MODIFY Phone_Number BIGINT NOT NULL;"
           );

            migrationBuilder.Sql(
                "ALTER TABLE Patients MODIFY Aadhaar_Number BIGINT NOT NULL;"
            );
        }
    }
}
