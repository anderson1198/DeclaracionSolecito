import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        // Configurar transporter con las credenciales de Hostinger
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            secure: false, // true para 465, false para otros puertos
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Obtener la fecha actual en formato Colombia
        const fecha = new Date().toLocaleString('es-CO', {
            timeZone: 'America/Bogota',
            dateStyle: 'full',
            timeStyle: 'long'
        });

        // Configurar el email
        const mailOptions = {
            from: `"Invitación para Angie 💕" <${process.env.MAIL_FROM}>`,
            to: process.env.MAIL_TO,
            subject: '💕 ¡Angie dijo que SÍ!',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f5f5f5;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            h1 {
              color: white;
              text-align: center;
              font-size: 2.5em;
              margin-bottom: 20px;
            }
            .message {
              background: white;
              border-radius: 15px;
              padding: 30px;
              margin: 20px 0;
            }
            .message p {
              font-size: 1.2em;
              color: #333;
              line-height: 1.6;
              margin: 10px 0;
            }
            .date {
              color: #666;
              font-size: 0.9em;
              text-align: center;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
            }
            .footer {
              text-align: center;
              color: white;
              margin-top: 20px;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🎉 ¡Felicidades! 🎉</h1>
            <div class="message">
              <p><strong>¡Angie ha aceptado la invitación!</strong> 💕✨</p>
              <p>Ella hizo clic en "Sí" en la página de invitación.</p>
              <div class="date">
                📅 <strong>Fecha:</strong> ${fecha}
              </div>
            </div>
            <div class="footer">
              Enviado automáticamente desde la aplicación de invitación
            </div>
          </div>
        </body>
        </html>
      `,
            text: `¡Angie dijo que SÍ! 💕\n\n¡Felicidades! Angie ha aceptado la invitación. 🎉✨\n\nFecha: ${fecha}\n\n---\nEnviado automáticamente desde la aplicación de invitación`
        };

        // Enviar el email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email enviado:', info.messageId);

        return res.status(200).json({
            success: true,
            message: 'Email enviado exitosamente',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error al enviar email:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al enviar el email',
            details: error.message
        });
    }
}
