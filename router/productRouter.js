const ProductModel = require("../models/product.model");
const checkLogin = require("../checkLogin");
const checkRole = require("../checkRole");
const router = require("express").Router();

// a, tìm sp theo tên
// b, tìm sp theo giá (< giá trên, > giá dưới), phân trang kết quả
// c, tìm sp theo phân loại, phân trang kết quả
// d, chỉ cho phép user đã đăng nhập thực hiện tìm kiếm sp

router.get("/", async (req, res) => {
    try {
        const data = await ProductModel.find({});
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

router.get("/findCategory", checkLogin, checkRole, async (req, res) => {
    try {
        console.log(req.query);
        const cateArr = req.query.category.split(",");
        let obj = {category: {$in: cateArr}}
        if (req.query.min || req.query.max) {
            obj.price = {}
        }
        if (req.query.min) {
            obj.price['$gte'] = req.query.min * 1
        }
        if (req.query.max) {
            obj.price['$lte'] = req.query.max * 1
        }
        console.log(obj)
        const data = await ProductModel.find(obj)
        res.json(data);
    } catch (error) {
        res.json(error);
    }
})

router.get("/productName", async (req, res) => {
    try {
        const data = await ProductModel.findOne({
            productName: req.body.productName,
        });
        if (data) {
            res.json({data: data, status: 200});
        } else {
            res.json({mess: "product not found", status: 404});
        }
    } catch (error) {
        res.json(error);
    }
});

router.post("/category", async (req, res) => {
    try {
        const option = {
            page: req.query.page,
            limit: req.query.limit
        }
        const data = await ProductModel.paginate({category: req.body.category}, option)

        res.json({
            data: data,
            status: 200,
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get("/price", async (req, res) => {
    try {
        const data = await ProductModel.find({
            $and: [
                {price: {$gt: req.body.startPrice}},
                {price: {$lt: req.body.endPrice}},
            ],
        });

        if (data) {
            res.json({data: data, status: 200});
        } else {
            res.json({message: "Product not found", status: 404});
        }
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const data = await ProductModel.create({
            category: req.body.category,
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        ProductModel.deleteOne({_id: req.params.id})
            .then((data) => res.json(data))
            .catch((e) => {
                res.json(e);
            })
    } catch (e) {
        res.json(e);
    }
})

module.exports = router;
