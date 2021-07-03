module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: env('SENDGRID_API_KEY'),
    },
    settings: {
      defaultFrom: 'users@certisured.com',
      defaultReplyTo: 'users@certisured.com',
    },
  },
  // ...
});