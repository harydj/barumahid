import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed for Rent-to-Own Platform...')

  // Create admin user
  const hashedPassword = await hashPassword('admin123')
  await prisma.user.upsert({
    where: { email: 'admin@barumahid.com' },
    update: {},
    create: {
      email: 'admin@barumahid.com',
      name: 'Admin barumahID',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    },
  })
  console.log('✓ Created admin user')

  // Create sample user
  const userPassword = await hashPassword('user123')
  const sampleUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      phone: '+6281234567890',
      name: 'John Doe',
      password: userPassword,
      role: 'user',
      isVerified: true,
    },
  })
  console.log('✓ Created sample user')

  // Create sample kos_owner user
  const ownerPassword = await hashPassword('owner123')
  const kosOwnerUser = await prisma.user.upsert({
    where: { email: 'owner1@kos.com' },
    update: {},
    create: {
      email: 'owner1@kos.com',
      phone: '+6281111111111',
      name: 'Budi Santoso',
      password: ownerPassword,
      role: 'kos_owner',
      isVerified: true,
    },
  })
  console.log('✓ Created kos owner user')

  // Create user profile
  await prisma.userProfile.upsert({
    where: { userId: sampleUser.id },
    update: {},
    create: {
      userId: sampleUser.id,
      ktpNumber: '3201010101900001',
      address: 'Jl. Contoh No. 123',
      city: 'Jakarta',
      province: 'DKI Jakarta',
      postalCode: '12345',
      birthDate: new Date('1990-01-01'),
      gender: 'male',
      occupation: 'Software Developer',
    },
  })
  console.log('✓ Created user profile')

  // Create user verification
  await prisma.userVerification.upsert({
    where: { userId: sampleUser.id },
    update: {},
    create: {
      userId: sampleUser.id,
      emailVerified: true,
      phoneVerified: true,
      ktpVerified: true,
      verifiedAt: new Date(),
    },
  })
  console.log('✓ Created user verification')

  // HomePage Content for Rent-to-Own
  await prisma.homePageContent.upsert({
    where: { id: 'homepage-1' },
    update: {
      heroTitle: 'Dari Ngekos, Bisa Punya Rumah',
      heroSubtitle: 'Platform Rent-to-Own BarumahID',
      heroDescription: 'Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah. Sebagian dari pembayaran sewa bulanan Anda otomatis menjadi saldo yang dapat digunakan untuk membangun rumah di masa depan.',
      stats: [
        { value: '1000+', description: 'User\nTerdaftar' },
        { value: '500+', description: 'Kos Mitra\nAktif' },
        { value: '50+', description: 'Rumah\nTerselesaikan' },
        { value: '95%', description: 'Kepuasan\nUser' },
      ],
    },
    create: {
      id: 'homepage-1',
      heroTitle: 'Dari Ngekos, Bisa Punya Rumah',
      heroSubtitle: 'Platform Rent-to-Own BarumahID',
      heroDescription: 'Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah. Sebagian dari pembayaran sewa bulanan Anda otomatis menjadi saldo yang dapat digunakan untuk membangun rumah di masa depan.',
      stats: [
        { value: '1000+', description: 'User\nTerdaftar' },
        { value: '500+', description: 'Kos Mitra\nAktif' },
        { value: '50+', description: 'Rumah\nTerselesaikan' },
        { value: '95%', description: 'Kepuasan\nUser' },
      ],
    },
  })
  console.log('✓ Created homepage content')

  // Create Kos Owners
  const owner1 = await prisma.kosOwner.upsert({
    where: { email: 'owner1@kos.com' },
    update: {},
    create: {
      name: 'Budi Santoso',
      email: 'owner1@kos.com',
      phone: '+6281111111111',
      address: 'Jakarta Selatan',
    },
  })

  const owner2 = await prisma.kosOwner.upsert({
    where: { email: 'owner2@kos.com' },
    update: {},
    create: {
      name: 'Siti Nurhaliza',
      email: 'owner2@kos.com',
      phone: '+6282222222222',
      address: 'Jakarta Pusat',
    },
  })
  console.log('✓ Created kos owners')

  // Create Kos Samples
  const kos1 = await prisma.kos.upsert({
    where: { slug: 'kos-putra-jakarta-selatan' },
    update: {},
    create: {
      name: 'Kos Putra Jakarta Selatan',
      slug: 'kos-putra-jakarta-selatan',
      description: 'Kos nyaman untuk putra dengan fasilitas lengkap. Mitra BarumahID - 10% dari sewa menjadi saldo kepemilikan rumah.',
      address: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
      latitude: -6.2603,
      longitude: 106.8146,
      priceMonthly: 1500000,
      priceYearly: 15000000,
      type: 'putra',
      roomType: 'single',
      isBarumahIDPartner: true,
      ownershipPercentage: 10, // 10% dari sewa menjadi saldo
      status: 'active',
      ownerId: owner1.id,
    },
  })

  const kos2 = await prisma.kos.upsert({
    where: { slug: 'kos-putri-jakarta-pusat' },
    update: {},
    create: {
      name: 'Kos Putri Jakarta Pusat',
      slug: 'kos-putri-jakarta-pusat',
      description: 'Kos aman dan nyaman untuk putri. Mitra BarumahID - 15% dari sewa menjadi saldo kepemilikan rumah.',
      address: 'Jl. Thamrin No. 12, Jakarta Pusat',
      city: 'Jakarta Pusat',
      province: 'DKI Jakarta',
      postalCode: '10240',
      latitude: -6.1944,
      longitude: 106.8229,
      priceMonthly: 2000000,
      priceYearly: 20000000,
      type: 'putri',
      roomType: 'double',
      isBarumahIDPartner: true,
      ownershipPercentage: 15, // 15% dari sewa menjadi saldo
      status: 'active',
      ownerId: owner2.id,
    },
  })

  const kos3 = await prisma.kos.upsert({
    where: { slug: 'kos-campur-bekasi' },
    update: {},
    create: {
      name: 'Kos Campur Bekasi',
      slug: 'kos-campur-bekasi',
      description: 'Kos campur dengan fasilitas lengkap. Mitra BarumahID - 12% dari sewa menjadi saldo kepemilikan rumah.',
      address: 'Jl. Ahmad Yani No. 88, Bekasi',
      city: 'Bekasi',
      province: 'Jawa Barat',
      postalCode: '17141',
      latitude: -6.2383,
      longitude: 106.9756,
      priceMonthly: 1200000,
      priceYearly: 12000000,
      type: 'campur',
      roomType: 'triple',
      isBarumahIDPartner: true,
      ownershipPercentage: 12,
      status: 'active',
      ownerId: owner1.id,
    },
  })
  console.log('✓ Created kos samples')

  // Create Kos Facilities
  const facilities1 = [
    { name: 'AC', icon: '❄️', order: 0 },
    { name: 'WiFi', icon: '📶', order: 1 },
    { name: 'Kamar Mandi Dalam', icon: '🚿', order: 2 },
    { name: 'Dapur Bersama', icon: '🍳', order: 3 },
    { name: 'Parkir Motor', icon: '🏍️', order: 4 },
  ]

  for (const facility of facilities1) {
    await prisma.kosFacility.create({
      data: {
        kosId: kos1.id,
        ...facility,
      },
    })
  }

  const facilities2 = [
    { name: 'AC', icon: '❄️', order: 0 },
    { name: 'WiFi', icon: '📶', order: 1 },
    { name: 'Kamar Mandi Dalam', icon: '🚿', order: 2 },
    { name: 'Dapur Bersama', icon: '🍳', order: 3 },
    { name: 'Parkir Motor', icon: '🏍️', order: 4 },
    { name: 'Security 24/7', icon: '🔒', order: 5 },
  ]

  for (const facility of facilities2) {
    await prisma.kosFacility.create({
      data: {
        kosId: kos2.id,
        ...facility,
      },
    })
  }
  console.log('✓ Created kos facilities')

  // Create Kos Images
  await prisma.kosImage.createMany({
    data: [
      { kosId: kos1.id, url: '/placeholder.jpg', alt: 'Kos Putra Jakarta Selatan', isPrimary: true, order: 0 },
      { kosId: kos2.id, url: '/placeholder.jpg', alt: 'Kos Putri Jakarta Pusat', isPrimary: true, order: 0 },
      { kosId: kos3.id, url: '/placeholder.jpg', alt: 'Kos Campur Bekasi', isPrimary: true, order: 0 },
    ],
  })
  console.log('✓ Created kos images')

  // Create Rent-to-Own Program for sample user
  const program = await prisma.rentToOwnProgram.upsert({
    where: { userId: sampleUser.id },
    update: {
      status: 'mengumpulkan_saldo',
      ownershipBalance: 500000,
      targetBalance: 50000000,
    },
    create: {
      userId: sampleUser.id,
      status: 'mengumpulkan_saldo',
      ownershipBalance: 500000,
      targetBalance: 50000000,
    },
  })
  console.log('✓ Created rent-to-own program')

  // Create House Designs
  const designs = [
    {
      name: 'Tipe 36',
      slug: 'tipe-36',
      description: 'Rumah tipe 36 dengan 2 kamar tidur, 1 kamar mandi, ruang tamu, dan dapur. Cocok untuk keluarga kecil.',
      size: 36,
      bedrooms: 2,
      bathrooms: 1,
      features: ['2 Kamar Tidur', '1 Kamar Mandi', 'Ruang Tamu', 'Dapur', 'Carport'],
      images: ['/placeholder.jpg'],
      basePrice: 300000000,
      order: 0,
    },
    {
      name: 'Tipe 45',
      slug: 'tipe-45',
      description: 'Rumah tipe 45 dengan 3 kamar tidur, 2 kamar mandi, ruang tamu, ruang keluarga, dan dapur. Ideal untuk keluarga menengah.',
      size: 45,
      bedrooms: 3,
      bathrooms: 2,
      features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Ruang Tamu', 'Ruang Keluarga', 'Dapur', 'Carport'],
      images: ['/placeholder.jpg'],
      basePrice: 450000000,
      order: 1,
    },
    {
      name: 'Tipe 54',
      slug: 'tipe-54',
      description: 'Rumah tipe 54 dengan 3 kamar tidur, 2 kamar mandi, ruang tamu, ruang keluarga, dapur, dan taman. Pilihan terbaik untuk keluarga besar.',
      size: 54,
      bedrooms: 3,
      bathrooms: 2,
      features: ['3 Kamar Tidur', '2 Kamar Mandi', 'Ruang Tamu', 'Ruang Keluarga', 'Dapur', 'Carport', 'Taman'],
      images: ['/placeholder.jpg'],
      basePrice: 600000000,
      order: 2,
    },
  ]

  for (const design of designs) {
    await prisma.houseDesign.upsert({
      where: { slug: design.slug },
      update: {},
      create: design,
    })
  }
  console.log('✓ Created house designs')

  // Create FAQs for Rent-to-Own
  const faqs = [
    {
      question: 'Apa itu program rent-to-own BarumahID?',
      answer: 'Program rent-to-own BarumahID adalah sistem inovatif yang mengubah biaya sewa kos menjadi saldo kepemilikan rumah. Sebagian dari pembayaran sewa bulanan Anda otomatis menjadi saldo yang dapat digunakan untuk membangun rumah di masa depan.',
      category: 'general',
      order: 0,
    },
    {
      question: 'Bagaimana cara kerja program rent-to-own?',
      answer: 'Anda menyewa kos mitra BarumahID, sebagian biaya sewa (10-15%) otomatis menjadi saldo kepemilikan. Ketika saldo dan riwayat pembayaran memenuhi syarat, Anda dapat memilih desain rumah dan membangun. Setelah rumah selesai, BTN akan melakukan valuasi dan Anda dapat menandatangani kontrak langsung dengan BTN.',
      category: 'general',
      order: 1,
    },
    {
      question: 'Berapa persentase saldo yang didapat dari sewa?',
      answer: 'Persentase saldo bervariasi tergantung kos mitra, biasanya antara 10-15% dari biaya sewa bulanan. Informasi lengkap tersedia di detail setiap kos mitra.',
      category: 'program',
      order: 2,
    },
    {
      question: 'Kapan saya bisa mulai membangun rumah?',
      answer: 'Anda dapat mulai membangun rumah ketika saldo kepemilikan dan riwayat pembayaran sewa memenuhi syarat yang ditentukan. Sistem akan otomatis mengupdate status Anda menjadi "Siap Konstruksi" ketika semua syarat terpenuhi.',
      category: 'program',
      order: 3,
    },
    {
      question: 'Apa saja tipe rumah yang tersedia?',
      answer: 'BarumahID menyediakan 3 tipe rumah: Tipe 36 (2 kamar), Tipe 45 (3 kamar), dan Tipe 54 (3 kamar dengan taman). Setiap tipe memiliki desain dan fitur yang dapat disesuaikan dengan kebutuhan Anda.',
      category: 'house',
      order: 4,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({
      data: faq,
    })
  }
  console.log('✓ Created FAQs')

  // Create Company Profile (Keep existing)
  await prisma.companyProfile.upsert({
    where: { id: 'company-1' },
    update: {},
    create: {
      id: 'company-1',
      companyName: 'PT Inditek Bluprim Mahaksa',
      tagline: 'Dari Ngekos, Bisa Punya Rumah',
      aboutDescription: 'BarumahID adalah platform rent-to-own inovatif yang mengubah cara orang memiliki rumah. Mulai dari ngekos, akhiri dengan punya rumah melalui program rent-to-own yang terjangkau dan transparan.',
      vision: 'Menjadi platform rent-to-own terdepan di Indonesia yang memudahkan setiap orang memiliki rumah impian',
      mission: 'Menyediakan solusi rent-to-own yang inovatif, transparan, dan terjangkau untuk membantu masyarakat Indonesia memiliki rumah melalui program sewa yang terstruktur',
    },
  })
  console.log('✓ Created company profile')

  // Create Navigation Links
  const navLinks = [
    { id: 'nav-home', name: 'Home', href: '/', order: 0 },
    { id: 'nav-kos', name: 'Cari Kos', href: '/kos', order: 1 },
    { id: 'nav-simulasi', name: 'Simulasi', href: '/simulasi', order: 2 },
    { id: 'nav-about', name: 'Tentang Kami', href: '/about', order: 3 },
    { id: 'nav-contact', name: 'Kontak', href: '/contact', order: 4 },
  ]

  for (const link of navLinks) {
    await prisma.navigationLink.upsert({
      where: { id: link.id },
      update: link,
      create: link,
    })
  }
  console.log('✓ Created navigation links')

  // Create Contact Info
  const contactInfo = [
    {
      id: 'contact-phone',
      type: 'phone',
      title: 'WhatsApp',
      details: ['+62 851-5788-3292', '+62 896-3641-0565'],
      order: 0,
    },
    {
      id: 'contact-email',
      type: 'email',
      title: 'Email',
      details: ['barumahid@gmail.com', 'info@barumahid.com'],
      order: 1,
    },
    {
      id: 'contact-location',
      type: 'location',
      title: 'Kantor Pusat',
      details: ['Jakarta, Indonesia'],
      order: 2,
    },
    {
      id: 'contact-hours',
      type: 'hours',
      title: 'Jam Operasional',
      details: ['Senin - Jumat: 08:00 - 17:00', 'Sabtu: 09:00 - 13:00'],
      order: 3,
    },
  ]

  for (const info of contactInfo) {
    await prisma.contactInfo.upsert({
      where: { id: info.id },
      update: info,
      create: info,
    })
  }
  console.log('✓ Created contact info')

  // Create Footer Sections
  const footerSections = [
    {
      id: 'footer-platform',
      title: 'Platform',
      order: 0,
      links: [
        { label: 'Cari Kos Mitra', href: '/kos', order: 0 },
        { label: 'Simulasi Rumah', href: '/simulasi', order: 1 },
        { label: 'Program Rent-to-Own', href: '/rent-to-own', order: 2 },
        { label: 'Ready to Build', href: '/ready-to-build', order: 3 },
      ],
    },
    {
      id: 'footer-company',
      title: 'Perusahaan',
      order: 1,
      links: [
        { label: 'Tentang Kami', href: '/about', order: 0 },
        { label: 'Artikel', href: '/article', order: 1 },
        { label: 'Kontak', href: '/contact', order: 2 },
        { label: 'Karir', href: '#careers', order: 3 },
      ],
    },
    {
      id: 'footer-support',
      title: 'Bantuan',
      order: 2,
      links: [
        { label: 'Panduan', href: '#guide', order: 0 },
        { label: 'FAQ', href: '#faq', order: 1 },
        { label: 'Syarat & Ketentuan', href: '#terms', order: 2 },
        { label: 'Kebijakan Privasi', href: '#privacy', order: 3 },
      ],
    },
  ]

  for (const section of footerSections) {
    const { links, ...sectionData } = section
    const createdSection = await prisma.footerSection.upsert({
      where: { id: sectionData.id },
      update: sectionData,
      create: sectionData,
    })

    // Delete existing links and create new ones
    await prisma.footerLink.deleteMany({
      where: { footerSectionId: createdSection.id },
    })

    for (const link of links) {
      await prisma.footerLink.create({
        data: {
          ...link,
          footerSectionId: createdSection.id,
        },
      })
    }
  }
  console.log('✓ Created footer sections')

  console.log('✓ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
