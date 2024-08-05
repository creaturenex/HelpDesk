import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import formatDateToUTC from "@/utils/formatDate";
import { ExistingTicketFormValues } from "@/types/types";

export default function TShow() {
  const [ticket, setTicket] = useState<ExistingTicketFormValues | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(document.location.href);
      const ticketid = url.pathname.slice(8);
      const response = await fetch(`/api/ticket/${ticketid}`, {
        credentials: "include",
      });
      const data = await response.json();
      setTicket({
        ...data,
        createdAt: formatDateToUTC(data.createdAt.toString()),
      } as ExistingTicketFormValues);
    };
    fetchData();
  }, []);

  if (!ticket) return null;

  return <TicketForm mode="show" initialData={ticket} />;
}
