import {PrismaClient} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@greenpower.uz';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: {email: adminEmail},
    update: {},
    create: {
      email: adminEmail,
      password: hashed,
      name: 'Admin'
    }
  });

  await prisma.siteSettings.upsert({
    where: {key: 'main'},
    update: {},
    create: {
      key: 'main',
      phone: 'PLACEHOLDER_PHONE',
      telegram: 'https://t.me/PLACEHOLDER_TELEGRAM',
      addressUz: 'PLACEHOLDER_ADDRESS_UZ',
      addressRu: 'PLACEHOLDER_ADDRESS_RU',
      workingHoursUz: 'PLACEHOLDER_WORKING_HOURS_UZ',
      workingHoursRu: 'PLACEHOLDER_WORKING_HOURS_RU',
      seoTitleUz: 'Green Power — DC tezkor zaryad stansiyalari',
      seoTitleRu: 'Green Power — DC быстрые зарядные станции',
      heroTitleUz: 'Biznes uchun tezkor DC zaryad stansiyalari',
      heroTitleRu: 'Быстрые DC зарядные станции для бизнеса'
    }
  });

  console.log('Seed completed: admin user + default settings');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

