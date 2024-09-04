 import nodemailer from 'nodemailer';

 export const sendMail = async (options)=> {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD
        },
      });

      const mailOptions = {
        from: process.env.SMTP_MAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        
      };

      // await transporter.sendMail(mailOptions)
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error('Error sending email:', error);
      }
      
    
    
 }