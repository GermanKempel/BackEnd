import * as ticketService from "../services/tickets.service.js";
import * as cartService from "../services/carts.service.js";
import logger from "../utils/loggers.js";

const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getAll();
    res.send({ status: "success", tickets });
  } catch (error) {
    logger.info("Error trying to get all tickets", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const ticket = await ticketService.getById(ticketId);
    res.send({ status: "success", ticket });
  } catch (error) {
    logger.info("Error trying to get ticket by id", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const getTicketByUserId = async (req, res) => {
  try {
    const userId = req.params.uid;
    const ticket = await ticketService.getByUserId(userId);
    res.send({ status: "success", ticket });
  } catch (error) {
    logger.info("Error trying to get ticket by user id", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const addProductToTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const productId = req.params.pid;
    const result = await ticketService.addProduct(ticketId, productId);
    if (result && result.failedProducts && result.failedProducts.length > 0) {
      const cart = await cartService.findById(ticketId);
      const remainingItems = cart.items.filter(item => !result.failedProducts.includes(item.productId));
      cart.items = remainingItems;
      await cart.save();
    }
    res.send({ status: "Product added to ticket succesfully", result });
  } catch (error) {
    logger.info("Error trying to add product to ticket", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const removeProductFromTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const productId = req.params.pid;
    const result = await ticketService.removeProduct(ticketId, productId);
    res.send({ status: "Product removed from ticket successfully", result });
  } catch (error) {
    logger.info("Error trying to remove product from ticket", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const productId = req.body.pid;
    const result = await ticketService.updateTicket(ticketId, productId);
    res.send({ status: "Ticket updated successfully", result });
  } catch (error) {
    logger.info("Error trying to update ticket", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const saveTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const result = await ticketService.saveTicket(ticketId);
    res.send({ status: "Ticket saved successfully", result });
  } catch (error) {
    logger.info("Error trying to save ticket", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.tid;
    const result = await ticketService.deleteTicket(ticketId);
    res.send({ status: "Ticket deleted successfully", result });
  } catch (error) {
    logger.info("Error trying to delete ticket", error);
    res.status(500).send({ status: "error", message: error.message });
  }
}

const deleteAllTickets = async (req, res) => {
  try {
    const result = await ticketService.deleteAllTickets();
    res.send({ status: "All tickets deleted successfully", result });
  } catch (error) {
    logger.info("Error trying to delete all tickets", error);
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