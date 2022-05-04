const PASSWORD = process.env.EMAIL_PASS;

export default function (req, res) {
    let nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.porkbun.com",
        auth: {
          user: 'contact@fireplank.xyz',
          pass: PASSWORD,
        },
        tls: {
            ciphers:'SSLv3'
        },
        secureConnection: false
    });

    const mailData = {
        from: 'Contact Form <contact@fireplank.xyz>',
        to: 'contact@fireplank.xyz',
        subject: `Message from '${req.body.name}'`,
        text: req.body.message + " | Sender email: " + req.body.email,
        html: `<p>Sender email: ${req.body.email}</p><br/><div>${req.body.message}</div>`
      }

    transporter.sendMail(mailData, function (err, info) {
        if(err) {
            console.log(err);
            return res.status(500).json({ message: err });
        }
    })
    res.status(200).end();
  }

// get static side props
export async function getStaticProps() {
    
}