import { Tickets } from "../dao/factory.js";

export default class TicketsRepository {
  constructor() {
    this.ticketsDao = new Tickets();
  }

  getAll = async () => {
    const tickets = await this.ticketsDao.getTickets();
    return tickets;
  }

  getById = async (ticketId) => {
    const ticket = await this.ticketsDao.getTicketsById(ticketId);
    return ticket;
  }

  getByUserId = async (userId) => {
    const ticket = await this.ticketsDao.getTicketsByUserId(userId);
    return ticket;
  }

  addProduct = async (ticketId, productId) => {
    const result = await this.ticketsDao.addProductToTicket(ticketId, productId);
    return result;
  }

  removeProduct = async (ticketId, productId) => {
    const result = await this.ticketsDao.removeProductFromTicket(ticketId, productId);
    return result;
  }

  updateTicket = async (ticketId, products) => {
    const result = await this.ticketsDao.updateTicket(ticketId, products);
    return result;
  }

  saveTicket = async (ticket) => {
    const result = await this.ticketsDao.saveTicket(ticket);
    return result;
  }

  deleteTicket = async (ticketId) => {
    const result = await this.ticketsDao.deleteTicket(ticketId);
    return result;
  }

  deleteAllTickets = async () => {
    const result = await this.ticketsDao.deleteAllTickets();
    return result;
  }
}

