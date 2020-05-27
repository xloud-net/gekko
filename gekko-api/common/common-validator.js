const Schema = require("validate")
const { Errors } = require("../common/common-errors")

const Validator = {};

Validator.validate = (definition, req) => {
    if (!definition || !req || !req.body) {
        throw new Error("Invalid argument");
    }
    const schema = new Schema(definition);
    schema.message(ErrorCodeDef);
    const results = schema.validate(req.body);
    const errors = results.map((error) => {
        return JSON.parse(error.message)
    });
    return errors;
};

Validator.validateAndThrow = (definition, req) => {
    const errors = Validator.validate(definition, req);
    if (errors.length > 0) {
        throw Errors.validationError(errors);
    }
};

/*
 * https://www.npmjs.com/package/validate#custom-error-messages
 * 
 * 使用するバリデーションに対応する定義を随時ここに定義する
 */
const ErrorCodeDef = {
    required: (path, data, spec) => {
        return JSON.stringify({
            field: path,
            code: "errors.required"
        })
    },
    length: (path, data, spec) => {
        return JSON.stringify({
            field: path,
            code: "errors.length",
            length: spec
        })
    },
    size: (path, data, spec) => {
        return JSON.stringify({
            field: path,
            code: "errors.size",
            length: spec
        })
    },
    match: (path, data, spec) => {
        return JSON.stringify({
            field: path,
            code: "errors.format"
        })
    }
};

module.exports = {
    Validator
}