import productModel from "../models/product.js";

export const getAll = async (req, res) => {
  try {
    const products = await productModel.find().exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get products",
    });
  }
};
export const create = async (req, res) => {
  try {
    function calculateInStock(count) {
      return count > 0;
    }
    const inStock = calculateInStock(req.body.count);

    const doc = new productModel({
      name: req.body.name,
      description: req.body.description,
      companyName: req.body.companyName,
      inStock: inStock,
      sex: req.body.sex,
      size: req.body.size,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      count: req.body.count,
      unitPrice: req.body.unitPrice,
    });

    const product = await doc.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      massage: "Create product error",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const productId = req.params.id;

    const doc = await productModel.findOneAndDelete({ _id: productId });

    if (!doc) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get Products",
    });
  }
};
export const update = async (req, res) => {
  try {
    const productId = req.params.id;
    function calculateInStock(count) {
      return count > 0;
    }
    const inStock = calculateInStock(req.body.count);

    await productModel.updateOne(
      {
        _id: productId,
      },
      {
        name: req.body.name,
        description: req.body.description,
        companyName: req.body.companyName,
        inStock: inStock,
        sex: req.body.sex,
        size: req.body.size,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        count: req.body.count,
        unitPrice: req.body.unitPrice,
      }
    );
    res.status(200).json({
      message: "Product updated",
    });
  } catch {
    console.log(err);
    res.status(500).json({
      message: "Couldn't update product",
    });
  }
};
