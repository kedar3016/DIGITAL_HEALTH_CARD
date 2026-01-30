using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HealthCardAPI.Migrations
{
    /// <inheritdoc />
    public partial class emailservice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 30, 19, 56, 59, 493, DateTimeKind.Local).AddTicks(5285));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Patients",
                keyColumn: "Id",
                keyValue: 1,
                column: "RegistrationDate",
                value: new DateTime(2026, 1, 30, 16, 34, 3, 245, DateTimeKind.Local).AddTicks(2315));
        }
    }
}
