import TicketsRepository from "../repositories/tickets.repository.js";

const ticketsRepository = new TicketsRepository();

const getAll = async () => {
  const tickets = await ticketsRepository.getAll();
  return tickets;
}

const getById = async (ticketId) => {
  const ticket = await ticketsRepository.getById(ticketId);
  return ticket;
}

const getByUserId = async (userId) => {
  const ticket = await ticketsRepository.getByUserId(userId);
  return ticket;
}

const addProduct = async (ticketId, productId) => {
  const result = await ticketsRepository.addProduct(ticketId, productId);
  return result;
}

const removeProduct = async (ticketId, productId) => {
  const result = await ticketsRepository.removeProduct(ticketId, productId);
  return result;
}

const updateTicket = async (ticket) => {
  const result = await ticketsRepository.updateTicket(ticket);
  return result;
}

const saveTicket = async (ticket) => {
  const result = await ticketsRepository.saveTicket(ticket);
  return result;
}

const deleteTicket = async (ticketId) => {
  const result = await ticketsRepository.deleteTicket(ticketId);
  return result;
}

const deleteAllTickets = async () => {
  const result = await ticketsRepository.deleteAllTickets();
  return result;
}

export {
  getAll,
  getById,
  getByUserId,
  addProduct,
  removeProduct,
  updateTicket,
  saveTicket,
  deleteTicket,
  deleteAllTickets
}