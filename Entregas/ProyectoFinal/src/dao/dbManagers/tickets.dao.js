import ticketModel from './models/ticket.model.js';

export default class TicketsDao {
  constructor() {
    console.log('Working Tickets with DB');
  }

  async addNewTicket(ticketData) {
    const ticket = new ticketModel(ticketData);
    return ticket.save();
  }

  async getTickets() {
    return ticketModel.find();
  }

  async getTicketsById(ticketId) {
    return ticketModel.findById(ticketId);
  }

  async getTicketsByUserId(userId) {
    return ticketModel.findOne({ userId });
  }

  async addProductToTicket(ticketId, productId) {
    return ticketModel.findByIdAndUpdate(ticketId, { $push: { products: productId } });
  }

  async removeProductFromTicket(ticketId, productId) {
    return ticketModel.findByIdAndUpdate(ticketId, { $pull: { products: productId } });
  }

  async updateTicket(ticketId, products) {
    return ticketModel.findByIdAndUpdate(ticketId, { $set: { products } });
  }

  async saveTicket(ticket) {
    return ticketModel.create(ticket);
  }

  async deleteTicket(ticketId) {
    return ticketModel.findByIdAndDelete(ticketId);
  }

  async deleteAllTickets() {
    return ticketModel.deleteMany();
  }
}