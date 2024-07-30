import express, { Request, Response, NextFunction } from "express";
import ticketService from "../services/ticketService";

export async function seedTickets(req: Request, res: Response, next: NextFunction){
  try {
    const tickets = await ticketService.seedDB()
    return next()
  } catch(error: any) {
    return next({
        log: `${error}: Error in controller seedTickets`,
        msg: `Ticket not found`
      }
    )
  }
}

export async function getAllTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const tickets = await ticketService.listAll();
    res.locals.tickets = tickets;
    return next()
  } catch (error) {
    return next(error);
  }
}

export async function getTicketById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    res.locals.ticket = await ticketService.show(id);
    return next()
  } catch(error: any) {
    return next({
      log: `${error.name}: ${error.message}`,
      msg: `Ticket not found`
    });
  }
}

export async function addTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const ticketData = req.body
    res.locals.newTicket = await ticketService.create(ticketData)
    return next()
  } catch (error: any) {
    return next({
      log: `${error.name}: ${error.message}`,
      msg: `Unable to add ticket`
    });
  }
}

export async function editTicket(req: Request, res: Response, next: NextFunction) {
  try {
    
    const id = req.params.id;
    const ticketData = req.body
    console.log('EditTicketController', id, ticketData)
    res.locals.ticket = await ticketService.update(id, ticketData)
    return next()
  } catch (error: any) {
    return next({
      log: `${error.name}: ${error.message}`,
      msg: `Unable to edit ticket`
    });
  }
}