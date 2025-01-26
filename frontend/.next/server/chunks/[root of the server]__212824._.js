module.exports = {

"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/types/api.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ApiResponse": (()=>ApiResponse)
});
class ApiResponse {
    status;
    data;
    error;
    constructor(status, data, error){
        this.status = status;
        this.data = data;
        this.error = error;
    }
    static success(data, status = 200) {
        return new ApiResponse(status, data);
    }
    static error(error, status = 400) {
        return new ApiResponse(status, undefined, error);
    }
    toJson() {
        const responseBody = this.error ? {
            success: false,
            error: this.error
        } : {
            success: true,
            data: this.data
        };
        return new Response(JSON.stringify(responseBody), {
            status: this.status
        });
    }
}
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/lib/db/database.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "connect": (()=>connect),
    "disconnect": (()=>disconnect)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/dotenv/lib/main.js [app-route] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].set("debug", true);
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].config({
    path: ".env.local"
});
const connect = async ()=>{
    await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(process.env.DOCUMENT_URI, {
        autoIndex: true,
        readPreference: "primary"
    });
};
const disconnect = async ()=>{
    await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].disconnect();
};
}}),
"[project]/src/errors/api.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ApiError": (()=>ApiError),
    "AuthenticationError": (()=>AuthenticationError),
    "AuthorizationError": (()=>AuthorizationError),
    "BadGatewayError": (()=>BadGatewayError),
    "ConflictError": (()=>ConflictError),
    "InternalServerError": (()=>InternalServerError),
    "NotFoundError": (()=>NotFoundError),
    "ValidationError": (()=>ValidationError),
    "handleApiError": (()=>handleApiError)
});
class ApiError extends Error {
    code;
    details;
    constructor(message, code, details){
        super(message + JSON.stringify(details));
        this.name = "ApiError";
        this.code = code;
        this.details = details;
    }
}
class ValidationError extends ApiError {
    constructor(message, details){
        super(message, 400, details); // 400: Bad Request
        this.name = "ValidationError";
    }
}
class NotFoundError extends ApiError {
    constructor(message, details){
        super(message, 404, details); // 404: Not Found
        this.name = "NotFoundError";
    }
}
class AuthenticationError extends ApiError {
    constructor(message, details){
        super(message, 401, details); // 401: Unauthorized
        this.name = "AuthenticationError";
    }
}
class AuthorizationError extends ApiError {
    constructor(message, details){
        super(message, 403, details); // 403: Forbidden
        this.name = "AuthorizationError";
    }
}
class ConflictError extends ApiError {
    constructor(message, details){
        super(message, 409, details); // 409: Conflict
        this.name = "ConflictError";
    }
}
class InternalServerError extends ApiError {
    constructor(message, details){
        super(message, 500, details); // 500: Internal Server Error
        this.name = "InternalServerError";
    }
}
class BadGatewayError extends ApiError {
    constructor(message, details){
        super(message, 502, details); // 502: Bad Gateway
        this.name = "BadGatewayError";
    }
}
const handleApiError = (error)=>{
    if (error instanceof ApiError) {
        // Re-throw if it's already an ApiError
        throw error;
    }
    if (error instanceof Error) {
        // Map generic errors to specific types
        switch(error.name){
            case "ValidationError":
                throw new ValidationError("Validation error occurred", {
                    info: error.message
                });
            case "NotFoundError":
                throw new NotFoundError("Resource not found", {
                    info: error.message
                });
            case "AuthenticationError":
                throw new AuthenticationError("Authentication failed", {
                    info: error.message
                });
            case "AuthorizationError":
                throw new AuthorizationError("Access forbidden", {
                    info: error.message
                });
            case "ConflictError":
                throw new ConflictError("Conflict error", {
                    info: error.message
                });
            case "InternalServerError":
                throw new InternalServerError("Internal server error", {
                    info: error.message
                });
            case "BadGatewayError":
                throw new BadGatewayError("Bad gateway error", {
                    info: error.message
                });
            default:
                // Fallback for unhandled error names
                throw new InternalServerError("An unexpected error occurred", {
                    info: error.message
                });
        }
    }
    // Handle unknown or non-Error objects
    throw new InternalServerError("An unknown error occurred", {
        info: String(error)
    });
};
}}),
"[project]/src/errors/database.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DatabaseConnectionError": (()=>DatabaseConnectionError),
    "DatabaseConstraintError": (()=>DatabaseConstraintError),
    "DatabaseError": (()=>DatabaseError),
    "DatabaseQueryError": (()=>DatabaseQueryError),
    "DatabaseResourceError": (()=>DatabaseResourceError),
    "DatabaseTimeoutError": (()=>DatabaseTimeoutError),
    "DatabaseTransactionError": (()=>DatabaseTransactionError),
    "InvalidFieldError": (()=>InvalidFieldError),
    "PermissionDeniedError": (()=>PermissionDeniedError),
    "QuerySyntaxError": (()=>QuerySyntaxError),
    "TypeMismatchError": (()=>TypeMismatchError),
    "handleDBError": (()=>handleDBError)
});
class DatabaseError extends Error {
    code;
    details;
    constructor(message, code = 500, details){
        super(message); // Pass only the message to the Error constructor
        this.name = "DatabaseError"; // Set the name of the error
        this.code = code; // Assign the HTTP status code
        this.details = details; // Assign the details separately
    }
}
class DatabaseConnectionError extends DatabaseError {
    constructor(message = "Failed to connect to the database"){
        super(message, 503); // 503: Service Unavailable
        this.name = "DatabaseConnectionError";
    }
}
class DatabaseQueryError extends DatabaseError {
    constructor(message, details){
        super(message, 400, details); // 400: Bad Request
        this.name = "DatabaseQueryError";
    }
}
class QuerySyntaxError extends DatabaseQueryError {
    constructor(details){
        super("Syntax error in the database query", details);
        this.name = "QuerySyntaxError";
    }
}
class InvalidFieldError extends DatabaseQueryError {
    constructor(details){
        super("Invalid field or table in query", details);
        this.name = "InvalidFieldError";
    }
}
class TypeMismatchError extends DatabaseQueryError {
    constructor(details){
        super("Type mismatch in query", details);
        this.name = "TypeMismatchError";
    }
}
class PermissionDeniedError extends DatabaseQueryError {
    constructor(details){
        super("Permission denied for database query", details);
        this.name = "PermissionDeniedError";
    }
}
class DatabaseTransactionError extends DatabaseError {
    constructor(message = "Database transaction failed", details){
        super(message, 500, details); // 500: Internal Server Error
        this.name = "DatabaseTransactionError";
    }
}
class DatabaseTimeoutError extends DatabaseError {
    constructor(message = "Database operation timed out", details){
        super(message, 504, details); // 504: Gateway Timeout
        this.name = "DatabaseTimeoutError";
    }
}
class DatabaseConstraintError extends DatabaseError {
    constructor(message = "Constraint violation in database operation", details){
        super(message, 409, details); // 409: Conflict
        this.name = "DatabaseConstraintError";
    }
}
class DatabaseResourceError extends DatabaseError {
    constructor(message = "Database resource limit exceeded", details){
        super(message, 507, details); // 507: Insufficient Storage
        this.name = "DatabaseResourceError";
    }
}
const handleDBError = (error)=>{
    if (error instanceof Error) {
        // Handle custom DatabaseError types
        if (error instanceof DatabaseError) {
            throw error; // Re-throw the specific database error
        }
        // Handle ValidationError
        if (error.name === "ValidationError") {
            throw new DatabaseQueryError("Validation failed", {
                info: error.message
            });
        }
        // Handle CastError (e.g., invalid ID format)
        if (error.name === "CastError") {
            throw new InvalidFieldError({
                info: error.message
            });
        }
        // Handle duplicate key errors
        if ("code" in error && error.code === 11000) {
            throw new DatabaseConstraintError("Duplicate key error", {
                info: error.message
            });
        }
        // Handle connection or timeout errors
        if (error.message.includes("timed out") || error.message.includes("ECONNREFUSED")) {
            throw new DatabaseTimeoutError("Database connection timed out", {
                info: error.message
            });
        }
        if (error.message.includes("connect")) {
            throw new DatabaseConnectionError("Failed to connect to the database");
        }
        // Handle any other generic database-related errors
        throw new DatabaseQueryError("Database query failed", {
            info: error.message
        });
    }
    // Handle non-Error unknown errors
    throw new DatabaseError("An unknown error occurred");
};
}}),
"[project]/src/errors/index.ts [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
}}),
"[project]/src/errors/index.ts [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <locals>");
}}),
"[project]/src/errors/index.ts [app-route] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ApiError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiError"]),
    "AuthenticationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthenticationError"]),
    "AuthorizationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AuthorizationError"]),
    "BadGatewayError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BadGatewayError"]),
    "ConflictError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ConflictError"]),
    "DatabaseConnectionError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseConnectionError"]),
    "DatabaseConstraintError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseConstraintError"]),
    "DatabaseError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseError"]),
    "DatabaseQueryError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseQueryError"]),
    "DatabaseResourceError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseResourceError"]),
    "DatabaseTimeoutError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseTimeoutError"]),
    "DatabaseTransactionError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DatabaseTransactionError"]),
    "InternalServerError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InternalServerError"]),
    "InvalidFieldError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidFieldError"]),
    "NotFoundError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NotFoundError"]),
    "PermissionDeniedError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PermissionDeniedError"]),
    "QuerySyntaxError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QuerySyntaxError"]),
    "TypeMismatchError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeMismatchError"]),
    "ValidationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ValidationError"]),
    "handleApiError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"]),
    "handleDBError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleDBError"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <locals>");
}}),
"[project]/src/errors/index.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ApiError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ApiError"]),
    "AuthenticationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["AuthenticationError"]),
    "AuthorizationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["AuthorizationError"]),
    "BadGatewayError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["BadGatewayError"]),
    "ConflictError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ConflictError"]),
    "DatabaseConnectionError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseConnectionError"]),
    "DatabaseConstraintError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseConstraintError"]),
    "DatabaseError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseError"]),
    "DatabaseQueryError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseQueryError"]),
    "DatabaseResourceError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseResourceError"]),
    "DatabaseTimeoutError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseTimeoutError"]),
    "DatabaseTransactionError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["DatabaseTransactionError"]),
    "InternalServerError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["InternalServerError"]),
    "InvalidFieldError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["InvalidFieldError"]),
    "NotFoundError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NotFoundError"]),
    "PermissionDeniedError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["PermissionDeniedError"]),
    "QuerySyntaxError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["QuerySyntaxError"]),
    "TypeMismatchError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["TypeMismatchError"]),
    "ValidationError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["ValidationError"]),
    "handleApiError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["handleApiError"]),
    "handleDBError": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__["handleDBError"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <exports>");
}}),
"[project]/src/lib/db/crud.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "addOne": (()=>addOne),
    "deleteOne": (()=>deleteOne),
    "getAll": (()=>getAll),
    "getOne": (()=>getOne),
    "handlers": (()=>handlers),
    "updateOne": (()=>updateOne),
    "validateReferences": (()=>validateReferences)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/database.ts [app-route] (ecmascript)");
