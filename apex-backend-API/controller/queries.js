const { queries_form } = require("../db/db.js");


exports.addQueries = async (req, res) => {
    try {
    console.log(req.body);
    const recaptchaToken = req.body.recaptchaToken;
              
    if (!recaptchaToken) {
        return res.status(400).send({ message: 'Missing reCAPTCHA token' });
    }
          
    const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
        }),
    });
          
    const verificationData = await verificationResponse.json();

    // console.log("verify",verificationData)
          
    if (!verificationData.success) {
        return res.status(400).send({ message: 'Invalid reCAPTCHA token' });
    }
      
        const contact = await queries_form.create({
            name: req.body.name,
            email: req.body.email,
            country_code: req.body.country_code,
            phone: req.body.phone,
            company_name: req.body.company_name
        })
       return res.status(200).send({ status: 200, message: "Contact Added Successfully" });


        

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }

}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//GET ALL CONTACTS
exports.getQueries = async (req, res) => {
    try {
        const contacts = await queries_form.findAll();
        if (!contacts) {
            return res.status(400).json({ msg: "No Contact Found" });
        }
        return res.status(200).json(contacts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
//DELETE A CONTACT
exports.deleteQueries = async (req, res) => {
    try {
        const contact = await queries_form.destroy({ where: { id: req.params.id } });
        if (!contact) {
            return res.status(400).json({ msg: 'No Contact with this ID' });
        }
        return res.status(200).json(contact);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
}
