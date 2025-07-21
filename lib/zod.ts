import { object, string } from "zod";

export const ContactSchema = object({
  name: string().min(6, "Name at lates 6 characters"),
  email: string().min(6, "Email at lates 6 characters").email("Please enter a valid email"),
  subject: string().min(6, "Subject at latest 6 characters"),
  message: string().min(50, "Message at latest 50 characters").max(200, "Message maximum 200 characters"),
});