;
;
;
const addOne = async (model, item)=>{
    const newItem = await model.create(item);
    return newItem;
};
const getOne = async (model, id)=>{
    const item = await model.findById(id);
    if (!item) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.NotFoundError(`Item with ID ${id} not found`);
    }
    return item;
};
const getAll = async (model)=>{
    const items = await model.find();
    return items;
};
const updateOne = async (model, id, updates, isNew)=>{
    const updatedItem = await model.findByIdAndUpdate(id, updates, {
        new: isNew,
        runValidators: true
    }).exec();
    if (!updatedItem) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.NotFoundError(`Item with ID ${id} not found for update`);
    }
    return updatedItem;
};
const deleteOne = async (model, id)=>{
    const updatedItem = await model.findByIdAndUpdate(id, {
        deletedAt: new Date()
    }, {
        new: true,
        runValidators: true
    } // Return the updated document
    ).exec();
    if (!updatedItem) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.NotFoundError(`Item with ID ${id} not found for soft deletion`);
    }
    return updatedItem;
};
const validateReferences = async (references)=>{
    if (!(references instanceof Map) || references.size === 0) {
        return false;
    }
    try {
        for (const [model, key] of references.entries()){
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Types"].ObjectId.isValid(key)) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.ValidationError(`Invalid object id: model: ${model}, key: ${String(key)}`);
            }
            const exists = await model.exists({
                _id: key
            });
            if (!exists) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.ValidationError(`Reference with object id ${String(key)} does not exist in ${__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Model"]}`);
            }
        }
        return true;
    } catch (err) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__.DatabaseError(`Error Validating References: ${err}`);
    }
};
const withErrorHandling = (handler)=>{
    return async (model, ...args)=>{
        try {
            return handler(model, ...args);
        } catch (error) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleDBError"])(error);
            throw error;
        }
    };
};
const handlers = {
    getAll: withErrorHandling(getAll),
    getOne: withErrorHandling(getOne),
    addOne: withErrorHandling(addOne),
    updateOne: withErrorHandling(updateOne),
    deleteOne: withErrorHandling(deleteOne)
};
}}),
"[project]/src/lib/db/schema.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GameObservationSchema": (()=>GameObservationSchema),
    "GameSchema": (()=>GameSchema),
    "MetricsTemplateSchema": (()=>MetricsTemplateSchema),
    "OrganizationSchema": (()=>OrganizationSchema),
    "PlayerSchema": (()=>PlayerSchema),
    "ResultSchema": (()=>ResultSchema),
    "UserSchema": (()=>UserSchema)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/mongoose [external] (mongoose, cjs)");
