module.exports = {

"[project]/src/components/game-components/modals/Carousel.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [app-ssr] (ecmascript) <export default as XMarkIcon>");
"use client";
;
;
;
;
const Carousel = ({ instructions })=>{
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [showInstructions, setShowInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClick = (direction)=>{
        const newStep = step + direction;
        if (newStep >= 0) {
            setStep(newStep >= instructions.length ? 0 : newStep);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "bg-slate-600 hover:bg-slate-700 game-button",
                onClick: ()=>setShowInstructions(true),
                "aria-label": "Read Instructions",
                children: "Instructions"
            }, void 0, false, {
                fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            showInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-game-background flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-[80%] max-w-4xl p-6 rounded-lg ",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowInstructions(false),
                            className: "absolute top-4 right-4 cursor-pointer z-30 flex items-center justify-center bg-gray-700 hover:bg-gray-600 p-2 rounded-full",
                            "aria-label": "Close Instructions",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                className: "text-white h-6 w-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        instructions.length > 0 && step < instructions.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: instructions[step].image,
                                alt: `Step ${step + 1}`,
                                width: 700,
                                height: 400,
                                priority: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                lineNumber: 52,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                            lineNumber: 51,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 right-0 bottom-4 top-4 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleClick(-1),
                                    "aria-label": "Previous Step",
                                    className: "cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 1.5,
                                        stroke: "currentColor",
                                        className: "w-10 h-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleClick(1),
                                    "aria-label": "Next Step",
                                    className: "cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        strokeWidth: 1.5,
                                        stroke: "currentColor",
                                        className: "w-10 h-10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game-components/modals/Carousel.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = Carousel;
}}),
"[project]/src/components/game-components/modals/GameIntroduction.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const GameIntroduction = ({ gameInfo })=>{
    const { name = "Game Name", description = "Game description goes here.", parameters = [] } = gameInfo;
    // Extract trial data with safe fallback
    const { practiceTrials = 0, trials = 0 } = parameters[0]?.data || {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-white flex flex-col gap-8 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                "aria-label": `${name} Title`,
                children: name
            }, void 0, false, {
                fileName: "[project]/src/components/game-components/modals/GameIntroduction.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-center max-w-3xl flex flex-col gap-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/game-components/modals/GameIntroduction.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "You will first complete ",
                            practiceTrials,
                            " practice trials (not scored), followed by ",
                            trials,
                            " main trials."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game-components/modals/GameIntroduction.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game-components/modals/GameIntroduction.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game-components/modals/GameIntroduction.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = GameIntroduction;
}}),
"[project]/src/components/game-components/modals/InstructionDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$Carousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/Carousel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroduction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/GameIntroduction.tsx [app-ssr] (ecmascript)");
;
;
;
const InstructionDialog = ({ gameInfo, onStart, skipPractice })=>{
    const instructions = gameInfo.instructions || []; // Fallback for instructions
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-game-background absolute inset-0 flex flex-col items-center justify-center p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroduction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                gameInfo: gameInfo
            }, void 0, false, {
                fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4 mt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-primary hover:bg-primary/80 game-button",
                        onClick: onStart,
                        "aria-label": "Start Game Button",
                        children: "Start Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$Carousel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                instructions: instructions
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: skipPractice,
                                className: "bg-slate-600 hover:bg-slate-700 game-button",
                                "aria-label": "Skip Practice Button",
                                children: "Skip Practice"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game-components/modals/InstructionDialog.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = InstructionDialog;
}}),
"[project]/src/components/game-components/modals/GameIntroDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroduction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/GameIntroduction.tsx [app-ssr] (ecmascript)");
;
;
const GameIntroDialog = ({ gameInfo, onStart, onShowInstructions, skipPractice })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-game-background absolute inset-0 flex flex-col items-center justify-center p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroduction$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                gameInfo: gameInfo
            }, void 0, false, {
                fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4 mt-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-primary hover:bg-primary/80 game-button",
                        onClick: onStart,
                        "aria-label": "Start Game Button",
                        children: "Start Game"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onShowInstructions,
                                className: "bg-slate-600 hover:bg-slate-700 game-button",
                                "aria-label": "Show Instructions Button",
                                children: "Instructions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: skipPractice,
                                className: "bg-slate-600 hover:bg-slate-700 game-button",
                                "aria-label": "Skip Practice Button",
                                children: "Skip Practice"
                            }, void 0, false, {
                                fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/game-components/modals/GameIntroDialog.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = GameIntroDialog;
}}),
"[project]/src/components/game-components/utils/TNT/Ball.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "BASE_COLOR": (()=>BASE_COLOR),
    "Ball": (()=>Ball),
    "CORRECT_COLOR": (()=>CORRECT_COLOR),
    "GLOW_COLOR": (()=>GLOW_COLOR),
    "HIGHLIGHT_COLOR": (()=>HIGHLIGHT_COLOR),
    "WRONG_COLOR": (()=>WRONG_COLOR),
    "createBalls": (()=>createBalls)
});
const BASE_COLOR = "#FDDA0D";
const HIGHLIGHT_COLOR = "#007FFF";
const GLOW_COLOR = "#00FF00";
const WRONG_COLOR = "#FF0000";
const CORRECT_COLOR = "#00FF00";
class Ball {
    x;
    y;
    angle;
    radius;
    vx;
    vy;
    color;
    constructor(x, y, angle, ballRadius, currentSpeed, color){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.radius = ballRadius;
        this.vx = Math.cos(this.angle) * currentSpeed;
        this.vy = Math.sin(this.angle) * currentSpeed;
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    reset = ()=>{
        this.color = BASE_COLOR;
    };
    addMarks(ball, ctx, isWrongBall, isCorrectBall) {
        ctx.font = `${ball.radius}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (isCorrectBall) {
            ctx.fillStyle = "rgb(11, 218, 81)";
            ctx.fillText("✓", ball.x, ball.y);
        } else if (isWrongBall) {
            ctx.fillStyle = "red";
            ctx.fillText("✕", ball.x, ball.y);
        }
    }
    drawBall(ball, isHighlighted, ctx, isWrongBall, isCorrectBall) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : this.getColor();
        ctx.fill();
        ctx.closePath();
        this.addMarks(ball, ctx, isWrongBall, isCorrectBall);
    }
}
// Create balls in different regions
const createRegions = (canvasWidth, canvasHeight)=>[
        {
            x: canvasWidth * 0.25,
            y: canvasHeight * 0.25
        },
        {
            x: canvasWidth * 0.75,
            y: canvasHeight * 0.25
        },
        {
            x: canvasWidth * 0.25,
            y: canvasHeight * 0.5
        },
        {
            x: canvasWidth * 0.75,
            y: canvasHeight * 0.5
        },
        {
            x: canvasWidth * 0.25,
            y: canvasHeight * 0.75
        },
        {
            x: canvasWidth * 0.75,
            y: canvasHeight * 0.75
        },
        {
            x: canvasWidth * 0.5,
            y: canvasHeight * 0.25
        },
        {
            x: canvasWidth * 0.5,
            y: canvasHeight * 0.75
        }
    ];
const createBalls = (canvas, ballRadius, numberOfBalls, BallClass, ...extraArgs)=>{
    const balls = [];
    const startingSpeed = 0.01;
    const regions = createRegions(canvas.width, canvas.height);
    for(let i = 0; i < numberOfBalls; i++){
        const randomRegion = regions[i % regions.length];
        const variation = 50 * (numberOfBalls - 7) ** 2;
        const randomX = Math.random() * variation - variation / 2;
        const randomY = Math.random() * variation - variation / 2;
        const angle = Math.random() * 2 * Math.PI;
        balls.push(new BallClass(randomRegion.x + randomX, randomRegion.y + randomY, angle, ballRadius, startingSpeed, BASE_COLOR, ...extraArgs));
    }
    return balls;
};
}}),
"[project]/src/components/game-components/utils/TNT/BallPhysics.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "resolveCollisions": (()=>resolveCollisions),
    "resolveCollisionsWithWalls": (()=>resolveCollisionsWithWalls)
});
const resolveCollisions = (balls, currentSpeed, deltaTime)=>{
    for(let i = 0; i < balls.length; i++){
        for(let j = i + 1; j < balls.length; j++){
            const ballA = balls[i];
            const ballB = balls[j];
            const dx = ballB.x - ballA.x;
            const dy = ballB.y - ballA.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;
            // Skip if distance is too small to avoid invalid normal/tangent calculation
            if (distance < 1e-6) continue;
            // Check if balls are colliding
            if (distance < ballA.radius + ballB.radius) {
                const overlap = ballA.radius + ballB.radius - distance;
                // Separate the balls to remove overlap (scaled by deltaTime)
                const normalX = dx / distance;
                const normalY = dy / distance;
                if (isNaN(normalX) || isNaN(normalY)) continue; // Prevent invalid normals
                const separationX = normalX * overlap / 2;
                const separationY = normalY * overlap / 2;
                ballA.x -= separationX / 2;
                ballA.y -= separationY / 2;
                ballB.x += separationX / 2;
                ballB.y += separationY / 2;
                // Calculate velocities along normal and tangent
                const tangentX = -normalY;
                const tangentY = normalX;
                const velocityANormal = ballA.vx * normalX + ballA.vy * normalY;
                const velocityATangent = ballA.vx * tangentX + ballA.vy * tangentY;
                const velocityBNormal = ballB.vx * normalX + ballB.vy * normalY;
                const velocityBTangent = ballB.vx * tangentX + ballB.vy * tangentY;
                // Swap normal velocities (elastic collision)
                const newVelocityANormal = velocityBNormal;
                const newVelocityBNormal = velocityANormal;
                // Combine velocities (keep tangential component unchanged)
                ballA.vx = (newVelocityANormal * normalX + velocityATangent * tangentX) * deltaTime;
                ballA.vy = (newVelocityANormal * normalY + velocityATangent * tangentY) * deltaTime;
                ballB.vx = (newVelocityBNormal * normalX + velocityBTangent * tangentX) * deltaTime;
                ballB.vy = (newVelocityBNormal * normalY + velocityBTangent * tangentY) * deltaTime;
                // Adjust to maintain constant speed (normalize and scale)
                const magnitudeA = Math.sqrt(ballA.vx * ballA.vx + ballA.vy * ballA.vy);
                const magnitudeB = Math.sqrt(ballB.vx * ballB.vx + ballB.vy * ballB.vy);
                if (magnitudeA > 1e-6) {
                    ballA.vx = ballA.vx / magnitudeA * currentSpeed;
                    ballA.vy = ballA.vy / magnitudeA * currentSpeed;
                }
                if (magnitudeB > 1e-6) {
                    ballB.vx = ballB.vx / magnitudeB * currentSpeed;
                    ballB.vy = ballB.vy / magnitudeB * currentSpeed;
                }
            }
        }
    }
};
const resolveCollisionsWithWalls = (balls, currentSpeed, width, height, deltaTime)=>{
    balls.forEach((ball)=>{
        // Move the ball, scaling velocity by deltaTime for consistent movement
        const nextX = ball.x + ball.vx * deltaTime;
        const nextY = ball.y + ball.vy * deltaTime;
        ball.x = nextX;
        ball.y = nextY;
        // Regular wall collisions
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -1;
        }
        if (ball.x + ball.radius > width) {
            ball.x = width - ball.radius;
            ball.vx *= -1;
        }
        if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= -1;
        }
        if (ball.y + ball.radius > height) {
            ball.y = height - ball.radius;
            ball.vy *= -1;
        }
        // Maintain constant speed
        const currentSpeedMagnitude = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        if (currentSpeedMagnitude > 1e-6 && currentSpeedMagnitude !== currentSpeed) {
            const scale = currentSpeed / currentSpeedMagnitude;
            ball.vx *= scale;
            ball.vy *= scale;
        }
    });
};
}}),
"[project]/src/components/game-components/utils/TNT/BallVariants.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GlowBall": (()=>GlowBall)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/Ball.ts [app-ssr] (ecmascript)");
;
class GlowBall extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ball"] {
    strobeInterval = null;
    isGlowed;
    reactionTimesRef;
    glowIntensity;
    maxGlowIntensity;
    shadowSize;
    lastGlowedTime = 0;
    constructor(x, y, angle, ballRadius, currentSpeed, color, reactionTimesRef){
        super(x, y, angle, ballRadius, currentSpeed, color);
        this.reactionTimesRef = reactionTimesRef;
        this.isGlowed = false;
        this.glowIntensity = 0;
        this.maxGlowIntensity = 1;
        this.shadowSize = 0;
    }
    reset = ()=>{
        this.isGlowed = false;
        this.glowIntensity = 0;
        this.shadowSize = 0;
        if (this.strobeInterval) {
            clearInterval(this.strobeInterval);
            this.strobeInterval = null;
        }
    };
    glow() {
        this.isGlowed = true;
        this.lastGlowedTime = Date.now();
        this.increaseGlow();
    }
    increaseGlow() {
        this.glowIntensity = 0;
        this.shadowSize = 10;
        this.strobeInterval = setInterval(()=>{
            if (this.shadowSize < 50) {
                this.shadowSize += 1;
            } else {
                clearInterval(this.strobeInterval);
            }
        }, 100);
    }
    click(glowNextBall) {
        this.isGlowed = false;
        this.reset();
        this.reactionTimesRef.current.push(Date.now() - this.lastGlowedTime);
        glowNextBall();
    }
    getColor() {
        return this.color;
    }
    drawBall(ball, isHighlighted, ctx, isWrongBall, isCorrectBall) {
        ctx.save();
        if (this.isGlowed) {
            ctx.shadowBlur = this.shadowSize;
            ctx.shadowColor = this.color;
        }
        // Draw the ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HIGHLIGHT_COLOR"] : this.getColor();
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        ctx.restore();
        this.addMarks(ball, ctx, isWrongBall, isCorrectBall);
    }
}
}}),
"[project]/src/components/game-components/utils/Grid/Point.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Point": (()=>Point),
    "Polygon": (()=>Polygon)
});
class Point {
    row;
    col;
    x;
    y;
    isYellow = false;
    isHovered = false;
    constructor(row, col, x, y){
        this.row = row;
        this.col = col;
        this.x = x;
        this.y = y;
    }
    setYellow(isYellow) {
        this.isYellow = isYellow;
    }
    setHovered(isHovered) {
        this.isHovered = isHovered;
    }
    isEquals(other) {
        return this.x === other.x && this.y === other.y;
    }
    greaterThan(other) {
        if (this.x !== other.x) {
            return this.x > other.x;
        }
        return this.y > other.y;
    }
    toString() {
        return `${this.col},${this.row}`;
    }
    draw(ctx, showYellow, highlightColor, fadedColor) {
        ctx.fillStyle = showYellow ? this.isYellow ? highlightColor : fadedColor : "#FFFFFF";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.fill();
        if (this.isHovered) {
            ctx.strokeStyle = highlightColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 12, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}
class Polygon {
    points;
    constructor(){
        this.points = [];
    }
    addPoint(point) {
        this.points.push(point);
    }
    isEqual(polygon) {
        if (this.points.length !== polygon.points.length) {
            return false;
        }
        const sortedPoints1 = this.points.slice().sort((a, b)=>a.greaterThan(b) ? 1 : -1);
        const sortedPoints2 = polygon.points.slice().sort((a, b)=>a.greaterThan(b) ? 1 : -1);
        for(let i = 0; i < sortedPoints1.length; i++){
            if (!sortedPoints1[i].isEquals(sortedPoints2[i])) {
                return false;
            }
        }
        return true;
    }
}
}}),
"[project]/src/components/game-components/utils/Grid/Line.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Line": (()=>Line)
});
class Line {
    start;
    end;
    isHighlighted = false;
    color = "#FFFF00";
    opacity = 1;
    constructor(start, end){
        this.start = start;
        this.end = end;
    }
    setHighlighted(isHighlighted, color = "#00FF00") {
        this.isHighlighted = isHighlighted;
        this.color = color; // Green when highlighted
        this.opacity = 1; // Reset opacity to 1 when highlighted
    }
    isEquals(other) {
        return this.start.isEquals(other.start) && this.end.isEquals(other.end) || this.start.isEquals(other.end) && this.end.isEquals(other.start);
    }
    fadeOut(duration) {
        const fadeStep = 50; // Time between each fade step (ms)
        const decrement = 1 / (duration / fadeStep); // Opacity decrement per step
        const fadeInterval = setInterval(()=>{
            this.opacity -= decrement;
            if (this.opacity <= 0) {
                this.opacity = 0; // Clamp opacity at 0
                clearInterval(fadeInterval); // Stop fading
            }
        }, fadeStep);
    }
    draw(ctx) {
        ctx.strokeStyle = this.getRGBAColor();
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity; // Apply the opacity
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.globalAlpha = 1; // Reset globalAlpha after drawing
    }
    getRGBAColor() {
        // Convert hex color to RGBA with current opacity
        const hex = this.color.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    }
}
}}),
"[project]/src/components/game-components/utils/Grid/Polygons.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "detectPolygons": (()=>detectPolygons),
    "highlightAndFadePolygon": (()=>highlightAndFadePolygon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Point.ts [app-ssr] (ecmascript)");
;
const doLinesIntersect = (p1, q1, p2, q2)=>{
    // Helper to find the orientation of the triplet (p, q, r)
    // 0 -> Collinear, 1 -> Clockwise, 2 -> Counterclockwise
    const orientation = (p, q, r)=>{
        const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val === 0) return 0; // Collinear
        return val > 0 ? 1 : 2; // Clockwise or Counterclockwise
    };
    // Check if point r lies on segment pq
    const onSegment = (p, q, r)=>{
        return Math.min(p.x, q.x) <= r.x && r.x <= Math.max(p.x, q.x) && Math.min(p.y, q.y) <= r.y && r.y <= Math.max(p.y, q.y);
    };
    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);
    // General case: segments intersect
    if (o1 !== o2 && o3 !== o4) return true;
    // Special cases: collinear points
    if (o1 === 0 && onSegment(p1, q1, p2)) return true;
    if (o2 === 0 && onSegment(p1, q1, q2)) return true;
    if (o3 === 0 && onSegment(p2, q2, p1)) return true;
    if (o4 === 0 && onSegment(p2, q2, q1)) return true;
    return false; // No intersection
};
const isSimplePolygon = (polygon)=>{
    const n = polygon.length;
    // A polygon must have at least 3 points
    if (n < 3) return false;
    // Check all pairs of edges for intersection
    for(let i = 0; i < n; i++){
        for(let j = i + 1; j < n; j++){
            // Edges (p1, q1) and (p2, q2)
            const p1 = polygon[i];
            const q1 = polygon[(i + 1) % n];
            const p2 = polygon[j];
            const q2 = polygon[(j + 1) % n];
            // Skip adjacent edges (including wrap-around edge)
            if (j === i + 1 || i === 0 && j === n - 1 // First and last edges are adjacent in closed polygons
            ) {
                continue;
            }
            // Check if these two edges intersect
            if (doLinesIntersect(p1, q1, p2, q2)) {
                return false; // Invalid polygon: edges intersect
            }
        }
    }
    return true; // All edges are valid
};
const detectPolygons = (lines, completedPolygons, onPolygonDetected, onDuplicatePolygon, onCyclicPolygonDetected)=>{
    const adjList = new Map();
    const detectedPolygons = new Set(); // Track unique polygons using a stringified key
    // Helper to generate a unique key for a polygon
    const generatePolygonKey = (polygon)=>{
        const sortedPoints = Array.from(polygon.points).map((p)=>`${p.x},${p.y}`).sort(); // Sort to ensure consistent key
        return sortedPoints.join("-");
    };
    // Build adjacency list
    lines.forEach((line)=>{
        if (!adjList.has(line.start)) adjList.set(line.start, new Set());
        if (!adjList.has(line.end)) adjList.set(line.end, new Set());
        adjList.get(line.start).add(line.end);
        adjList.get(line.end).add(line.start);
    });
    const visited = new Set();
    const stack = [];
    const dfs = (current, start, path)=>{
        stack.push(current);
        adjList.get(current)?.forEach((neighbor)=>{
            if (neighbor === start && path.length >= 3) {
                // Complete cycle found
                const polygon = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Polygon"]();
                stack.forEach((point)=>polygon.addPoint(point));
                const polygonKey = generatePolygonKey(polygon);
                if (!detectedPolygons.has(polygonKey)) {
                    detectedPolygons.add(polygonKey);
                    const polygonArray = Array.from(polygon.points);
                    if (!isSimplePolygon(polygonArray)) {
                        onCyclicPolygonDetected(polygon);
                        return;
                    }
                    if (!completedPolygons.some((p)=>generatePolygonKey(p) === polygonKey)) {
                        onPolygonDetected(polygon);
                    } else {
                        onDuplicatePolygon(polygon);
                    }
                }
                return;
            }
            if (!path.includes(neighbor)) {
                dfs(neighbor, start, [
                    ...path,
                    neighbor
                ]);
            }
        });
        stack.pop();
    };
    adjList.forEach((_, point)=>{
        if (!visited.has(point)) {
            dfs(point, point, [
                point
            ]);
            visited.add(point);
        }
    });
    return detectedPolygons.size > 0 ? null : null;
};
const highlightAndFadePolygon = (polygon, lines, color = "#00FF00" // Default to green
)=>{
    const linesToFade = [];
    // Find and highlight lines forming the polygon
    lines.forEach((line)=>{
        if (polygon.points.includes(line.start) && polygon.points.includes(line.end)) {
            line.setHighlighted(true, color); // Highlight with the specified color
            linesToFade.push(line);
        }
    });
    // Fade out the lines over 1 second
    setTimeout(()=>{
        linesToFade.forEach((line)=>{
            line.fadeOut(1000);
        });
    }, 0);
};
}}),
"[project]/src/components/game-components/utils/Countdown.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Countdown": (()=>Countdown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const Countdown = ({ onCountdownEnd })=>{
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (count > 0) {
            const timer = setTimeout(()=>setCount(count - 1), 900);
            return ()=>clearTimeout(timer);
        } else {
            const timer = setTimeout(()=>onCountdownEnd(), 900);
            return ()=>clearTimeout(timer);
        }
    }, [
        count,
        onCountdownEnd
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center h-screen w-screen bg-game-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-white text-9xl font-bold",
            children: count > 0 ? count : "Start!"
        }, void 0, false, {
            fileName: "[project]/src/components/game-components/utils/Countdown.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game-components/utils/Countdown.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
}}),
"[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
;
;
}}),
"[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/Ball.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallPhysics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/BallPhysics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallVariants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/BallVariants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Point.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Line$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Line.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Polygons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Polygons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Countdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Countdown.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/components/game-components/modals/TrialCompletedDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const TrialCompleteDialog = ({ onStart, onShowInstructions, nextTrialNum, isPractice, totalTrials })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white border-white border rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl lg:text-4xl text-white",
                    children: [
                        isPractice && "Practice",
                        " Trial ",
                        nextTrialNum - 1,
                        " of ",
                        totalTrials,
                        " ",
                        "completed"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-gray-300",
                        children: [
                            "Next up: ",
                            isPractice && "Practice",
                            " Trial ",
                            nextTrialNum
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onStart,
                            children: "Start Next Trial"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onShowInstructions,
                            className: "bg-gray-700",
                            children: "Show Instructions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game-components/modals/TrialCompletedDialog.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = TrialCompleteDialog;
}}),
"[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const PracticeCompleteDialog = ({ onStart, onShowInstructions })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white border-white border-2 rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-5xl pb-10",
                    children: "Practice Complete"
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onStart,
                            className: "rounded-lg",
                            children: "Start Test"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onShowInstructions,
                            className: "bg-gray-700 rounded-lg",
                            children: "Show Instructions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
            lineNumber: 10,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = PracticeCompleteDialog;
}}),
"[project]/src/components/game-components/modals/ThankyouDialog.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const ThankYouDialog = ({ redirectLink = "/" })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (redirectLink) {
            const timer = setTimeout(()=>{
                router.push(redirectLink);
            }, 3000);
            return ()=>clearTimeout(timer); // Cleanup timer on unmount
        } else {
            console.error("Invalid redirect link:", redirectLink);
        }
    }, [
        redirectLink,
        router
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-game-background absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-white border-white border-2 rounded-xl w-1/2 h-1/2 flex flex-col items-center justify-center py-32",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-5xl pb-10",
                    children: "Thank You for playing!"
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/modals/ThankyouDialog.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xl pb-10",
                    children: "Redirecting you now..."
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/modals/ThankyouDialog.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/modals/ThankyouDialog.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/game-components/modals/ThankyouDialog.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ThankYouDialog;
}}),
"[project]/src/components/game-components/gameSequence.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const gameSequence = [
    "67543160ab5e87f35d19460f",
    "6754316bab5e87f35d194610",
    "67543176ab5e87f35d194611"
];
const __TURBOPACK__default__export__ = gameSequence;
}}),
"[project]/src/lib/api/apiClient.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "apiClient": (()=>apiClient)
});
const apiClient = async (endpoint, { method = "GET", body, headers } = {})=>{
    const response = await fetch(endpoint, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(`API request failed: ${JSON.stringify(responseData)}`);
    }
    return responseData;
};
}}),
"[project]/src/components/game-components/utils/EventHandler.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
class EventHandler {
    target;
    listeners;
    constructor(target){
        this.target = target;
        this.listeners = new Map();
    }
    add(eventType, callback) {
        const listener = callback; // Generic casting
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(listener);
        this.target.addEventListener(eventType, listener);
    }
    remove(eventType, callback) {
        const listener = callback;
        if (this.listeners.has(eventType)) {
            const callbacks = this.listeners.get(eventType);
            const index = callbacks.indexOf(listener);
            if (index !== -1) {
                callbacks.splice(index, 1);
                this.target.removeEventListener(eventType, listener);
            }
        }
    }
    removeAll() {
        this.listeners.forEach((callbacks, eventType)=>{
            callbacks.forEach((callback)=>{
                this.target.removeEventListener(eventType, callback);
            });
        });
        this.listeners.clear();
    }
}
const __TURBOPACK__default__export__ = EventHandler;
}}),
"[project]/src/components/game-components/Game.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$InstructionDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/InstructionDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/GameIntroDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$TrialCompletedDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/TrialCompletedDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$PracticeCompleteDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/PracticeCompleteDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$ThankyouDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/modals/ThankyouDialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$gameSequence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/gameSequence.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/api/apiClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$EventHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/EventHandler.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Countdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Countdown.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
class Game extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    canvasRef = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"])();
    ctxRef = {
        current: null
    };
    animationFrameIdRef = {
        current: 0
    };
    paramsRef = {
        current: null
    };
    renderGame() {}
    gameId;
    eventHandler = null;
    timerIntervalRef = {
        current: null
    };
    showTimer = -1;
    gameEndTimeRef = {
        current: 0
    };
    data;
    gameTimeout = null;
    rapidTrials = false;
    getHUD = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
            fileName: "[project]/src/components/game-components/Game.tsx",
            lineNumber: 63,
            columnNumber: 31
        }, this);
    animate = (timestamp)=>{
        void timestamp;
    };
    constructor(props){
        super(props);
        this.gameId = props.gameId;
        this.state = {
            trial: 1,
            showGameIntro: true,
            showInstructions: true,
            showCountdown: false,
            isRunning: false,
            isPractice: true,
            showPracticeComplete: false,
            showTrialComplete: false,
            showReset: false,
            showThankYou: false
        };
        this.data = {};
        this.paramsRef.current = props.gameInfo.parameters[0].data;
    }
    skipPractice = ()=>{
        this.stopTimer();
        this.setState({
            trial: 1,
            showInstructions: false,
            isPractice: false,
            showCountdown: true,
            showTrialComplete: false,
            showPracticeComplete: false
        });
    };
    onSubmit = async ()=>{
        const playerId = sessionStorage.getItem("playerId") || "6773dbc4add5c628e515c538";
        if (!playerId || !this.gameId || !this.data) {
            return;
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$apiClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiClient"])("/api/game-observations", {
            method: "POST",
            body: {
                data: this.data,
                gameId: this.gameId,
                playerId
            }
        });
    };
    componentDidMount() {
        this.ctxRef.current = this.canvasRef.current.getContext("2d");
        this.canvasRef.current.width = window.innerWidth;
        this.canvasRef.current.height = window.innerHeight;
        this.canvasRef.current.setAttribute("tabindex", "0");
        this.canvasRef.current.focus();
        this.eventHandler = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$EventHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](this.canvasRef.current);
    }
    addEventListenersDuringGame = ()=>{};
    addEventListenersAfterGame = ()=>{};
    componentDidUpdate(prevProps, prevState) {
        void prevProps;
        if (this.canvasRef.current && !prevState.isRunning && this.state.isRunning) {
            this.canvasRef.current?.focus();
            this.renderGame();
            this.eventHandler?.removeAll();
            this.addEventListenersDuringGame();
            this.gameTimeout = setTimeout(()=>{
                this.resetGame();
                this.eventHandler?.removeAll();
                this.addEventListenersAfterGame();
                this.gameEndTimeRef.current = Date.now();
            }, this.paramsRef.current.duration * 1000);
            this.startTimer(this.paramsRef.current.duration);
        }
        if (prevState.trial !== this.state.trial) {
            this.handleTrialCompletion();
        }
    }
    startTimer(duration) {
        this.showTimer = duration; // Initialize timer
        if (this.timerIntervalRef.current) {
            clearInterval(this.timerIntervalRef.current);
        }
        this.timerIntervalRef.current = setInterval(()=>{
            if (this.showTimer > 0) {
                this.showTimer -= 1; // Decrement timer
                this.forceUpdate();
            } else {
                if (this.timerIntervalRef.current) {
                    clearInterval(this.timerIntervalRef.current);
                }
            }
        }, 1000);
    }
    stopTimer() {
        if (this.gameTimeout) {
            clearTimeout(this.gameTimeout);
            this.gameTimeout = null;
        }
        if (this.timerIntervalRef.current) {
            clearInterval(this.timerIntervalRef.current); // Cleanup interval
            this.timerIntervalRef.current = null;
        }
    }
    componentWillUnmount() {
        this.stopTimer();
        this.stopAnimationLoop();
        // Cancel animation frame
        if (this.animationFrameIdRef.current) {
            cancelAnimationFrame(this.animationFrameIdRef.current);
        }
        // Remove all event listeners
        this.eventHandler?.removeAll();
    }
    drawBackground() {
        const ctx = this.ctxRef.current;
        const canvas = this.canvasRef.current;
        ctx.fillStyle = "#1B1B1B";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    handleTrialCompletion() {
        if (this.paramsRef.current?.duration) {
            this.showTimer = this.paramsRef.current.duration;
        }
        if (this.state.isPractice) {
            if (this.state.trial === this.paramsRef.current.practiceTrials + 1) {
                this.setState({
                    trial: 1,
                    showPracticeComplete: true,
                    showReset: false,
                    isPractice: false
                });
            } else if (this.state.trial !== 1) {
                this.setState({
                    showTrialComplete: !this.rapidTrials,
                    isRunning: this.rapidTrials,
                    showReset: false
                });
            }
        } else if (this.state.trial !== 1) {
            if (this.state.trial === this.paramsRef.current.trials + 1) {
                this.onSubmit();
                this.setState({
                    showThankYou: true,
                    showReset: false,
                    showCountdown: false
                });
            } else {
                this.setState({
                    showTrialComplete: !this.rapidTrials,
                    isRunning: this.rapidTrials,
                    showReset: false
                });
            }
        }
    }
    resetGame() {
        this.stopAnimationLoop();
        this.setState({
            isRunning: false
        });
        this.stopTimer();
        this.showTimer = 0;
    }
    getBaseHUD() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-10 right-10 text-white text-lg",
            children: [
                this.showTimer === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            this.state.isPractice ? `Practice Trial ${this.state.trial} of ${this.paramsRef.current.practiceTrials}` : `Trial ${this.state.trial} of ${this.paramsRef.current.trials}`,
                            " "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/game-components/Game.tsx",
                        lineNumber: 251,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this) : "",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "mt-3",
                    children: this.getHUD()
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/Game.tsx",
            lineNumber: 248,
            columnNumber: 7
        }, this);
    }
    getNextgameId() {
        const thisGameIndex = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$gameSequence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].findIndex((gameId)=>gameId === this.gameId);
        if (thisGameIndex === -1 || thisGameIndex === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$gameSequence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].length - 1) return "/";
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$gameSequence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"][thisGameIndex + 1];
    }
    startAnimationLoop() {
        if (!this.animationFrameIdRef.current) {
            this.animationFrameIdRef.current = requestAnimationFrame(this.animate);
        }
    }
    stopAnimationLoop() {
        if (this.animationFrameIdRef.current) {
            cancelAnimationFrame(this.animationFrameIdRef.current);
            this.animationFrameIdRef.current = null;
        }
    }
    render() {
        const totalTrials = this.state.isPractice ? this.paramsRef.current.practiceTrials : this.paramsRef.current.trials;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-screen h-screen overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                    ref: this.canvasRef,
                    className: "block outline-none",
                    tabIndex: 0
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 291,
                    columnNumber: 9
                }, this),
                this.state.showCountdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Countdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Countdown"], {
                    onCountdownEnd: ()=>this.setState({
                            showCountdown: false,
                            isRunning: true
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 297,
                    columnNumber: 11
                }, this),
                this.state.showGameIntro && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$GameIntroDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    gameInfo: this.props.gameInfo,
                    onStart: ()=>this.setState({
                            showCountdown: true,
                            showGameIntro: false
                        }),
                    onShowInstructions: ()=>this.setState({
                            showGameIntro: false,
                            showInstructions: true
                        }),
                    skipPractice: this.skipPractice
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 304,
                    columnNumber: 11
                }, this),
                this.state.showInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$InstructionDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    gameInfo: this.props.gameInfo,
                    onClose: ()=>this.setState({
                            showInstructions: false
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 318,
                    columnNumber: 11
                }, this),
                this.state.showTrialComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$TrialCompletedDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onStart: ()=>this.setState({
                            showCountdown: true,
                            showTrialComplete: false
                        }),
                    onShowInstructions: ()=>this.setState({
                            showInstructions: true,
                            showTrialComplete: false
                        }),
                    nextTrialNum: this.state.trial,
                    isPractice: this.state.isPractice,
                    totalTrials: totalTrials
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 324,
                    columnNumber: 11
                }, this),
                this.state.showPracticeComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$PracticeCompleteDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    onStart: ()=>{
                        this.setState({
                            showCountdown: true,
                            showPracticeComplete: false
                        });
                    },
                    onShowInstructions: ()=>this.setState({
                            showInstructions: true,
                            showPracticeComplete: false
                        })
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 340,
                    columnNumber: 11
                }, this),
                this.state.showThankYou && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$modals$2f$ThankyouDialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    redirectLink: this.getNextgameId()
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/Game.tsx",
                    lineNumber: 356,
                    columnNumber: 11
                }, this),
                this.getBaseHUD()
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/Game.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, this);
    }
}
const __TURBOPACK__default__export__ = Game;
}}),
"[project]/src/components/game-components/games/Arrow.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/Game.tsx [app-ssr] (ecmascript)");
"use client";
;
const CORRECT_COLOR = "#00FF00"; // Green for correct
const INCORRECT_COLOR = "#FF0000"; // Red for incorrect
const STROKE_COLOR = "#EEEEEE"; // Normal gray colour
class ArrowGame extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    answersRef = {
        current: []
    };
    arrowDisplayTimeRef = {
        current: 0
    };
    state = {
        ...this.state,
        primeTime: 33,
        reactionTime: 0
    };
    correctDirection = "right";
    rapidTrials = true;
    arrowShaftLength = 100;
    arrowWingLength = 20;
    lineWidth = 3;
    plusSize = 50;
    topFlankDirection = "right";
    bottomFlankDirection = "right";
    hasAnswered = false;
    constructor(props){
        super(props);
        this.data = {
            scores: []
        };
    }
    drawRandomLines() {
        const ctx = this.ctxRef.current;
        const canvas = this.canvasRef.current;
        ctx.strokeStyle = STROKE_COLOR;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1;
        console.log(ctx.strokeStyle);
        for(let i = 0; i < 100; i++){
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = Math.random() * canvas.width;
            const y2 = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    drawArrow(x, y, direction, color = STROKE_COLOR) {
        const ctx = this.ctxRef.current;
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        const offsetDir = direction === "right" ? -1 : 1;
        const startX = x + offsetDir * this.arrowShaftLength / 2;
        const endX = x - offsetDir * this.arrowShaftLength / 2;
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        const wingAngle = Math.PI / 6;
        const wingX = Math.cos(wingAngle) * this.arrowWingLength;
        const wingY = Math.sin(wingAngle) * this.arrowWingLength;
        ctx.moveTo(endX, y);
        ctx.lineTo(endX + offsetDir * wingX, y - wingY);
        ctx.moveTo(endX, y);
        ctx.lineTo(endX + offsetDir * wingX, y + wingY);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = STROKE_COLOR;
        ctx.strokeStyle = STROKE_COLOR;
    }
    drawPrime = this.drawArrow;
    addEventListenersAfterGame = ()=>{
        this.eventHandler.add("click", this.handleMouseClick);
        this.eventHandler.add("keydown", this.handleKeyPress);
        this.eventHandler.add("touchstart", this.handleTouchStart);
    };
    handleMouseClick = (event)=>{
        if (this.hasAnswered) return;
        this.hasAnswered = true;
        const canvas = this.canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const canvasMid = canvas.width / 2;
        const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
        const clickedDirection = clickX < canvasMid ? "left" : "right";
        this.checkAnswer(clickedDirection, reactionTime);
    };
    handleKeyPress = (event)=>{
        if (this.hasAnswered) return;
        const validKeys = [
            "ArrowLeft",
            "ArrowRight",
            "p",
            "q"
        ];
        if (!validKeys.includes(event.key)) return;
        this.hasAnswered = true;
        const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
        let clickedDirection;
        if (event.key === "ArrowLeft" || event.key === "q") {
            clickedDirection = "left";
        } else if (event.key === "ArrowRight" || event.key === "p") {
            clickedDirection = "right";
        } else {
            return; // Ignore other keys
        }
        this.checkAnswer(clickedDirection, reactionTime);
    };
    handleTouchStart = (event)=>{
        if (this.hasAnswered) return;
        this.hasAnswered = true;
        const canvas = this.canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const touchX = event.touches[0].clientX - rect.left;
        const canvasMid = canvas.width / 2;
        const reactionTime = Date.now() - this.arrowDisplayTimeRef.current;
        const clickedDirection = touchX < canvasMid ? "left" : "right";
        this.checkAnswer(clickedDirection, reactionTime);
    };
    checkAnswer = (clickedDirection, reactionTime)=>{
        const isCorrect = clickedDirection === this.correctDirection;
        this.data.scores.push({
            accuracy: isCorrect,
            reactionTime: reactionTime,
            primerDir: this.correctDirection,
            topFlankerDir: this.topFlankDirection,
            bottomFlankerDir: this.bottomFlankDirection
        });
        this.updateAnswer(isCorrect);
    };
    updateAnswer = (isCorrect)=>{
        const canvas = this.canvasRef.current;
        this.drawBackground();
        const midX = canvas.width / 2;
        const midY = canvas.height / 2;
        this.drawPrime(midX, midY, this.correctDirection, isCorrect ? CORRECT_COLOR : INCORRECT_COLOR);
        this.answersRef.current.push(isCorrect);
        setTimeout(()=>{
            this.hasAnswered = false;
            this.setState({
                trial: this.state.trial + 1
            });
        }, 1000);
    };
    drawPlus() {
        const canvas = this.canvasRef.current;
        const ctx = this.ctxRef.current;
        const midX = canvas.width / 2;
        const midY = canvas.height / 2;
        // Set the fill color for the plus sign
        ctx.fillStyle = STROKE_COLOR;
        // Calculate the dimensions of the horizontal and vertical bars
        const barThickness = this.plusSize / 10; // Thickness of the bars
        const halfSize = this.plusSize / 2;
        // Adjust Y-coordinate for proper centering
        const verticalBarTop = midY - halfSize;
        const horizontalBarTop = midY - barThickness / 2;
        // Draw the vertical bar
        ctx.fillRect(midX - barThickness / 2, verticalBarTop, barThickness, this.plusSize);
        // Draw the horizontal bar
        ctx.fillRect(midX - halfSize, horizontalBarTop, this.plusSize, barThickness);
    }
    renderGame() {
        const canvas = this.canvasRef.current;
        const midX = canvas.width / 2;
        const midY = canvas.height / 2;
        this.correctDirection = Math.random() < 0.5 ? "left" : "right";
        this.topFlankDirection = Math.random() < 0.5 ? "left" : "right";
        this.bottomFlankDirection = Math.random() < 0.5 ? "left" : "right";
        // Display sequence
        this.drawBackground();
        // Draw the centered plus sign
        this.drawPlus();
        setTimeout(()=>{
            this.drawBackground();
            this.drawRandomLines();
            setTimeout(()=>{
                this.drawBackground();
                // Draw the prime arrow in the center
                this.drawPrime(midX, midY, this.correctDirection);
                // Add offsets for flanking arrows
                const flankOffset = this.arrowShaftLength + 20; // Space between arrows
                this.drawPrime(midX, midY - flankOffset, this.topFlankDirection);
                this.drawPrime(midX, midY + flankOffset, this.bottomFlankDirection);
                this.arrowDisplayTimeRef.current = Date.now();
                this.addEventListenersAfterGame();
                if (!this.hasAnswered) {
                    setTimeout(()=>{
                        if (!this.hasAnswered) {
                            this.drawBackground();
                            this.drawRandomLines();
                            setTimeout(()=>{
                                if (!this.hasAnswered) {
                                    this.drawBackground();
                                    this.drawPrime(midX, midY - (2 * this.arrowWingLength + 10), this.topFlankDirection);
                                    this.drawPrime(midX, midY, this.correctDirection);
                                    this.drawPrime(midX, midY + (2 * this.arrowWingLength + 10), this.bottomFlankDirection);
                                }
                            }, 33);
                        }
                    }, this.state.primeTime);
                }
            }, 200);
        }, 750);
    }
}
const __TURBOPACK__default__export__ = ArrowGame;
}}),
"[project]/src/components/game-components/games/Grid.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/Game.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Point.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Line$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Line.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Polygons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/Grid/Polygons.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const HIGHLIGHT_COLOR = "#FFFF00";
const FADED_COLOR = "rgba(255, 255, 255, 0.2)";
class GridGame extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    // Grid
    gridSizeRef = {
        current: 5
    };
    gridTotalSizeRef = {
        current: 600
    };
    // Points
    pointsRef = {
        current: []
    };
    yellowPointsRef = {
        current: []
    };
    hoveredPointRef = {
        current: null
    };
    showYellowRef = {
        current: false
    };
    interactivityRadius = 30;
    // Lines
    currentLineRef = {
        current: null
    };
    linesRef = {
        current: []
    };
    state = {
        ...this.state,
        completedPolygons: {},
        duplicatePolygons: {}
    };
    constructor(props){
        super(props);
        this.data = [];
    }
    addEventListenersDuringGame = ()=>{
        this.eventHandler.add("mousedown", this.handleInteractionStart);
        this.eventHandler.add("mousemove", this.handleIntearctionMove);
        this.eventHandler.add("mouseup", this.handleInteractionEnd);
        this.eventHandler.add("touchstart", this.handleInteractionStart);
        this.eventHandler.add("touchmove", this.handleIntearctionMove);
        this.eventHandler.add("touchend", this.handleInteractionEnd);
    };
    calculateDistance(p1, p2) {
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        return distance;
    }
    initializePoints() {
        const gridSize = this.gridSizeRef.current;
        const gridTotalSize = this.gridTotalSizeRef.current;
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const cellSize = gridTotalSize / (gridSize - 1);
        const startX = (canvas.width - gridTotalSize) / 2;
        const startY = (canvas.height - gridTotalSize) / 2;
        const points = [];
        for(let row = 0; row < gridSize; row++){
            const rowPoints = [];
            for(let col = 0; col < gridSize; col++){
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;
                rowPoints.push(new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Point$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Point"](row, col, x, y));
            }
            points.push(rowPoints);
        }
        this.pointsRef.current = points;
    }
    drawLine(start, end) {
        const ctx = this.ctxRef.current;
        if (start && end) {
            ctx.strokeStyle = HIGHLIGHT_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
    drawLines() {
        this.linesRef.current.forEach((line)=>line.draw(this.ctxRef.current));
        if (this.currentLineRef.current) {
            this.currentLineRef.current.draw(this.ctxRef.current);
        }
    }
    drawGrid() {
        const ctx = this.ctxRef.current;
        const points = this.pointsRef.current;
        const showYellow = this.showYellowRef.current;
        points.flat().forEach((point)=>point.draw(ctx, showYellow, HIGHLIGHT_COLOR, FADED_COLOR));
    }
    generateYellowPoints() {
        const gridSize = this.gridSizeRef.current;
        const yellowPoints = [];
        // Helper function to check if three points are collinear
        const areCollinear = (p1, p2, p3)=>{
            // Use the area of the triangle formed by the three points
            // If the area is 0, they are collinear
            return p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y) === 0;
        };
        // Check if adding a new point violates the collinearity constraint
        const isValidPoint = (newPoint)=>{
            for(let i = 0; i < yellowPoints.length; i++){
                for(let j = i + 1; j < yellowPoints.length; j++){
                    if (areCollinear(yellowPoints[i], yellowPoints[j], newPoint)) {
                        return false; // Found three collinear points
                    }
                }
            }
            return true; // No collinearity issues
        };
        while(yellowPoints.length < 5){
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const point = this.pointsRef.current[row][col];
            if (!point.isYellow && isValidPoint(point)) {
                point.setYellow(true);
                yellowPoints.push(point);
            }
        }
        this.yellowPointsRef.current = yellowPoints;
        this.gameEndTimeRef.current = Date.now();
    }
    getHUD = ()=>{
        return this.state.isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Completed Polygons:",
                        " ",
                        Object.values(this.state.completedPolygons).length
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/game-components/games/Grid.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: this.resetLines,
                        className: "text-xl w-full mt-3",
                        children: "Reset Lines"
                    }, void 0, false, {
                        fileName: "[project]/src/components/game-components/games/Grid.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/game-components/games/Grid.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/game-components/games/Grid.tsx",
            lineNumber: 182,
            columnNumber: 7
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
            fileName: "[project]/src/components/game-components/games/Grid.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this);
    };
    resetLines = ()=>{
        this.linesRef.current = [];
        this.currentLineRef.current = null;
    };
    animate = ()=>{
        if (!this.canvasRef.current) return;
        this.drawBackground();
        this.drawGrid();
        this.drawLines();
        this.animationFrameIdRef.current = requestAnimationFrame(this.animate);
    };
    getInteractionPos = (event)=>{
        const rect = this.canvasRef.current.getBoundingClientRect();
        if (event instanceof MouseEvent) {
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        } else {
            const touch = event.touches[0];
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        }
    };
    handleInteractionStart = (event)=>{
        const { x, y } = this.getInteractionPos(event);
        this.yellowPointsRef.current.forEach((point)=>{
            const distance = this.calculateDistance({
                x,
                y
            }, point);
            if (distance <= this.interactivityRadius) {
                this.currentLineRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Line$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](point, point);
            }
        });
    };
    handleIntearctionMove = (event)=>{
        const { x, y } = this.getInteractionPos(event);
        if (this.currentLineRef.current) {
            this.currentLineRef.current.end = {
                x,
                y
            };
        }
        // Hover detection
        this.pointsRef.current.flat().forEach((point)=>{
            const distance = this.calculateDistance({
                x,
                y
            }, point);
            point.setHovered(distance <= this.interactivityRadius && point.isYellow);
        });
        const start = this.currentLineRef.current?.start;
        if (start) {
            // Draw a temporary line
            this.drawBackground();
            this.drawGrid();
            // Check for proximity to yellow points
            this.yellowPointsRef.current.forEach((point)=>{
                const distance = this.calculateDistance({
                    x,
                    y
                }, point);
                if (distance <= this.interactivityRadius) {
                    if (this.currentLineRef.current.start == point) {
                        return;
                    }
                    const newLine = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Line$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"](start, point);
                    // Avoid duplicate lines
                    if (!this.linesRef.current.some((line)=>line.isEquals(newLine))) {
                        this.linesRef.current.push(newLine); // Add the new line
                        this.currentLineRef.current.start = point; // Update the starting point
                        // Polygon detection after a valid line
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Polygons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectPolygons"])(this.linesRef.current, Object.values(this.state.completedPolygons), this.newPolygonDetected, this.duplicatePolygonDetected, this.nonCyclicPolygonDetected);
                    }
                }
            });
        }
        // Final redraw
        this.drawBackground();
        this.drawGrid();
        this.drawLines();
    };
    newPolygonDetected = (newPolygon)=>{
        const updatedPolygons = this.state.completedPolygons;
        updatedPolygons[Date.now() - this.gameEndTimeRef.current] = newPolygon;
        this.setState({
            completedPolygons: updatedPolygons
        });
        // Highlight and fade the polygon
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Polygons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["highlightAndFadePolygon"])(newPolygon, this.linesRef.current);
        setTimeout(()=>{
            this.linesRef.current = [];
        }, 100);
    };
    duplicatePolygonDetected = (polygon)=>{
        const duplicatePolygons = this.state.duplicatePolygons;
        duplicatePolygons[Date.now() - this.gameEndTimeRef.current] = polygon;
        this.setState({
            duplicatePolygons: duplicatePolygons
        });
        // Highlight duplicate polygons in red
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$Grid$2f$Polygons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["highlightAndFadePolygon"])(polygon, this.linesRef.current, "#FF0000");
        setTimeout(()=>{
            this.linesRef.current = [];
        }, 100);
    };
    nonCyclicPolygonDetected = (polygon)=>{
        this.duplicatePolygonDetected(polygon);
    };
    handleInteractionEnd = ()=>{
        this.currentLineRef.current = null; // Clear the starting point
    };
    resetGame() {
        this.currentLineRef.current = null;
        this.linesRef.current = [];
        const polygonsData = Object.entries(this.state.completedPolygons).reduce((acc, [key, val])=>{
            acc[Number(key)] = {
                points: val.points.map((point)=>({
                        row: point.row,
                        col: point.col
                    }))
            };
            return acc;
        }, {});
        const duplicatePolygonsData = Object.entries(this.state.duplicatePolygons).reduce((acc, [key, val])=>{
            acc[Number(key)] = {
                points: val.points.map((point)=>({
                        row: point.row,
                        col: point.col
                    }))
            };
            return acc;
        }, {});
        this.data = [
            ...this.data,
            {
                polygons: polygonsData,
                duplicatePolygons: duplicatePolygonsData,
                yellowPoints: this.yellowPointsRef.current.map((yellowPoint)=>({
                        row: yellowPoint.row,
                        col: yellowPoint.col
                    }))
            }
        ];
        super.resetGame();
        this.setState({
            completedPolygons: {},
            duplicatePolygons: {},
            trial: this.state.trial + 1
        });
    }
    renderGame() {
        this.drawBackground();
        this.initializePoints();
        this.drawGrid();
        setTimeout(()=>{
            this.generateYellowPoints();
            this.showYellowRef.current = true;
            this.drawBackground();
            this.drawGrid();
        }, 1000);
        // Start the animation loop
        this.startAnimationLoop();
    }
}
const __TURBOPACK__default__export__ = GridGame;
}}),
"[project]/src/components/game-components/games/TNT.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/Game.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/Ball.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallPhysics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/BallPhysics.ts [app-ssr] (ecmascript)");
"use client";
;
;
class TNT extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$Game$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    ballsRef = {
        current: []
    };
    ballSizeRef = {
        current: 50
    };
    state = {
        ...this.state,
        vts: 0
    };
    wrongBallsRef = {
        current: []
    };
    correctBallsRef = {
        current: []
    };
    highlightedBallsRef = {
        current: []
    };
    actualBallsRef = {
        current: []
    };
    clickedBallsRef = {
        current: new Set()
    };
    trialTimeSinceClick = {
        current: 0
    };
    currentTrialClickTimes = {
        current: []
    };
    currentSpeedRef = {
        current: 0.01
    };
    lastTimestampRef = {
        current: 0
    };
    constructor(props){
        super(props);
        this.data = {
            scores: [],
            reactionTimes: []
        };
    }
    createBalls() {
        this.ballsRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBalls"])(this.canvasRef.current, this.ballSizeRef.current, this.paramsRef.current.numOfBalls, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Ball"]);
    }
    setup() {
        this.ballSizeRef.current = Math.max(Math.round(window.innerWidth / 27), 40);
        this.createBalls();
        const uniqueIndices = new Set();
        while(uniqueIndices.size < 4){
            uniqueIndices.add(Math.floor(Math.random() * this.ballsRef.current.length));
        }
        this.highlightedBallsRef.current = Array.from(uniqueIndices);
        this.actualBallsRef.current = this.highlightedBallsRef.current;
    }
    update = (deltaTime)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallPhysics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveCollisionsWithWalls"])(this.ballsRef.current, this.currentSpeedRef.current, this.canvasRef.current.width, this.canvasRef.current.height, deltaTime);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallPhysics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveCollisions"])(this.ballsRef.current, this.currentSpeedRef.current, deltaTime);
        this.ballsRef.current.forEach((ball, index)=>{
            ball.drawBall(ball, this.highlightedBallsRef.current.includes(index), this.ctxRef.current, this.wrongBallsRef.current && this.wrongBallsRef.current.includes(index), this.correctBallsRef.current && this.correctBallsRef.current.includes(index));
        });
    };
    resetGame() {
        super.resetGame();
        this.currentSpeedRef.current = 0.01;
        this.ballsRef.current.forEach((ball)=>ball.reset());
    }
    resetSelection = ()=>{
        this.clickedBallsRef.current.clear();
        this.highlightedBallsRef.current = [];
        this.update(0);
    };
    animate = (timestamp)=>{
        if (!this.canvasRef.current) return;
        if (!this.lastTimestampRef.current) this.lastTimestampRef.current = timestamp;
        const deltaTime = Math.max(Math.min((timestamp - this.lastTimestampRef.current) / 1000, 1), 1e-6);
        this.lastTimestampRef.current = timestamp;
        this.drawBackground();
        this.update(deltaTime);
        if (this.state.isRunning) {
            requestAnimationFrame(this.animate);
        }
    };
    renderGame() {
        this.setup();
        this.startAnimationLoop();
        setTimeout(()=>{
            this.currentSpeedRef.current = this.paramsRef.current.startingVts;
            this.highlightedBallsRef.current = [];
            this.currentTrialClickTimes.current = [];
        }, 1000);
    }
    calculateScore = (selected, actual)=>{
        let score = 0;
        const wrongBalls = [];
        const correctBalls = [];
        selected.forEach((selectedBall)=>{
            if (actual.includes(selectedBall)) {
                score++;
                correctBalls.push(selectedBall);
            } else {
                wrongBalls.push(selectedBall);
            }
        });
        return {
            score: score,
            wrongBalls: wrongBalls,
            correctBalls: correctBalls
        };
    };
    addEventListenersAfterGame = ()=>{
        this.trialTimeSinceClick.current = performance.now();
        this.eventHandler.add("click", this.handleMouseClickAfterGame);
    };
    handleMouseClickAfterGame = (event)=>{
        if (this.clickedBallsRef.current.size >= 4) {
            return;
        }
        const currentClickTime = performance.now();
        const rect = this.canvasRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        this.ballsRef.current.forEach((ball, index)=>{
            const dx = mouseX - ball.x;
            const dy = mouseY - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius) {
                if (this.clickedBallsRef.current.has(index)) {
                    this.clickedBallsRef.current.delete(index);
                    this.highlightedBallsRef.current = this.highlightedBallsRef.current.filter((el)=>el !== index);
                    return;
                }
                this.clickedBallsRef.current.add(index);
                this.highlightedBallsRef.current.push(index);
                const reactionTime = currentClickTime - this.trialTimeSinceClick.current;
                this.trialTimeSinceClick.current = currentClickTime;
                this.currentTrialClickTimes.current.push(reactionTime);
                if (this.clickedBallsRef.current.size === 4) {
                    // Remove the event listener immediately to avoid extra clicks
                    window.removeEventListener("click", this.handleMouseClickAfterGame);
                    // Calculate the score
                    const { score, wrongBalls, correctBalls } = this.calculateScore(Array.from(this.clickedBallsRef.current), this.actualBallsRef.current);
                    this.wrongBallsRef.current = wrongBalls;
                    this.correctBallsRef.current = correctBalls;
                    this.data.scores = [
                        ...this.data.scores,
                        score
                    ];
                    this.data.reactionTimes.push({
                        clickTimes: [
                            ...this.currentTrialClickTimes.current
                        ]
                    });
                    if (score === 4) {
                        this.setState({
                            vts: this.state.vts + this.paramsRef.current.changeInVts
                        });
                    } else if (this.state.vts > 50) {
                        this.setState({
                            vts: this.state.vts - this.paramsRef.current.changeInVts
                        });
                    }
                    // Add a delay before clearing and resetting
                    setTimeout(()=>{
                        this.clickedBallsRef.current.clear();
                        this.wrongBallsRef.current = [];
                        this.correctBallsRef.current = [];
                        if (this.state.isPractice && this.state.trial + 1 > this.paramsRef.current.practiceTrials) {
                            this.setState({
                                vts: this.paramsRef.current.startingVts
                            });
                        }
                        this.setState({
                            trial: this.state.trial + 1
                        });
                        // Force a canvas update to reflect the cleared state
                        this.update(0);
                    }, 1000); // Delay of 1 second
                }
            }
        });
        setTimeout(()=>{
            this.update(0);
        }, 10);
    };
}
const __TURBOPACK__default__export__ = TNT;
}}),
"[project]/src/components/game-components/games/TNTGlow.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/components/game-components/utils/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$games$2f$TNT$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/games/TNT.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/Ball.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallVariants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/game-components/utils/TNT/BallVariants.ts [app-ssr] (ecmascript)");
"use client";
;
;
class TNTGlowGame extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$games$2f$TNT$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    reactionTimesGlowRef = {
        current: []
    };
    shouldGlowRef = {
        current: true
    };
    constructor(props){
        super(props);
        this.data.reactionTimesGlow = [];
    }
    randomGaussian(mean, stddev) {
        const u = 1 - Math.random();
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * stddev + mean;
    }
    selectRandomBallToGlow = ()=>{
        setTimeout(()=>{
            const availableBalls = this.ballsRef.current.filter((_, index)=>!this.actualBallsRef.current.includes(index));
            if (availableBalls.length > 0 && this.shouldGlowRef.current) {
                const randomBall = availableBalls[Math.floor(Math.random() * availableBalls.length)];
                randomBall.glow();
            }
        }, this.randomGaussian(this.paramsRef.current.randomnessMean, this.paramsRef.current.randomnessStd));
    };
    addEventListenersDuringGame = ()=>{
        this.eventHandler.add("click", this.handleMouseClickDuringGame);
    };
    handleMouseClickDuringGame = (event)=>{
        const rect = this.canvasRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const glowDistance = 20;
        this.ballsRef.current.forEach((ball)=>{
            const dx = mouseX - ball.x;
            const dy = mouseY - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < ball.radius + glowDistance) {
                if (ball.isGlowed) {
                    ball.click(this.selectRandomBallToGlow);
                }
            }
        });
    };
    resetGame() {
        if (this.reactionTimesGlowRef.current.length > 0) {
            this.data.reactionTimesGlow = [
                ...this.data.reactionTimesGlow,
                this.reactionTimesGlowRef.current
            ];
        }
        this.reactionTimesGlowRef.current = [];
        super.resetGame();
    }
    createBalls() {
        this.reactionTimesGlowRef.current = [];
        this.ballsRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$Ball$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBalls"])(this.canvasRef.current, this.ballSizeRef.current, this.paramsRef.current.numOfBalls, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$game$2d$components$2f$utils$2f$TNT$2f$BallVariants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlowBall"], this.reactionTimesGlowRef);
        setTimeout(()=>{
            this.selectRandomBallToGlow();
            this.shouldGlowRef.current = true;
            setTimeout(()=>{
                this.shouldGlowRef.current = false;
            }, this.paramsRef.current.duration * 1000 - 3000);
        }, 3000);
    }
}
const __TURBOPACK__default__export__ = TNTGlowGame;
}}),
"[project]/src/app/games/[gameId]/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_90918c._.js.map