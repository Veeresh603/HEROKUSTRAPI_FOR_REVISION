module.exports = () => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: process.env.SENDGRID_API_KEY,
    },
    settings: {
      defaultFrom: 'users@certisured.com',
      defaultReplyTo: 'users@certisured.com',
    },
  },
  // ...
});