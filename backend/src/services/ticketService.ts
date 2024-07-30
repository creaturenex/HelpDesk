/**
 * As this a service layer, no framework functionality is present
 * ie reference to req: Request or next: NextFunction in express
 * also not using Try Catch ...
 * Also uses custom Errors  ...
 */
import e from "express";
import ticketModel from "../models/ticketModel";
import { NotFoundError, ValidationError } from "../utils/errors";
import { Document, Types } from "mongoose";

interface Ticket {
  _id: string | Types.ObjectId | null | unknown; // using ObjectId for better typing and can sometimes return null
  name: string;
  email: string;
  description: string;
  status: string;
}

type TicketSeed = Omit<Ticket, "_id">;

interface ITicketService {
  tickets: TicketSeed[];
  seedDB(): Promise<Ticket[]>;
  listAll(): Promise<Ticket[]>;
  show(id: string): Promise<Ticket>;
  create(ticketData: Omit<Ticket, "id">): Promise<Ticket>;
  update(id: string, ticketData: Partial<Omit<Ticket, "id">>): Promise<Ticket>;
}

const ticketService: ITicketService = {
  tickets: [
    {
      name: "Oscar the Grouch",
      email: "ilovemytrash@sesamestreet.com",
      description:
        "Trash organization app too user-friendly. Make it more difficult and grouchy to use, please.",
      status: "In Progress",
    },
    {
      name: "Elmo",
      email: "tickleme@sesamestreet.com",
      description:
        "Elmo's video call not working. Elmo can't see friends on screen. Elmo sad.",
      status: "In Progress",
    },
    {
      name: "Big Bird",
      email: "bigfriendlybird@sesamestreet.com",
      description:
        "Nest-building software crashed. Need urgent assistance to complete my home renovation project!",
      status: "New",
    },
    {
      name: "Cookie Monster",
      email: "cookielover@sesamestreet.com",
      description:
        "Me computer not showing cookies! Need help finding cookie images for important presentation on snacks.",
      status: "New",
    },
    {
      name: "Bert",
      email: "pigeonlover@sesamestreet.com",
      description:
        "Urgent! My digital pigeon-watching binoculars app is showing seagulls instead. This is unacceptable!",
      status: "Resolved",
    },
    {
      name: "Oscar",
      email: "oscar@test.com",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec odio tortor, tincidunt at nisi eget, feugiat venenatis elit. Integer euismod risus et ante congue, sed semper lorem sagittis. Morbi in mauris sit amet mi suscipit vestibulum non non purus. Mauris suscipit pretium volutpat. Ut non congue diam, sed molestie lectus. Morbi id aliquet purus, id volutpat ipsum. Curabitur vestibulum ut orci in iaculis. Quisque sollicitudin tincidunt sapien, non gravida risus convallis ut. Fusce placerat rhoncus vehicula. Proin pharetra est ultricies auctor suscipit. Duis sit amet libero non lectus venenatis tempus. Sed interdum enim nec turpis finibus sagittis.

Etiam elementum risus tortor, eu faucibus odio sollicitudin et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis diam nulla. Aenean ac ipsum id est porttitor molestie in eu urna. Praesent auctor dui nec metus dapibus, et lacinia purus imperdiet. Suspendisse vel tempor nisi. Morbi imperdiet diam nisi, eget volutpat enim sollicitudin ut. Quisque lacus erat, bibendum ut fermentum vel, dictum in quam. Curabitur faucibus et urna sit amet efficitur. Donec ac ex quis purus euismod mattis et eu arcu. Nam vel libero venenatis, volutpat lorem in, tincidunt ipsum. Duis aliquet, mi non dapibus ullamcorper, arcu magna bibendum mi, vitae fermentum lectus nisi id tortor.

Quisque consequat, elit porta consectetur tincidunt, felis neque gravida nunc, quis pulvinar sapien lectus eget metus. Integer et pretium sem, ut efficitur libero. Mauris non sapien justo. Curabitur nulla neque, vestibulum sit amet dignissim vel, mattis eu justo. Suspendisse fringilla pretium est nec aliquam. Suspendisse ullamcorper at ex eget tincidunt. Donec rutrum aliquet nulla, et elementum nisi vestibulum eu. Nullam tristique, libero et interdum ultrices, enim mauris semper quam, nec luctus libero metus non quam. Morbi elementum et libero euismod interdum. Vivamus eu porta risus, et convallis leo.

In ornare risus sed ante malesuada, eget egestas orci ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed commodo elit mauris, et mollis enim posuere ut. Pellentesque rhoncus, nunc et vestibulum lobortis, purus sem vulputate urna, posuere tincidunt arcu mi nec ante. Cras nec nibh porta, porta risus euismod, egestas lorem. Nam eu bibendum massa. Aliquam erat volutpat. Nulla ut vestibulum diam. Vivamus ex tellus, ullamcorper quis interdum eu, aliquam vitae nunc. Sed vitae placerat enim.

Ut vel fermentum libero. Donec et facilisis libero. Nullam faucibus vitae tellus ac egestas. Vestibulum porttitor, nulla sit amet dictum accumsan, nunc felis mollis massa, in dictum urna justo ut eros. Nullam sit amet ligula at lectus placerat rutrum vitae nec tellus. Duis scelerisque maximus felis nec blandit. Nunc egestas tincidunt sapien, tristique tempor purus. Sed iaculis in justo vel sodales. Proin sit amet ex purus. Curabitur eget venenatis risus, nec vehicula urna. Donec a rhoncus nibh, et condimentum risus.

Curabitur vel porttitor risus. Proin auctor leo neque, nec sodales dolor auctor ac. Ut vestibulum enim ullamcorper faucibus consequat. Ut scelerisque nunc a justo consectetur, ut bibendum ipsum ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla auctor tortor ut porta tincidunt. Nam in dictum leo. Ut non elit luctus, ullamcorper ligula in, luctus augue. Sed auctor sagittis tristique. Phasellus quam nunc, commodo et suscipit elementum, tincidunt ac purus. Donec eget elit nec dui tristique vulputate. Nam fermentum ullamcorper lacus. Integer laoreet, dui eu tempus placerat, tellus dolor feugiat leo, et dapibus sem turpis in ligula. Sed faucibus, felis ac porttitor aliquam, tortor mi bibendum metus, quis sollicitudin velit neque et massa. Vivamus maximus sed velit ac fermentum.

Integer ultricies rutrum ullamcorper. Nunc commodo, odio eget aliquet tincidunt, ligula nisl efficitur nisi, et cursus metus magna et nibh. Aliquam venenatis ultricies elit at ullamcorper. Sed tempor erat quis metus auctor, non fringilla dui venenatis. Nunc felis massa, tempor id pellentesque volutpat, finibus eget urna. Donec dictum eget lectus eu egestas. Aliquam quis nisl massa. Suspendisse fermentum tincidunt lectus in elementum. Morbi dapibus odio sed eros tincidunt, ut facilisis nisi maximus. Pellentesque ultrices orci justo, eu pulvinar turpis rhoncus ut. Maecenas sagittis suscipit odio sed viverra. Maecenas a urna ut tortor suscipit tincidunt a vitae diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce erat ex, tincidunt non enim vel, fringilla bibendum diam. Vivamus eu ultricies massa, in dignissim risus. Donec egestas id lorem vehicula pharetra.

Aenean non arcu eget arcu placerat tempor ut vitae mi. Donec eu nisi aliquam, varius nisl at, cursus erat. Maecenas nec neque at odio dignissim interdum. Ut lobortis nec ante vel euismod. Donec tempus volutpat odio ac vestibulum. Maecenas dignissim eget ipsum gravida congue. Donec euismod, metus nec accumsan vulputate, justo ipsum euismod mi, vitae eleifend mauris mi nec erat. Nunc ac placerat sem, eu bibendum massa. Aenean massa orci, consequat nec posuere ac, interdum quis libero.

Aliquam eu molestie est, sit amet sagittis velit. Proin maximus congue commodo. Etiam sit amet dignissim mi, dictum lacinia mauris. In tristique diam at purus viverra interdum. Vivamus vehicula ullamcorper bibendum. Aliquam ac diam id nunc pharetra pulvinar. Praesent vestibulum lacinia eros id semper. Vivamus vestibulum nunc a odio luctus dapibus. Donec sapien lectus, feugiat volutpat mi quis, maximus pellentesque leo.

Fusce vitae ultricies enim. Donec euismod ac erat non laoreet. Sed orci nunc, suscipit vel orci auctor, blandit fringilla nisi. Integer rutrum blandit tincidunt. Aliquam eget tempus leo. Pellentesque egestas viverra congue. Fusce maximus massa velit, ut suscipit tortor condimentum eget.
`,
      status: "In Progress"
},
  ],

  async seedDB(): Promise<Ticket[]> {
    const existingTickets = await ticketModel.find();
    
    if (existingTickets.length === 0) {
      const seededTickets = await ticketModel.insertMany(this.tickets);
      return seededTickets.map((ticket) => ticket.toObject());
    }
    
    return existingTickets.map((ticket) => ticket.toObject());
  },

  async listAll(): Promise<Ticket[]> {
    return await ticketModel.find();
  },

  async show(id: string): Promise<Ticket> {
    const ticket = await ticketModel.findById(id);
    if (!ticket) {
      throw new NotFoundError(`Ticket with id: ${id} not found`);
    }
    return ticket;
  },

  async create(ticketData: Omit<Ticket, "id" | "createdAt">): Promise<Ticket> {
    if (!ticketData.name || !ticketData.email) {
      throw new ValidationError("Name and email are required");
    }
    return await ticketModel.create(ticketData);
  },

  async update(
    id: string,
    ticketData: Partial<Omit<Ticket, "id">>
  ): Promise<Ticket> {
    const updatedTicket = await ticketModel.findByIdAndUpdate(id, ticketData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTicket) {
      throw new NotFoundError(`Ticket with id ${id} not found`);
    }
    return updatedTicket;
  },
};

export default ticketService;