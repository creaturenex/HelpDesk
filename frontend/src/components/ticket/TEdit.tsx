import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import formatDateToUTC from "@/utils/formatDate";
import { ExistingTicketFormValues, TicketFormValues } from "@/types/types";

export default function TEdit() {
  const [ticket, setTicket] = useState<ExistingTicketFormValues | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // WORK AROUND TO PARSE TICKET ID
      // need to see why tanstack router PATH PARAMS NOT WORKING
      const url = new URL(document.location.href);
      const ticketid = url.pathname.slice(8, -5);
      const response = await fetch(`/api/ticket/${ticketid}`, {
        credentials: "include",
      });
      const data = await response.json();
      setTicket({
        ...data,
        // Human readable date format
        createdAt: formatDateToUTC(data.createdAt.toString()),
      });
    };
    fetchData();
  }, []);

  const handleSubmit = async (values: TicketFormValues) => {
    if (!ticket || ticket._id) {
      console.error("Ticket ID is not defined");
      return
    }
    const response = await fetch(`/api/ticket/${ticket._id}/edit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      credentials: "include",
    });
    await response.json();
  };

  if (!ticket) {
    return (
      <div className="mt-24">Error Editing Ticket</div>
      // <Card className="w-full max-w-md mx-auto bg-red-600 md:max-w-lg">
      //   <CardHeader className={`bg-[#ddd] p-4 rounded-t-md`}>
      //     <CardTitle className="flex flex-row items-center justify-between text-lg font-semibold ">
      //       Error
      //       <Badge variant="secondary">Edit</Badge>
      //     </CardTitle>
      //   </CardHeader>

      //   <CardContent className="flex p-4 space-y-4">
      //     Error editing the ticket
      //   </CardContent>
      // </Card>
    );
  }

  return (
    <TicketForm mode="edit" initialData={ticket} onSubmit={handleSubmit} />
  );
}
