"use strict";

module.exports = {
  async logout(ctx) {
    ctx.cookies.set("token", null, {
      httpOnly: true,

    });
    ctx.send({
      authorized: true,
      message: "Successfully destroyed session",
    });
  },
};