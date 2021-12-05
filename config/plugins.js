module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp-relay.sendinblue.com",
      port: "587",
      auth: {
        user: "veeresh.analogica@gmail.com",
        pass: "1rx8HAJcj72NKb6U",
      },
    },
    settings: {
      defaultFrom: "users@certisured.com",
      defaultReplyTo: "users@certisured.com",
    },
  },
  // ...
})