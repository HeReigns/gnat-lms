const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); const bcrypt = require('bcrypt');
async function main(){ const pass = await bcrypt.hash('password123', 10); await prisma.user.upsert({ where: { email: 'test@gnat.local' }, update: {}, create: { email: 'test@gnat.local', password: pass, firstName: 'Test', lastName: 'User' } }); console.log('seed done'); }
main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
