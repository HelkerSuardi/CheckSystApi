'use strict'

const Firefighter = require('../model/firefighter')
const nodemailer = require('nodemailer')
const chsEmail = process.env.CHS_CI_RESET_PASSWORD_EMAIL
const chsEmailPassword = process.env.CHS_CI_RESET_PASSWORD_EMAIL_PASSWORD

const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    let pass = "";

    for (let x = 0; x < 6; x++) {
        let i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }

    return pass
}

const sendEmail = (newPassword, userEmail) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: chsEmail,
          pass: chsEmailPassword
        }
    });

    const mailOptions = {
        from: chsEmail,
        to: userEmail,
        subject: 'Redefinição de senha.',
        text: `A sua nova senha de acesso é ${newPassword}.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          throw new Error ('Failed to send e-mail.')
        }
    }); 
}

const resetPassword = async (req, res) => {
    const { email } = req.params
    
    const user = await Firefighter.findOne({
        email
    })

    if (!user) {
        return res.status(404).send({
            message: 'Usuário não encontrado.'
        })
    }
    
    const newPass = generatePassword()

    try {
        await sendEmail(newPass, user.email)
        
        user.password = newPass

        await user.save()

        return res.status(200).send({
            message: 'Senha redefinida com sucesso! Cheque seu e-mail.'
        })
    } catch (e) {
        return res.status(500).send({
            message: 'Houve um problema ao enviar o e-mail.'
        })
    }

    

    

}

module.exports = resetPassword