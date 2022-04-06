import Product from '../../model/v1/Product'

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product({ name, category, price, imgUrl });

    const productSaved = await newProduct.save();

    res.status(201).json({
      data: productSaved,
      status: true,
      message: "Success",
      count: 1
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({
      data: products,
      status: true,
      message: "Success",
      count: products.length
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({
        data: product,
        status: true,
        message: "Success",
        count: product.length
      });
    } else {
      res.status(404).json({
        data: null,
        status: false,
        message: "Product not found",
        count: 0
      })
    }
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}

export const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true
    });
    res.status(200).json({
      data: updateProduct,
      status: true,
      message: "Success",
      count: updateProduct.length
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      data: {
        id: productId
      },
      status: true,
      message: "Success",
      count: 0
    })
  } catch (error) {
    res.status(400).json({
      data: null,
      status: false,
      message: error.message,
      count: 0
    })
  }
}