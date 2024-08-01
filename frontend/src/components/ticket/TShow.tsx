import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import formatDateToUTC from "@/utils/formatDate";

export default function TShow() {
  const [ticket, setTicket] = useState(null);

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
      });
    };
    fetchData();
  }, []);

  if (!ticket) return null;

  return <TicketForm mode="show" initialData={ticket} />;
}
