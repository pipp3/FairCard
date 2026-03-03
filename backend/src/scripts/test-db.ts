import "dotenv/config";
import { prisma } from "../db/client"; // ajusta el path si es necesario

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();