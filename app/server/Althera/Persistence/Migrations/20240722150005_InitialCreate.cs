using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Althera.Migrations;

/// <inheritdoc />
public partial class InitialCreate : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Clinics",
            columns: table => new
            {
                clinicId = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                clinicName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                clinicPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                clinicAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Clinics", x => x.clinicId);
            });

        migrationBuilder.CreateTable(
            name: "Patients",
            columns: table => new
            {
                patientId = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                patientFirstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                patientLastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                healthInsuranceCard = table.Column<int>(type: "int", nullable: true),
                clinicId = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Patients", x => x.patientId);
                table.ForeignKey(
                    name: "FK_Patients_Clinics_clinicId",
                    column: x => x.clinicId,
                    principalTable: "Clinics",
                    principalColumn: "clinicId",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Orders",
            columns: table => new
            {
                orderId = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                orthesisModel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                orthesisInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                orthesisScan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                orderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                orderState = table.Column<string>(type: "nvarchar(max)", nullable: true),
                orthesisComment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                patientId = table.Column<int>(type: "int", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Orders", x => x.orderId);
                table.ForeignKey(
                    name: "FK_Orders_Patients_patientId",
                    column: x => x.patientId,
                    principalTable: "Patients",
                    principalColumn: "patientId",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Orders_patientId",
            table: "Orders",
            column: "patientId");

        migrationBuilder.CreateIndex(
            name: "IX_Patients_clinicId",
            table: "Patients",
            column: "clinicId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Orders");

        migrationBuilder.DropTable(
            name: "Patients");

        migrationBuilder.DropTable(
            name: "Clinics");
    }
}