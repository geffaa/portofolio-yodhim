// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// export async function POST(request: Request) {
//   console.log('Received POST request to /api/contact');
//   try {
//     const { name, email, message } = await request.json();
//     console.log('Parsed request body:', { name, email, message });

//     console.log('Attempting to save to database...');
//     const contact = await prisma.contact.create({
//       data: { name, email, message }
//     });
//     console.log('Successfully saved to database:', contact);

//     console.log('Attempting to send email...');
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.NOTIFICATION_EMAIL,
//       subject: 'New Contact Form Submission',
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
//     });
//     console.log('Email sent successfully');

//     return NextResponse.json({ message: 'Form submitted successfully', id: contact.id }, { status: 201 });
//   } catch (error) {
//     console.error('Error processing form submission:', error);
//     return NextResponse.json({ message: 'Error processing form submission', error: error.message }, { status: 500 });
//   }
// }