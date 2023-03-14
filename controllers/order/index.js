import Order from "../../model/order";
import Address from "../../model/address";

const checkout = async (req, res, next) => {
  try {
    const cart = req.session.cart || {};
    const products = Object.values(cart).map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));
    const total = Object.values(cart).reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const address = new Address({
      street: req.body.street,
      city: req.body.city,
    });
    await address.save();
    const order = new Order({
      user: req.body.user,
      products,
      total,
      address: address._id,
    });
    await order.save();
    req.session.cart = {};
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export { checkout };
