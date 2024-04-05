const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userModel = require("./userModel")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
dotenv.config();
const MongoDb = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("connected to the database")
    } catch (error) {
        console.log('error', error)
    }
}
//defining application 
const app = express();


// connect to the data base 
MongoDb();

//importing routes 


// middlewares 
app.use(cors());
app.use(express.json());




// app.use(errorMiddleWare);


const PORT = process.env.PORT || 8080

//listen
app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: `babu ,<${email}>`,
            to: process.env.TOEMAIL, // Your email address
            subject: `Message from ${email}`,
            text: `Email: ${email}\n\nMessage: ${message}`,
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send message. Please try again later.');
    }
});





app.listen(PORT, () => {
    console.log(`backend started at ${PORT}`)
})