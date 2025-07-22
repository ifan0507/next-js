import { coerce, object, string, array } from "zod";

export const ContactSchema = object({
  name: string().min(6, "Name at lates 6 characters"),
  email: string().min(6, "Email at lates 6 characters").email("Please enter a valid email"),
  subject: string().min(6, "Subject at latest 6 characters"),
  message: string().min(50, "Message at latest 50 characters").max(200, "Message maximum 200 characters"),
});

export const RoomSchema = object({
  name: string().min(1, "Room Name is Required."),
  description: string().min(50, "Description at latest 50 characters."),
  capacity: coerce.number().gt(0, "Capacity is Required."),
  price: coerce.number().gt(0, "Price is Required."),
  amenities: array(string()).nonempty("Amenities is Selected"),
});
