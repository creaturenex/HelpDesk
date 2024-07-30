import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
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

import formatDateToUTC from "@/utils/formatDate";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

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
  _id: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional()
});

export default function TicketT() {
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [id, setId] = useState("")

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
        // WORKAROUND TO TAN STACK ROUTER - PATH PARAMS
        const url = new URL(document.location.href);
        const ticketid = url.pathname.slice(8);
        setId(ticketid)
        const response = await fetch(`/api/ticket/${ticketid}`, {
          credentials: 'include',
        });
        const data: TicketData = await response.json();
        setTicket(data);
        reset({
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

  return (
    <>
      <Card className="w-full max-w-md mx-auto md:max-w-lg bg-gray-50">
        {" "}
        <CardHeader className={`bg-[#ddd] p-4 rounded-t-md`}>
          <CardTitle className="flex flex-row items-center justify-between text-lg font-semibold ">
            <span className="text-lg font-semibold">
              Ticket # {ticket?._id}
            </span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">View Mode</Badge>{" "}
              <Link
                to={`/ticket/${id}/edit`}
                params={{
                  id: ticket?._id,
                }}
              >
                <Button variant={"outline"}>
                  <Edit />
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form aria-readonly>
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
                          readOnly
                          defaultValue={ticket?.name}
                          {...field}
                          className="pl-0 font-medium bg-transparent border-none"
                        />
                      </FormControl>
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
                          readOnly
                          defaultValue={ticket?.email}
                          {...field}
                          className="pl-0 font-medium bg-transparent border-none"
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
                        readOnly
                        defaultValue={ticket?.description}
                        {...field}
                        className="pl-0 font-medium bg-transparent border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Created On
                      </FormLabel>
                      <FormControl>
                        <Input
                          readOnly
                          defaultValue={formatDateToUTC(ticket?.createdAt?.toString() ?? '')}
                          {...field}
                          className="font-medium bg-transparent border-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={() => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status</FormLabel>
                      <FormControl>
                        <div
                          className={`p-2 rounded font-medium ${
                            ticket?.status === "New"
                              ? "bg-blue-200 text-blue-600"
                              : ticket?.status === "In Progress"
                                ? "bg-amber-300 text-amber-600"
                                : "bg-green-200 text-green-600"
                          }`}
                        >
                          {ticket?.status}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
