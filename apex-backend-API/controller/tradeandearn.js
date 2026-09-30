const {tradeandearn} = require("../db/db.js");
const transporter = require("../config/mailConfig.js");

exports.addTradeAndEarn = async (req, res) => {
    try {
const { firstname, lastname, email, country_code, phone, source,recaptchaToken } = req.body;
            
 
        const trade = await tradeandearn.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            country_code:country_code,
            phone: phone,
            source:source,
        })

         const MailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Account has been created`,
       html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; max-width: 700px;">
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5;">

            <!-- Logo -->
            <table width="100%" style="padding: 20px 0;">
            <tr>
                <td align="center">
                <img 
                    src="http://localhost:8000/images/logo.png" 
                    alt="ts Capitals Logo" 
                    style="width: 150px; height: auto; padding: 20px 0 10px;" 
                />
                </td>
            </tr>
            </table>

            <!-- Header Section -->
            <div style="
            margin: auto;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url('http://localhost:8000/images/BG.png'); 
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            color: white;
            text-align: center;
            ">
            <h2>Your Account Has Been Created Successfully!</h2>
            </div>

            <hr style="margin: 30px 0; border: 0; height: 1px; background: #ccc;" />

            <!-- Content -->
            <div style="padding: 0 20px; color: black;">
            <p>Hello,</p>

            <p style="margin-top: 20px;">
                Thank you for registering with <strong>ts Capitals</strong>.<br />
                One of our account managers will contact you shortly to assist you with 
                account activation and help you start trading as soon as possible.
            </p>

            <p style="margin-top: 40px; text-align: right;">
                — Contact Us<br />
                Phone: +44 7441914223<br />
                Email: 
                <a href="mailto:support@tscapitals.com" style="color: black;">
                support@tscapitals.com
                </a>
            </p>
            </div>

        </div>
        </body>
        </html>
        `


        };
    await transporter.sendMail(MailOptions);

    res.status(200).json({   
        status: 200,
        trade,
        message:" mail send sucessfully"
    });        

    } catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Server Error",
        });
    }

}

