const express = require("express");
const router = express.Router();
const models = require("../../models");
const { Utils } = require("../../common/common-utils");
const { CryptoUtils } = require("../../common/common-crypto");
const { DbUtils } = require("../../common/common-db");
const { Validator } = require("../../common/common-validator");
const { ErrorDef, Errors } = require("../../common/common-errors");

// 全件検索
router.get("/", async (req, res, next) => {
    try {
        const count = await models.User.count();
        const result = await models.User.findAll({
            attributes: ["id", "name", "email", ["created_at", "createdAt"],
                ["updated_at", "updatedAt"]
            ],
            offset: Number(req.query.offset) || null,
            limit: Number(req.query.limit) || null
        });
        const users = result.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: Utils.formatTimestamp(user.createdAt),
                updatedAt: Utils.formatTimestamp(user.updatedAt)
            };
        });
        res.json({
            "total": count,
            "users": users
        });
    } catch (err) {
        next(err);
    }
});

// 単一検索
router.get("/:id", async (req, res, next) => {
    try {
        await models.User.findOne({
            attributes: ["id", "name", "email", ["created_at", "createdAt"],
                ["updated_at", "updatedAt"]
            ],
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (!result) {
                throw Errors.businessLogicError(ErrorDef.dataNotFound("users", [req.params.id]));
            }
            return res.json({
                "user": {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    createdAt: Utils.formatTimestamp(result.createdAt),
                    updatedAt: Utils.formatTimestamp(result.updatedAt)
                }
            });
        });
    } catch (err) {
        next(err);
    }
});

// 新規登録
router.post("/", async (req, res, next) => {
    try {

        Validator.validateAndThrow(getUserValidationDefinition(), req);

        await models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: CryptoUtils.md5(req.body.password)
        }).then((result) => {
            return res.json({
                "user": {
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            });
        }).catch((err) => {
            if (DbUtils.isDuplicationError(err)) {
                throw Errors.businessLogicError(ErrorDef.duplicationData("users"));
            }
            throw err;
        });
    } catch (err) {
        next(err);
    }
});

// 更新（差分）
router.patch("/:id", async (req, res, next) => {
    try {

        Validator.validateAndThrow(getUserValidationDefinition(false), req);

        let user;
        await models.User.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (!result) {
                throw Errors.businessLogicError(ErrorDef.dataNotFound("users", [req.params.id]));
            }
            user = result;
        });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = CryptoUtils.md5(req.body.password) || user.password;
        await user.save().then((result) => {
            res.json({
                "user": {
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            });
        });
    } catch (err) {
        next(err);
    }
});

// 削除
router.delete("/:id", async (req, res, next) => {
    try {
        let user;
        await models.User.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            if (!result) {
                throw Errors.businessLogicError(ErrorDef.dataNotFound("users", [req.params.id]));
            }
            user = result;
        });

        await user.destroy().then((result) => {
            res.json({
                "user": {
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            });
        });
    } catch (err) {
        next(err);
    }
});

// Validation定義（ユーザ）
function getUserValidationDefinition(required = true) {
    return {
        name: {
            type: String,
            required: required,
            length: { max: 32 }
        },
        email: {
            type: String,
            required: required,
            match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            length: { max: 255 }
        },
        password: {
            type: String,
            required: required,
            length: { max: 32 }
        }
    };
};

module.exports = router;