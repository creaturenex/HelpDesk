export interface BaseTicketFormValues {
  name: string;
  email: string;
  description: string;
  status: "New" | "In Progress" | "Resolved";
}

export interface NewTicketFormValues extends BaseTicketFormValues {
  status: "New";
}

export interface ExistingTicketFormValues extends BaseTicketFormValues {
  _id: string;
  createdAt: string;
}

export type TicketFormValues = NewTicketFormValues | ExistingTicketFormValues;