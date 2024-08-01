import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import formatDateToUTC from "@/utils/formatDate";

export default function TEdit() {
  const [ticket, setTicket] = useState(null)

  useEffect( () => {
    const fetchData = async () => {
      // WORK AROUND TO PARSE TICKET ID
      // need to see why tanstack router PATH PARAMS NOT WORKING 
      const url = new URL(document.location.href)
      const ticketid = url.pathname.slice(8, -5)
      const response = await fetch(`/api/ticket/${ticketid}`, {
        credentials: "include",
      })
      const data = await response.json()
      setTicket({
        ...data,
        // Human readable date format
        createdAt: formatDateToUTC(data.createdAt.toString())
      })
    }
    fetchData()
  }, [])

  const handleSubmit = async (values) => {
    const response = await fetch(`/api/ticket/${ticket._id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    })
    await response.json()
  }

  if (!ticket) return null;

  return (
    <TicketForm mode="edit" initialData={ticket} onSubmit={handleSubmit} />
  )
}