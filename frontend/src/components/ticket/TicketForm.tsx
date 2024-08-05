import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import RotateLoader from "react-spinners/RotateLoader";
import { ExistingTicketFormValues, TicketFormValues } from "@/types/types";

const ticketFormSchema = z.object({
  _id: z.string().optional(), // Not present for new ticket
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  status: z.enum(["New", "In Progress", "Resolved"]), // defaults to new in new ticket
  createdAt: z.string().optional(), // not present for new ticket 
}).refine(data => {
  if (data._id && data.status) {
    return true; // Valid for edit mode
  }
  return !data._id; // Valid for new mode
}, {
  message: "ID is required for editing tickets.",
  path: ["_id"],
});

interface TicketFormProps {
  mode: "show" | "edit" | "new";
  initialData?: ExistingTicketFormValues;
  onSubmit?: (values: TicketFormValues) => Promise<void>;
}

export default function TicketForm({
  mode,
  initialData,
  onSubmit,
}: TicketFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: mode === 'new' 
    ? { name: '', email: '', description: '', status: 'New' }
    : initialData,
  });

  const isReadOnly = mode === "show";

  const handleSubmit = async (values: TicketFormValues ) => {
    if (onSubmit) {
      setLoading(true);
      try {
        await onSubmit(values);
        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return <SubmitResult mode={mode} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-24">
        <RotateLoader />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto md:max-w-lg bg-gray-50">
      <CardHeader className={`bg-[#ddd] p-4 rounded-t-md`}>
        <CardTitle className="flex flex-row items-center justify-between text-lg font-semibold ">
          {mode === "new"
            ? "Submit a New Ticket"
            : `Ticket # ${initialData?._id}`}
          <Badge variant="secondary">
            {mode === "show" ? "View" : mode === "edit" ? "Edit" : "New"} Mode
          </Badge>
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                        {...field}
                        readOnly={isReadOnly}
                        className={
                          isReadOnly
                            ? "pl-0 font-medium bg-transparent border-none"
                            : ""
                        }
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
                        {...field}
                        readOnly={isReadOnly}
                        className={
                          isReadOnly
                            ? "pl-0 font-medium bg-transparent border-none"
                            : ""
                        }
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
                      {...field}
                      readOnly={isReadOnly}
                      className={
                        isReadOnly
                          ? "pl-0 font-medium bg-transparent border-none"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode !== "new" && (
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
                          {...field}
                          readOnly
                          className="font-medium bg-transparent border-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Status</FormLabel>
                      {mode === "edit" ? (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="In Progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <FormControl>
                          <div
                            className={`p-2 rounded font-medium ${
                              field.value === "New"
                                ? "bg-blue-200 text-blue-600"
                                : field.value === "In Progress"
                                  ? "bg-amber-300 text-amber-600"
                                  : "bg-green-200 text-green-600"
                            }`}
                          >
                            {field.value}
                          </div>
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {mode === "edit" && (
              <>
                <Button variant="ghost" onClick={() => history.back()}>
                  Cancel
                </Button>
                <Button type="submit" variant="outline">
                  {loading ? "Saving..." : "Save"}
                </Button>
              </>
            )}
            {mode === "new" && <Button type="submit">Submit Ticket</Button>}
            {mode === "show" && (
              <Link to={`/ticket/${initialData?._id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

const SubmitResult = ({ mode }: { mode: "show" | "edit" | "new" }) => {
  return (
    <Card className="w-full max-w-md mx-auto md:max-w-lg">
      <CardHeader>
        <CardTitle>
          {mode === "new" ? "Ticket Created" : "Ticket Updated"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Your ticket has been successfully{" "}
          {mode === "new" ? "submitted" : "updated"}.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="secondary" className="mr-2">
          <Link to="/tickets">Tickets</Link>
        </Button>
        <Button>
          <Link to="/">Home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
