const nodemailer = require('nodemailer')


class SendEmail {
    constructor(email, id, hash){
        this.email = email;
        this.id = id;
        this.hash = hash
    }
    transporter(){
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'carolinelaura69@gmail.com',
                pass: 'regist3r12'
            }
        })
    }
    mailOptions(){
        return {
            from: 'carolinelaura69@gmail.com',
            to: this.email,
            subject: 'Caravan',
            html: `
                <div style="width: 80%; background: white;">
                    <h3>Olá,</h3>
                    <p style="color: black;">
                        Sua senha do Caravan pode ser redefinida clicando no botão abaixo.
                        Se você não solicitou uma nova senha, ignore este e-mail.
                    </p>
                    <p><strong>ATENÇÃO:</strong> o link abaixo expira em 1hr </p>
                    <button style="padding: 10px; background: #4300D2; border: none;">
                        <a style="color: white; text-decoration: none; font-weight: bold; cursor: pointer; display: block" target="_blank" href="http://192.168.1.48:3000/recuperar-senha/${this.hash}/${this.id}">
                            Redefinir senha
                        </a>
                    </button>
                </div>
            `
        }
    }
    send(){
        return this.transporter().sendMail(this.mailOptions())
    }
}

module.exports = SendEmail