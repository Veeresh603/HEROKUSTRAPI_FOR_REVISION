module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy: true,
  url: env('STRAPI_BACKEND_URL', 'http://localhost:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '2963bb479dfb278ea99caff53b34d608'),
    },
  },
});
