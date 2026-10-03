import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Hidden test account
  const testPw = await bcrypt.hash('g@xsCSJ76j', 10)
  await prisma.user.upsert({
    where: { email: 'abacus-8bed8efa@example.com' },
    update: {},
    create: {
      email: 'abacus-8bed8efa@example.com',
      name: 'Test Admin',
      password: testPw,
      role: 'admin',
    },
  })

  // Demo user 1 - parent/admin
  const demoPw = await bcrypt.hash('Demo1234!', 10)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@senpar.test' },
    update: {},
    create: {
      email: 'demo@senpar.test',
      name: 'John Doe',
      password: demoPw,
      role: 'admin',
    },
  })

  // Demo user 2 - family member
  const alicePw = await bcrypt.hash('Demo1234!', 10)
  const aliceUser = await prisma.user.upsert({
    where: { email: 'alice@senpar.test' },
    update: {},
    create: {
      email: 'alice@senpar.test',
      name: 'Alice Doe',
      password: alicePw,
      role: 'member',
    },
  })

  // Seed vault entries for demo user
  const entries = [
    // Passwords
    {
      userId: demoUser.id,
      category: 'PASSWORD' as const,
      title: 'Netflix Account',
      privacy: 'SHARED' as const,
      data: { username: 'demo@example.com', password: 'N3tfl1x_F@k3!', website: 'https://netflix.com', notes: 'Family plan' },
    },
    {
      userId: demoUser.id,
      category: 'PASSWORD' as const,
      title: 'GitHub (Work)',
      privacy: 'PERSONAL' as const,
      data: { username: 'john.doe@work.fake', password: 'G1tHub_W0rk!', website: 'https://github.com', notes: 'Work account' },
    },
    {
      userId: demoUser.id,
      category: 'PASSWORD' as const,
      title: 'Home Router Admin',
      privacy: 'SHARED' as const,
      data: { username: 'admin', password: 'R0ut3r_@dm1n', website: 'http://192.168.1.1', notes: 'Default gateway' },
    },
    // Devices
    {
      userId: demoUser.id,
      category: 'DEVICE' as const,
      title: 'MacBook Pro (Work)',
      privacy: 'PERSONAL' as const,
      data: { type: 'laptop', brand: 'Apple MacBook Pro 16"', serialNumber: 'C02X1234FAKE', os: 'macOS Sonoma 14.3', notes: 'Work laptop' },
    },
    {
      userId: demoUser.id,
      category: 'DEVICE' as const,
      title: 'iPhone 15',
      privacy: 'PERSONAL' as const,
      data: { type: 'phone', brand: 'Apple iPhone 15 Pro', serialNumber: 'DNPFAKE12345', os: 'iOS 17.3', notes: 'Primary phone' },
    },
    {
      userId: demoUser.id,
      category: 'DEVICE' as const,
      title: 'Family iPad',
      privacy: 'SHARED' as const,
      data: { type: 'tablet', brand: 'Apple iPad Air 5th Gen', serialNumber: 'DLXFAKE67890', os: 'iPadOS 17.2', notes: 'Shared family tablet' },
    },
    {
      userId: demoUser.id,
      category: 'DEVICE' as const,
      title: 'Home Router',
      privacy: 'SHARED' as const,
      data: { type: 'router', brand: 'ASUS RT-AX86U', serialNumber: 'ASUS-FAKE-9876', os: 'Firmware 3.0.0.4', notes: 'Main router' },
    },
    // Subscriptions
    {
      userId: demoUser.id,
      category: 'SUBSCRIPTION' as const,
      title: 'Netflix',
      privacy: 'SHARED' as const,
      data: { plan: 'Premium', billingCycle: 'monthly', cost: '15.99', renewalDate: '2026-11-01', loginEmail: 'demo@example.com', notes: '4K streaming' },
    },
    {
      userId: demoUser.id,
      category: 'SUBSCRIPTION' as const,
      title: 'Spotify Family',
      privacy: 'SHARED' as const,
      data: { plan: 'Family', billingCycle: 'monthly', cost: '16.99', renewalDate: '2026-10-15', loginEmail: 'demo@example.com', notes: '6 accounts' },
    },
    {
      userId: demoUser.id,
      category: 'SUBSCRIPTION' as const,
      title: 'iCloud 200GB',
      privacy: 'SHARED' as const,
      data: { plan: '200GB', billingCycle: 'monthly', cost: '2.99', renewalDate: '2026-10-20', loginEmail: 'demo@example.com', notes: 'Family sharing' },
    },
    {
      userId: demoUser.id,
      category: 'SUBSCRIPTION' as const,
      title: 'Amazon Prime',
      privacy: 'SHARED' as const,
      data: { plan: 'Annual', billingCycle: 'annual', cost: '14.99', renewalDate: '2027-03-01', loginEmail: 'demo@example.com', notes: 'Includes Prime Video' },
    },
    // Secure Notes
    {
      userId: demoUser.id,
      category: 'NOTE' as const,
      title: 'WiFi Passwords (Home)',
      privacy: 'SHARED' as const,
      data: { content: 'Network: DoeFamilyWiFi\nPassword: W1F1_F@k3_P@ss!\n\n5GHz Network: DoeFamilyWiFi_5G\nPassword: 5G_F@k3_P@ss!', tag: 'WiFi' },
    },
    {
      userId: demoUser.id,
      category: 'NOTE' as const,
      title: 'Emergency Contacts',
      privacy: 'SHARED' as const,
      data: { content: 'Dr. Smith (Family Doctor): 555-0100\nPoison Control: 555-0199\nNeighbor (Bob): 555-0150\nSchool: 555-0175', tag: 'Emergency' },
    },
    {
      userId: demoUser.id,
      category: 'NOTE' as const,
      title: 'Insurance Info',
      privacy: 'SHARED' as const,
      data: { content: 'Health Insurance: BlueCross #FAKE-123456\nAuto Insurance: State Farm #FAKE-789012\nHome Insurance: Allstate #FAKE-345678', tag: 'Insurance' },
    },
    // Family
    {
      userId: demoUser.id,
      category: 'FAMILY' as const,
      title: 'Jane Doe',
      privacy: 'SHARED' as const,
      data: { relationship: 'Spouse', birthday: '1990-06-15', email: 'jane@senpar.test', phone: '555-0101', notes: 'Allergic to peanuts' },
    },
    {
      userId: demoUser.id,
      category: 'FAMILY' as const,
      title: 'Tommy Doe',
      privacy: 'SHARED' as const,
      data: { relationship: 'Son (age 12)', birthday: '2014-03-22', email: '', phone: '', notes: 'Plays soccer, room 204 at Maple Elementary' },
    },
    {
      userId: demoUser.id,
      category: 'FAMILY' as const,
      title: 'Emma Doe',
      privacy: 'SHARED' as const,
      data: { relationship: 'Daughter (age 9)', birthday: '2017-09-08', email: '', phone: '', notes: 'Takes piano lessons on Tuesdays' },
    },
  ]

  for (const entry of entries) {
    await prisma.vaultEntry.upsert({
      where: { id: `seed-${entry.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}` },
      update: { data: entry.data, privacy: entry.privacy },
      create: {
        id: `seed-${entry.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        ...entry,
      },
    })
  }

  console.log(`Seeded ${entries.length} vault entries`)
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
