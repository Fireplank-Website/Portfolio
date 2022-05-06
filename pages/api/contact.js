const PASSWORD = process.env.EMAIL_PASS;

export default async function handler(req, res) {
    if (req.method === "POST") {
        // If email or captcha are missing return an error
        if (!req.body.email || !req.body.token || !req.body.message || !req.body.name) {
          return res.status(422).json({
            message: "Unproccesable request, please provide the required fields",
          });
        }
    
        try {
          // Ping the hcaptcha verify API to verify the captcha code received
          const response = await fetch(
            `https://hcaptcha.com/siteverify`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
              },
              body: `response=${req.body.token}&secret=${process.env.HCAPTCHA_SECRET}`,
              method: "POST",
            }
          );
          const captchaValidation = await response.json();

          /**
           * The structure of response from the veirfy API is
           * {
           *  "success": true|false,
           *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
           *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
           *  "error-codes": [...]        // optional
            }
           */
      
          if (captchaValidation.success) {
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
            // Return 200 if everything is successful
            return res.status(200).send("OK");
          }
    
          return res.status(422).json({
            message: "Unproccesable request, Invalid captcha code",
          });
        } catch (error) {
          console.log(error);
          return res.status(422).json({ message: "Something went wrong" });
        }
    }

    // Return 404 if someone pings the API with a method other than POST
    return res.status(404).send("Not found");
}
