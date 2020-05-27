const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.EXPRESS_PORT || 3000;
const { ErrorDef, ExError } = require("./common/common-errors")

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routerV1 = require('./routes/v1/');
app.use('/api/v1/', routerV1);

// 未定義のパス
app.use(function(req, res, next) {
    res.status(404);
    res.locals.error = {};
    res.json(ExError.createErrorObject(ErrorDef.resourceNotFound()));
});

// すべてのルートの最後にエラーハンドラを定義
app.use(function(err, req, res, next) {
    if (err instanceof ExError) {
        res.status(err.status);
        res.locals.error = {};
        res.json(err.errorObject);
    } else if (err instanceof SyntaxError) {
        res.status(400);
        res.locals.error = {};
        res.json(ExError.createErrorObject(ErrorDef.invalidJsonFormat()));
    } else {
        console.log("# Un Expected Error #################################################");
        console.log(err);
        console.log("#####################################################################");
        res.status(500);
        res.locals.error = {};
        res.json(ExError.createErrorObject(ErrorDef.systemError()));
    }
});

app.listen(port, () => {
    console.log(`gekko-api listening on port ${port}!`);
    console.log("================================================================================");
    console.log(`NODE_ENV: "${process.env.NODE_ENV }"`);
    console.log(`TZ: "${process.env.TZ }"`);
    console.log("================================================================================");
})