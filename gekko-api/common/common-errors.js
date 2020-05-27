/*
 * =============================================================================
 * My Error Rule
 * =============================================================================
 * 
 * ◎バリデーションエラー（400）
 * ・フォーマットチェックエラー
 * ・単一項目チェック
 * ・関連項目チェック
 * ・マスタチェック
 * 
 * ◎業務ロジックエラー（400）
 * ・データ整合性エラー
 * 
 * ◎認証チェックエラー（401）
 * 
 * ◎権限チェックエラー（403）
 * 
 * ◎リソースなしエラー（404）
 * 
 * ◎システムエラー（500）
 * ・予期せぬエラー*
 * 
 * ◎メンテナンスエラー（503）
 */

/*
 * エラー定義.
 */
const ErrorDef = {};

// フォーマットチェックエラー：JSON
ErrorDef.invalidJsonFormat = () => {
	return {
		code: "errors.invalid-json-format",
		message: "Request body was invalid JSON format"
	};
};

// データなしエラー
ErrorDef.dataNotFound = (dataName, keys) => {
	return {
		code: "errors.data-not-found",
		message: "The requested data was not found",
		dataName: dataName,
		key: keys.length ? keys.join("-") : keys
	};
};

// データ重複エラー
ErrorDef.duplicationData = (dataName) => {
	return {
		code: "errors.duplication-data",
		message: "This data already exists",
		dataName: dataName
	};
};

// リソースなしエラー
ErrorDef.resourceNotFound = () => {
	return {
		code: "errors.resource-not-found",
		message: "The resource was not found"
	};
};

// システムエラー
ErrorDef.systemError = () => {
	return {
		code: "errors.system",
		message: "An unexpected error has occurred"
	};
};


/*
 * 独自エラークラス.
 */
class ExError {
	constructor(status, errors) {
		this.status = status;
		this.errorObject = _createErrorObject(errors);
	}
}
ExError.createErrorObject = _createErrorObject;
function _createErrorObject(errors) {
	return {
		errors: errors ? (errors.length ? errors : [errors]) : []
	}
}

/*
 * 例外生成処理.
 */
const Errors = {};

// バリデーションエラー
Errors.validationError = (errors) => {
	return new ExError(400, errors);
}

// 業務ロジックエラー
Errors.businessLogicError = (errors) => {
	return new ExError(400, errors);
}

// システムエラー
Errors.systemError = (errors) => {
	return new ExError(500, errors ? errors : Errors.systemError());
}

module.exports = {
  ErrorDef, Errors, ExError
}
