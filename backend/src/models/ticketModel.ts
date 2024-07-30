
import mongoose, { Schema } from "mongoose"

const ticketSchema = new Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, },
  description: { type: String, required: true},
  status: { 
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Added for cloud management
    expires: 1800
  }
})

const ticketModel = mongoose.model('Ticket', ticketSchema)

export default ticketModel