import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
    name: string;
    email: string;
    message: string;
    type: "recruiter" | "other";
    company?: string;
    phone?: string;
    subject?: string;
};

export const runtime = "nodejs";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<ContactPayload>;
        const { name, email, message, type, company, phone, subject } = body;

        if (!name || !email || !message || !type) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if SMTP is configured---> not configured, just log the message
        if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.log("Contact form submission:", { name, email, message, type, company, phone, subject });
            return NextResponse.json({ ok: true, message: "Message received (SMTP not configured)" });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASS!,
            },
        });

        const to = process.env.EMAIL_TO || "ubhatt2004@gmail.com";
        const from = process.env.EMAIL_FROM ?? process.env.SMTP_USER!;

        const emailSubject = type === "recruiter" 
            ? `[Recruiter] ${subject || 'Job Opportunity'} - ${company || 'Unknown Company'}`
            : `[Contact] ${subject || 'New Message'} from ${name}`;

        const htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; padding: 30px; border-radius: 12px;">
                <h2 style="color: #f59e0b; margin-bottom: 20px;">
                    ${type === "recruiter" ? "🎯 New Recruiter Inquiry" : "📬 New Contact Message"}
                </h2>
                
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 8px 0;"><strong style="color: #f59e0b;">Name:</strong> ${name}</p>
                    <p style="margin: 8px 0;"><strong style="color: #f59e0b;">Email:</strong> ${email}</p>
                    ${phone ? `<p style="margin: 8px 0;"><strong style="color: #f59e0b;">Phone:</strong> ${phone}</p>` : ''}
                    ${company ? `<p style="margin: 8px 0;"><strong style="color: #f59e0b;">Company:</strong> ${company}</p>` : ''}
                    ${subject ? `<p style="margin: 8px 0;"><strong style="color: #f59e0b;">Subject:</strong> ${subject}</p>` : ''}
                    <p style="margin: 8px 0;"><strong style="color: #f59e0b;">Type:</strong> ${type === "recruiter" ? "Recruiter" : "General Inquiry"}</p>
                </div>
                
                <div style="background: #2a2a2a; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #f59e0b; margin-top: 0;">Message:</h3>
                    <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
                </div>
                
                <p style="margin-top: 20px; font-size: 12px; color: #666;">
                    Sent from your portfolio website
                </p>
            </div>
        `;

        await transporter.sendMail({
            from,
            to,
            replyTo: email,
            subject: emailSubject,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nType: ${type}\n\nMessage:\n${message}`,
            html: htmlContent,
        });

        return NextResponse.json({ ok: true, message: "Message sent successfully!" });
    } catch (err) {
        console.error("Contact route error:", err);
        return NextResponse.json(
            { ok: false, error: "Failed to send message. Please try again." },
            { status: 500 }
        );
    }
}

