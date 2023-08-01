import * as ticketService from "../services/tickets.service.js";
import * as cartService from "../services/carts.service.js";

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAll();
    res.send({ status: "success", tickets });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const ticket = await ticketService.getById(ticketId);
    res.send({ status: "success", ticket });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const getTicketByUserId = async (req, res) => {
  try {
    const userId = req.params.uid;
    const ticket = await ticketService.getByUserId(userId);
    res.send({ status: "success", ticket });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const addProductToTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    if (!ticketId) {
      throw new Error("Ticket not found");
    }
    const productId = req.params.pid;
    if (!productId) {
      throw new Error("Product not found");
    }
    const result = await ticketService.addProduct(ticketId, productId);
    if (result && result.failedProducts && result.failedProducts.length > 0) {
      const cart = await cartService.findById(ticketId);
      const remainingItems = cart.items.filter(item => !result.failedProducts.includes(item.productId));
      cart.items = remainingItems;
      await cart.save();
    }
    res.send({ status: "Product added to ticket succesfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const removeProductFromTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    if (!ticketId) {
      throw new Error("Ticket not found");
    }
    const productId = req.params.pid;
    if (!productId) {
      throw new Error("Product not found");
    }
    const result = await ticketService.removeProduct(ticketId, productId);
    res.send({ status: "Product removed from ticket successfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    if (!ticketId) {
      throw new Error("Ticket not found");
    }
    const products = req.body.products;
    if (!products) {
      throw new Error("Products not found");
    }
    const result = await ticketService.updateTicket(ticketId, products);
    res.send({ status: "Ticket updated successfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const saveTicket = async (req, res) => {
  try {
    const ticket = req.body;
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const result = await ticketService.saveTicket(ticket);
    res.send({ status: "Ticket saved successfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    if (!ticketId) {
      throw new Error("Ticket not found");
    }
    const result = await ticketService.deleteTicket(ticketId);
    res.send({ status: "Ticket deleted successfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteAllTickets = async (req, res) => {
  try {
    const result = await ticketService.deleteAllTickets();
    res.send({ status: "All tickets deleted successfully", result });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
}

export {
  getAllTickets,
  getTicketById,
  getTicketByUserId,
  addProductToTicket,
  removeProductFromTicket,
  updateTicket,
  saveTicket,
  deleteTicket,
  deleteAllTickets
}