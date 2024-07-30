import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import TicketRow from "./TicketRow";

export default function Tickets() {
  const [, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {

    async function fetchTickets() {
      try {
        const response = await fetch("/api/tickets", {
          credentials: 'include',
        });
        const data = await response.json();
        setTickets(data);
      } catch (error: unknown) {
        console.error("Error fetching all tickets", error);
      }
    }
    
    setLoading(true);
    fetchTickets();
    setLoading(false);
  }, []);

  return (
    <Card className="mt-8 md:mt-0">
      <CardHeader>
        <CardTitle>Support Ticket Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Help Desk Tickets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ticket #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden text-center md:table-cell">
                Name
              </TableHead>
              <TableHead className="hidden md:table-cell"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket, i) => (
                <TicketRow key={i} ticket={ticket} />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
