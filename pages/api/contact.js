export default async function handler(req, res) {
    if (req.method === "POST") {
        // If email or captcha are missing return an error
        if (!req.body.email || !req.body.token || !req.body.message || !req.body.name) {
          return res.status(422).json({
            message: "Unproccesable request, please provide the required fields.",
          });
        }

        // Max length of the message is 500 characters, name is 50 characters and email is 254 characters
        if (req.body.message.length > 500 || req.body.name.length > 50 || req.body.email.length > 254) {
          return res.status(422).json({
            message: "Unproccesable request, please shorten the message or name.",
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
                service: "gmail",
                auth: {
                  user: 'fireplankwebsite@gmail.com',
                  pass: process.env.EMAIL_PASS,
                }
            });

            await new Promise((resolve, reject) => {
              // verify connection configuration
              transporter.verify(function (error, success) {
                  if (error) {
                      console.log(error);
                      reject(error);
                  } else {
                      resolve(success);
                  }
              });
            });

            const mailData = {
                from: 'Contact Form <fireplankwebsite@gmail.com>',
                to: 'fireplankwebsite@gmail.com',
                subject: `Message from '${req.body.name}'`,
                text: req.body.message + " | Sender email: " + req.body.email,
                html: `<p>Sender email: ${req.body.email}</p><br/><div>${req.body.message}</div>`
            }

            await new Promise((resolve, reject) => {
              // send mail
              transporter.sendMail(mailData, (err, info) => {
                  if (err) {
                      console.error(err);
                      reject(err);
                      return res.status(500).json({ message: err });
                  } else {
                      console.log(info);
                      resolve(info);
                  }
              });
            });
            // Return 200 if everything is successful
            return res.status(200).send("OK");
          }
    
          return res.status(422).json({
            message: "Invalid captcha code given, please try again.",
          });
        } catch (error) {
          console.log(error);
          return res.status(422).json({ message: "Something went wrong" });
        }
    }

    // Return 404 if someone pings the API with a method other than POST
    return res.status(404).send("Not found");
}
