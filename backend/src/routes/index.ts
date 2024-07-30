import express, { Request, Response, Router, NextFunction } from 'express';
import { getAllTickets, getTicketById, addTicket, editTicket, seedTickets } from '../controllers/ticketController';
import { login, authenticateAdmin, logout } from '../controllers/authController';

export default (function router(): Router {
  const router = express.Router();

  // Public Routes
  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json('Help Desk')
    } catch (error: any){
      return next({
        log: `Error in router '/' - ${error.name}: ${error.message}`,
        msg: 'Resource not found'
      })
    }
  })

  router.post('/login', login);
  router.post('/logout', logout);

  // Add new
  router.put('/api/ticket/new', addTicket, (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(res.locals.newTicket)
    } catch(error: any) {
      return next({
        log: `Error in router '/ticket/new' - ${error.name}: ${error.message}`,
        msg: 'Resource unable to be added'
      });
    }
  })


  // Protected Routes
  router.use(authenticateAdmin);

  router.get('/api/tickets', seedTickets, getAllTickets, function(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(res.locals.tickets)
    } catch(error: any) {
      return next({
        log: `Error in router 'tickets' - ${error.name}: ${error.message}`,
        msg: 'Resource not found'
      })
    }
  });

  router.get('/api/ticket/:id', getTicketById, function(_req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(res.locals.ticket)
    } catch(error: any) {
      return next({
        log: `Error in router '/ticket/:id' - ${error.name}: ${error.message}`,
        msg: 'Resource not found'
      });
    }
  });

  router.post('/api/ticket/:id/edit', editTicket, (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json(res.locals.ticket)
    } catch(error: any) {
      return next({
        log: `Error in router 'ticket/:id/edit' - ${error.name}: ${error.message}`,
        msg: 'Resource unable to be edited'
      })
    }
  })

  return router;
})();

