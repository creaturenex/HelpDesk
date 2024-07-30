import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { TableRow, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import getStatusClassColor from "@/utils/statusColor";

interface TicketData {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function TicketRow({ ticket }:{ ticket: TicketData}) {
  return (
    <TableRow>
      <TableCell>
        <Link
          to="/ticket/$id"
          params={{
            id: ticket._id,
          }}
        >
          {ticket._id}
        </Link>
      </TableCell>

      <TableCell className={getStatusClassColor(ticket.status)}>
        <Link
          to="/ticket/$id"
          params={{
            id: ticket._id,
          }}
        >
          {ticket.status}
        </Link>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Textarea
          readOnly
          className="min-h-[60px] max-h-[90px] overflow-auto"
          value={ticket.description}
        />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        {" "}
        <Link
          to="/ticket/$id"
          params={{
            id: ticket._id,
          }}
        >
          {ticket.name}
        </Link>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Link
          to={`/ticket/${ticket._id}/edit`}
          params={{
            id: ticket._id,
          }}
        >
          <Button variant={"outline"}>
            <Edit />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
