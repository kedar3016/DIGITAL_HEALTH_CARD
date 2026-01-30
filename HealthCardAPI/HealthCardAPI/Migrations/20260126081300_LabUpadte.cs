using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCardAPI.Migrations
{
    /// <inheritdoc />
    public partial class LabUpadte : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LabType",
                table: "LabTechnicians",
                newName: "TechnicianName");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "LabTechnicians",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "LabAddress",
                table: "LabTechnicians",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "LabTechnicians",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 26, 13, 43, 0, 334, DateTimeKind.Local).AddTicks(3151));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "LabTechnicians");

            migrationBuilder.DropColumn(
                name: "LabAddress",
                table: "LabTechnicians");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "LabTechnicians");

            migrationBuilder.RenameColumn(
                name: "TechnicianName",
                table: "LabTechnicians",
                newName: "LabType");

            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 26, 7, 13, 18, 872, DateTimeKind.Local).AddTicks(9336));
        }
    }
}
