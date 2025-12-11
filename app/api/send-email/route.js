import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST() {
    try {
        const host = (process.env.MAIL_HOST || '').trim();
        const port = Number((process.env.MAIL_PORT || '587').trim());
        const user = (process.env.MAIL_USERNAME || '').trim();
        const pass = (process.env.MAIL_PASSWORD || '').trim();
        const from = (process.env.MAIL_FROM || '').trim();
        const to = (process.env.MAIL_TO || '').trim();

        if (!host) throw new Error('MAIL_HOST no configurado');
        if (!from) throw new Error('MAIL_FROM no configurado');
        if (!to) throw new Error('MAIL_TO no configurado');

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const fecha = new Date().toLocaleString('es-CO', {
            timeZone: 'America/Bogota',
            dateStyle: 'full',
            timeStyle: 'long',
        });

        const mailOptions = {
            from: `"Invitaci\u00f3n para Angie \u2600\uFE0F" <${from}>`,
            to,
            subject: '\u00a1Angie dijo que S\u00cd! \u2600\uFE0F',
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
                    <h1>\uD83C\uDF89 \u00a1Felicidades! \uD83C\uDF89</h1>
                    <div class="message">
                      <p><strong>Angie ha aceptado la invitaci\u00f3n.</strong> \u2600\uFE0F\u263A</p>
                      <p>Hizo clic en "S\u00ed" en la p\u00e1gina de invitaci\u00f3n.</p>
                      <div class="date">
                        \uD83D\uDCC5 <strong>Fecha:</strong> ${fecha}
                      </div>
                    </div>
                    <div class="footer">
                      Enviado autom\u00e1ticamente desde la aplicaci\u00f3n de invitaci\u00f3n
                    </div>
                  </div>
                </body>
                </html>
            `,
            text: `Angie dijo que S\u00cd \u2600\uFE0F

\u00a1Felicidades! Angie ha aceptado la invitaci\u00f3n.

Fecha: ${fecha}
---
Enviado autom\u00e1ticamente desde la aplicaci\u00f3n de invitaci\u00f3n`,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email enviado:', info.messageId);

        return NextResponse.json({
            success: true,
            message: 'Email enviado exitosamente',
            messageId: info.messageId,
        });
    } catch (error) {
        console.error('Error al enviar email:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Error al enviar el email',
                details: error.message,
            },
            { status: 500 },
        );
    }
}
