import TicketForm from "./TicketForm"
import emailUser from "@/utils/sendEmail";

export default function TNew() {
  const handleSubmit = async (values) => {
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