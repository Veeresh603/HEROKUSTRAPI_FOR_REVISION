"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(
  "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"
);

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    const { user } = ctx.state;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.order.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.order.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.order })
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },

   //Start of setUpStripe

  setUpStripe: async (ctx) => {
    let total;
    let validateCart = [];
    let recieptCart = [];

    const { cart } = ctx.request.body;
    console.log("cart", cart)
    await Promise.all(
      cart.map(async (course) => {
        const validateProduct = await strapi.services.course.findOne({
          id: course.course,
        });
         console.log("validateProduct", validateProduct)
        if (validateProduct) {
          validateProduct.qty = course.qty;
          validateProduct.price = course.price;
          validateCart.push(validateProduct);

          recieptCart.push({
            id: course.course,
            qty: course.qty,
          });
        }

        return validateProduct;
      })
    );
    total = strapi.config.functions.cart.cartSubTotal(validateCart);
   console.log("reciept", recieptCart)
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
        metadata: { cart: JSON.stringify(recieptCart) },
      });
      return paymentIntent;
    } catch (err) {
      return { error: err.raw.message };
    }
  },


  //end of setUpStripe


  async create(ctx) {
    const {
      paymentIntent,
      shipping_name,
      shipping_email,
      shipping_phone,
      cart,
      total,
    } = ctx.request.body;
    const { user } = ctx.state;

    let paymentInfo;
    try {
      paymentInfo = await stripe.paymentIntents.retrieve(paymentIntent.id);
      if (paymentInfo.status !== "succeeded") {
        throw { message: "You still have to pay" };
      }
    } catch (err) {
      ctx.response.status = 402;
      return {
        error: err.message,
      };
    }
    const alreadyExistingOrder = await strapi.services.order.find({
      paymentIntent_id: paymentIntent.id,
    });

    if (alreadyExistingOrder && alreadyExistingOrder.length > 0) {
      ctx.response.status = 402;
      return {
        error: "This payment intent was already used",
      };
    }

    let courses = [];

    await Promise.all(
      cart.map(async (c) => {
        const foundCourse = await strapi.services.course.findOne({
          id: c.course,
        });

        if (foundCourse) {
          courses.push(foundCourse);
        }
        return foundCourse;
      })
    );
    console.log(`courses`, courses)

    // if (paymentInfo.amount !== total) {
    //   ctx.response.status = 402;
    //   return {
    //     error:
    //       "The total to be paid is different from the total from the Payment Intent",
    //   };
    // }
    const entry = {
      paymentIntent_id: paymentIntent.id,
      shipping_name,
      shipping_email,
      shipping_phone,
      courses,
      user: user,
      status: "paid",
      total: total
    };
    const entity = await strapi.services.order.create(entry);
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
