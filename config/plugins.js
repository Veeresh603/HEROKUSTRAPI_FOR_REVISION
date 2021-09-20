module.exports = () => ({
  // ...
  email: {
    provider: 'sendgrid',
    providerOptions: {
      apiKey: `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`,
    },
    settings: {
      defaultFrom: 'users@certisured.com',
      defaultReplyTo: 'users@certisured.com',
    },
  },
  // ...
});