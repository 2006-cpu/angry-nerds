const apiRouter = require('express').Router();



/* This will be edited */
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

/* ROUTING FOR /api/products */
  const productsRouter = require('./products');
  apiRouter.use('/products', productsRouter);

module.exports = apiRouter;
