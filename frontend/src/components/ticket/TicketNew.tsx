import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailUser from "@/utils/sendEmail";
import RotateLoader from "react-spinners/RotateLoader";

import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button, ButtonGroup } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});

export default function TicketNew() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/ticket/new", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      });
      const ticket = await response.json();
      setSubmitted(true);
      emailUser(ticket);
    } catch (error) {
      console.log("Error Submitting Ticket in TicketNew.tsx", error);
    }
  }

  return submitted ? (
    <SubmitResult />
  ) : loading ? (
    <div className="flex items-center justify-center">
      <RotateLoader />
    </div>
  ) : (
    <Card className="w-full max-w-md mx-auto md:max-w-lg">
      <CardHeader className="bg-[#ddd] p-4 rounded-t-md">
        <CardTitle>Submit a New Ticket</CardTitle>
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe the issue you are having."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Submit Ticket</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

const SubmitResult = () => {
  return (
    <Card className="w-full max-w-md mx-auto md:max-w-lg ">
      <CardHeader>
        <CardTitle>Ticket Created</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription>
          Your ticket # has been successfully submitted.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <ButtonGroup>
          <Button className="rounded-r-none" variant={"secondary"} onClick={() => window.location.reload()}>
            <Link>New Ticket</Link>
          </Button>
          <Button className="border rounded-l-none" >
            <Link to="/">Home</Link>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