;
const OrganizationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const PlayerSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50 // Optional: Limit name length for validation
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50 // Optional: Limit name length for validation
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: (val)=>val > 10 && val < 100,
            message: "Age must be between 10 and 99"
        }
    },
    position: {
        type: String,
        required: true,
        min: 0 // Position must be non-negative
    },
    organizationId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/ // Validation for alphanumeric with hyphens
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const GameSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    name: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
    },
    description: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9 .,!?]{1,}$/ // Validation for sentences and punctuation
    },
    image: {
        type: String,
        required: true,
        match: /^(http|https):\/\/[^ "]+$/ // Validation for valid URLs
    },
    instructions: {
        type: [
            {
                step: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true,
                    match: /^(http|https):\/\/[^ "]+$/
                }
            }
        ]
    },
    parameters: {
        type: [
            {
                id: {
                    type: String,
                    required: true
                },
                data: {
                    type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.Mixed,
                    required: true
                }
            }
        ],
        required: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const GameObservationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    playerId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    gameId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    data: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.Mixed,
        required: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const UserSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // Minimum length for passwords
    },
    role: {
        type: String,
        required: true,
        enum: [
            "admin",
            "user",
            "manager"
        ] // Predefined roles
    },
    organizationId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const ResultSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    gameId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    playerId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    metrics: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"].Types.Mixed,
        required: true
    },
    resultDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
const MetricsTemplateSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    gameId: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9-]{1,}$/
    },
    metrics: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                    match: /^[a-zA-Z0-9 ]{1,}$/ // Validation for alphanumeric and spaces
                },
                description: {
                    type: String,
                    required: true,
                    match: /^[a-zA-Z0-9 .,!?]{1,}$/ // Validation for sentences and punctuation
                },
                type: {
                    type: String,
                    required: true,
                    enum: [
                        "number",
                        "string"
                    ] // Allowed types
                }
            }
        ],
        required: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
}}),
"[project]/src/lib/db/models.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GameModel": (()=>GameModel),
    "GameObservationModel": (()=>GameObservationModel),
    "MetricsTemplateModel": (()=>MetricsTemplateModel),
    "OrganizationModel": (()=>OrganizationModel),
    "PlayerModel": (()=>PlayerModel),
    "ResultModel": (()=>ResultModel),
    "UserModel": (()=>UserModel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_import__("[externals]/mongoose [external] (mongoose, cjs)");
;
;
const OrganizationModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Organization || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Organization", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrganizationSchema"]);
const PlayerModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Player || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Player", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PlayerSchema"]);
const GameModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Game || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Game", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GameSchema"]);
const GameObservationModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"]["Game Observation"] || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Game Observation", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GameObservationSchema"]);
const UserModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].User || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("User", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UserSchema"]);
const ResultModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].Result || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("Result", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResultSchema"]);
const MetricsTemplateModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["models"].MetricTemplate || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["model"])("MetricTemplate", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MetricsTemplateSchema"]);
}}),
"[project]/src/lib/db/index.ts [app-route] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
}}),
"[project]/src/lib/db/index.ts [app-route] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/crud.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/lib/db/index.ts [app-route] (ecmascript) <locals>");
}}),
"[project]/src/lib/api/api.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "BaseAPI": (()=>BaseAPI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/types/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/lib/db/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/errors/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/crud.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/errors/api.ts [app-route] (ecmascript)");
;
;
;
;
class BaseAPI {
    model;
    constructor(model){
        this.model = model;
        this.connectToDb();
    }
    async connectToDb() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connect"])();
    }
    async getOne(id) {
        try {
            const modelObject = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOne"])(this.model, id);
            if (!modelObject) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].error("Item not found", 404).toJson();
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].success(modelObject).toJson();
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
        }
    }
    async getAll() {
        try {
            const objects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAll"])(this.model);
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].success(objects).toJson();
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
        }
    }
    async addOne(values, references) {
        try {
            const validReferences = references ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateReferences"])(references) : true;
            if (validReferences) {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addOne"])(this.model, values);
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].success(result, 201).toJson();
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].error("invalid Reference", 403).toJson();
            }
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
        }
    }
    async updateOne(id, updateData, references) {
        try {
            const validReferences = references ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateReferences"])(references) : true;
            if (validReferences) {
                const updatedModel = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateOne"])(this.model, id, updateData, true);
                if (!updatedModel) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].error("Item not found", 404).toJson();
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].success(updatedModel).toJson();
            } else {
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].error("invalid Reference", 403).toJson();
            }
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
        }
    }
    async deleteOne(id) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$crud$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteOne"])(this.model, id);
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApiResponse"].success(204).toJson();
        } catch (error) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$errors$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
        }
    }
}
}}),
"[project]/src/app/api/games/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/api/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/lib/db/index.ts [app-route] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/db/models.ts [app-route] (ecmascript)");
;
;
const api = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseAPI"](__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GameModel"]);
async function GET() {
    return await api.getAll();
}
async function POST(req) {
    const values = await req.json();
    return await api.addOne(values);
}
}}),
"[project]/ (server-utils)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__212824._.js.map