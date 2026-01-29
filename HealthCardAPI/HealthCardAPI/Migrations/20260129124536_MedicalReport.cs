using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCardAPI.Migrations
{
    /// <inheritdoc />
    public partial class MedicalReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HealthCardId",
                table: "MedicalReports",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 29, 18, 15, 33, 317, DateTimeKind.Local).AddTicks(5392));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HealthCardId",
                table: "MedicalReports");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 26, 13, 43, 0, 334, DateTimeKind.Local).AddTicks(3151));
        }
    }
}
