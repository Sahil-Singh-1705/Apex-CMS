const { ticket } = require("../db/db");
const transporter = require("../config/mailConfig")
exports.createTicket = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const newTicket = await ticket.create({ 
        email,
        subject, 
        message });

        const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Ticket Received: ${subject}`,
        html: `
            <p>Hello Admin,</p>
            <p>A new support ticket has been submitted:</p>
            <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Please take necessary action.</p>
            <p>– Support System</p>
        `
        };
    await transporter.sendMail(adminMailOptions);
    res.status(200).json({   
        status: 200,
        newTicket,
        message:"ticket generated sucessfully"
    });
  } catch (err) {
    console.error("Create Ticket Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticket.findAll();
        if (!tickets) {
        return res.status(400).json({ msg: "No tickets Found" });
    }
    res.status(200).json({
        status: 200,
        tickets
    });
  } catch (err) {
    console.error("Fetch Tickets Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const existingTicket = await ticket.findByPk(id);
    if (!existingTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    existingTicket.status = status;
    await existingTicket.save();

    res.status(200).json({ message: "Status updated", ticket: existingTicket });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};