import Products from "../../model/products";

const addToCart = async (req, res) => {
  try {
    const productId = req.body.product;
    const product = await Products.findOne({ _id: productId });
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const cart = req.session.cart || {};
    cart[product._id] = cart[product._id] || {
      product,
      quantity: 0,
    };
    cart[product._id].quantity += parseInt(req.body.quantity) || 1;
    cart[product._id].totalPrice =
      cart[product._id].product.price * cart[product._id].quantity;
    // cart.totalPrice = cart.reduce(
    //   (sum, item) => sum + item.cart[product._id].totalPrice,
    //   0
    // );

    // const products = cart;
    // const totalPrices = products.reduce((total, product) => {
    //   return total + product.totalPrice;
    // }, 0);
    // cart.totalPrice = totalPrices;

    console.log(cart);
    req.session.cart = cart;
    res.send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export { addToCart };
