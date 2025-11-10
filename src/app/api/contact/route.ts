import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { contacts } from "@/db/schema";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, organization, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Insert contact into database
    await db.insert(contacts).values({
      name,
      email,
      org: organization || null,
      subject,
      message,
    });

    // Send email notification to emmanuel@earesearch.net
    if (process.env.RESEND_API_KEY && resend) {
      try {
        await resend.emails.send({
          from: "E.A Research <noreply@earesearch.net>",
          to: "emmanuel@earesearch.net",
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ""}
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br />")}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">This message was sent via the E.A Research contact form.</p>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
