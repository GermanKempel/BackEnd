import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: uuidv4
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  totalPrice: {
    type: Number,
  },
  purchaser: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts',
      required: true
    }
  }
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;