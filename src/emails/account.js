const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thisisrg.iitr@gmail.com',
        subject: 'Welcome Email',
        text: `Hey ${name}! Thanks for joining in.`
    })
}
const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thisisrg.iitr@gmail.com',
        subject: 'Sorry to see you Go',
        text: `Hey ${name}! It was great having you with us. Hope to see you back soon.`
    })
}

module.exports = { sendWelcomeEmail, sendCancellationEmail }
