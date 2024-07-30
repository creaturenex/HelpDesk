interface TicketData {
  _id: string;
  name: string;
  email: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function emailUser(ticket: TicketData) {
 const email = `
----------------------------------------------------------------------------------

From: admin@help.desk.com
To: ${ticket.email}  
Subject: Ticket # ${ticket._id}: Your Issue/Request Has Been Registered

Dear ${ticket.name},

Thank you for contacting the IT Help Desk. We have received your issue/request and 
have created a support ticket to track its progress. Please find the details below:

Ticket Number: ${ticket.name}
Issue/Request: ${ticket.description}
Date Submitted: ${ticket.createdAt}

Our IT support team is currently reviewing your issue/request and will be in touch
with you shortly to provide assistance or gather additional information if needed.

Automated email
----------------------------------------------------------------------------------
`
  console.log(email)
}
