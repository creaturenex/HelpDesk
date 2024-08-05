import TicketForm from "./TicketForm"
import emailUser from "@/utils/sendEmail";
import { TicketFormValues } from "@/types/types";

export default function TNew() {
  const handleSubmit = async (values: TicketFormValues) => {
    const response = await fetch("/api/ticket/new", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const ticket = await response.json();
    emailUser(ticket);
  };

  return (
    <TicketForm mode="new" onSubmit={handleSubmit}/>
  )
}