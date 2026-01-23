using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalHealthCard.API.Migrations
{
    /// <inheritdoc />
    public partial class FixAadhaarDataType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
        "ALTER TABLE Nominees MODIFY Contact_No VARCHAR(20) NOT NULL;"
    );

            migrationBuilder.Sql(
                "ALTER TABLE Nominees MODIFY Aadhaar_Number VARCHAR(12) NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE LabTechnicians MODIFY Phone_Number VARCHAR(20) NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE Doctors MODIFY Phone_Number VARCHAR(20) NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE Admins MODIFY Phone_Number VARCHAR(20) NOT NULL;"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
         "ALTER TABLE Nominees MODIFY Contact_No BIGINT NOT NULL;"
     );

            migrationBuilder.Sql(
                "ALTER TABLE Nominees MODIFY Aadhaar_Number BIGINT NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE LabTechnicians MODIFY Phone_Number BIGINT NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE Doctors MODIFY Phone_Number BIGINT NOT NULL;"
            );

            migrationBuilder.Sql(
                "ALTER TABLE Admins MODIFY Phone_Number BIGINT NOT NULL;"
            );
        }
    }
}
