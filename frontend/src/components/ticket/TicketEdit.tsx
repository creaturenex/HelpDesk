import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import formatDateToUTC from "@/utils/formatDate";
import { Link } from "@tanstack/react-router";
import { Button, ButtonGroup } from "../ui/button";
import RotateLoader from "react-spinners/RotateLoader";
import { Badge } from "@/components/ui/badge";

interface TicketData {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: string;
  createdAt: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  status: z.string(),
  _id: z.string(),
  createdAt: z.string().optional(),
});

export default function TicketEdit() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [id, setId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      name: "",
      email: "",
      description: "",
      createdAt: "",
      status: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // WORKAROUND TO TAN STACK ROUTER
        const url = new URL(document.location.href);
        const ticketid = url.pathname.slice(8, -5);
        setId(ticketid);
        const response = await fetch(`/api/ticket/${ticketid}`, {
          credentials: "include",
        });
        const data: TicketData = await response.json();
        setTicket(data);
        reset({
          _id: data._id,
          name: data.name,
          email: data.email,
          description: data.description,
          createdAt: formatDateToUTC(data.createdAt.toString()),
          status: data.status,
        });
      } catch (error) {
        console.log("Error fetching from backend", error);
      }
    };
    fetchData();
  }, [reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      // Create a new object with only the necessary fields
      const { _id, name, email, description, status } = values; // Destructure the needed fields
      const safeValues = { _id, name, email, description, status }; // Create a new object
      const response = await fetch(`/api/ticket/${id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safeValues),
        credentials: "include", // Use the new object
      });
      await response.json();
      setSubmitted(true);
    } catch (error) {
      console.log("Error Updating Ticket in TicketEdit.tsx", error);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  }

  return submitted ? (
    <SubmitResult />
  ) : loading ? (
    <div className="flex items-center justify-center">
      <RotateLoader />
    </div>
  ) : (
    <Card className="w-full max-w-md mx-auto md:max-w-lg bg-grey-50">
      <CardHeader className={`bg-[#ddd] p-4 rounded-t-md`}>
        <CardTitle className="flex flex-row items-center justify-between text-lg font-semibold ">
          Ticket # {ticket?._id}
          <Badge variant="secondary">Edit Mode</Badge>
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Created On</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => history.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

const SubmitResult = () => {
  return (
    <Card className="w-full max-w-md mx-auto md:max-w-lg">
      <CardHeader>
        <CardTitle>Ticket Updated!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>
          Your ticket has been successfully updated.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <ButtonGroup>
          <Button className="border rounded-r-none" variant={"secondary"}>
            <Link to="/tickets">Tickets</Link>
          </Button>
          <Button className="rounded-l-none">
            <Link to="/">Home</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
