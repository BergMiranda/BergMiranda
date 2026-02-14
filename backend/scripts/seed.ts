import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await prisma.employee.upsert({
    where: { email: 'admin@shop.local' },
    update: {},
    create: { name: 'Admin User', email: 'admin@shop.local', passwordHash, role: 'ADMIN' }
  });

  const client = await prisma.client.create({
    data: { type: 'INDIVIDUAL', name: 'John Driver', phone: '+15551234567', email: 'john@example.com' }
  });

  const vehicle = await prisma.vehicle.create({
    data: {
      clientId: client.id,
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      vin: `VIN${Date.now()}`,
      plate: `PLT${Date.now()}`,
      mileage: 45000
    }
  });

  await prisma.workOrder.create({
    data: {
      clientId: client.id,
      vehicleId: vehicle.id,
      assignedToId: admin.id,
      diagnosis: 'Brake vibration at high speed',
      laborHours: 2,
      laborRate: 95,
      items: { create: [{ description: 'Brake pads', quantity: 1, unitPrice: 120, isPart: true }] }
    }
  });
}

main().finally(() => prisma.$disconnect());
