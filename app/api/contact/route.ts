import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.email(),
  subject: z.string().min(1),
  projectType: z.string().min(1),
  budgetRange: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    console.log("Contact message:", data);
    // TODO: Integrate email service (Resend, Nodemailer, etc.) here.
    return Response.json({ success: true, message: "Message received!" });
  } catch {
    return Response.json({ success: false, message: "Something went wrong" }, { status: 400 });
  }
}
