"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var emotion_theming_1 = require("emotion-theming");
var React = __importStar(require("react"));
var react_inspector_1 = require("react-inspector");
var Error_1 = __importDefault(require("../message-parsers/Error"));
var elements_1 = require("./elements");
var REMAINING_KEY = '__console_feed_remaining__';
// copied from react-inspector
function intersperse(arr, sep) {
    if (arr.length === 0) {
        return [];
    }
    return arr.slice(1).reduce(function (xs, x) { return xs.concat([sep, x]); }, [arr[0]]);
}
var getArrayLength = function (array) {
    var remaining = parseInt(array[array.length - 1].split(REMAINING_KEY)[1]);
    return array.length - 1 + remaining;
};
var CustomObjectRootLabel = function (_a) {
    var name = _a.name, data = _a.data;
    var rootData = data;
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        var object = {};
        for (var propertyName in data) {
            if (data.hasOwnProperty(propertyName)) {
                var propertyValue = data[propertyName];
                if (Array.isArray(propertyValue)) {
                    var arrayLength = getArrayLength(propertyValue);
                    object[propertyName] = new Array(arrayLength);
                }
                else {
                    object[propertyName] = propertyValue;
                }
            }
        }
        rootData = Object.assign(Object.create(Object.getPrototypeOf(data)), object);
    }
    if (typeof name === 'string') {
        return (React.createElement("span", null,
            React.createElement(react_inspector_1.ObjectName, { name: name }),
            React.createElement("span", null, ": "),
            React.createElement(react_inspector_1.ObjectPreview, { data: rootData })));
    }
    else {
        return React.createElement(react_inspector_1.ObjectPreview, { data: rootData });
    }
};
var CustomObjectLabel = function (_a) {
    var name = _a.name, data = _a.data, _b = _a.isNonenumerable, isNonenumerable = _b === void 0 ? false : _b;
    return name === REMAINING_KEY ? (data > 0 ? (React.createElement("span", null,
        data,
        " more...")) : null) : (React.createElement("span", null,
        typeof name === 'string' ? (React.createElement(react_inspector_1.ObjectName, { name: name, dimmed: isNonenumerable })) : (React.createElement(react_inspector_1.ObjectPreview, { data: name })),
        React.createElement("span", null, ": "),
        React.createElement(react_inspector_1.ObjectValue, { object: data })));
};
var CustomInspector = /** @class */ (function (_super) {
    __extends(CustomInspector, _super);
    function CustomInspector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomInspector.prototype.render = function () {
        var _a = this.props, data = _a.data, theme = _a.theme;
        var styles = theme.styles, method = theme.method;
        var dom = data instanceof HTMLElement;
        var table = method === 'table';
        return (React.createElement(elements_1.Root, { "data-type": table ? 'table' : dom ? 'html' : 'object' }, table ? (React.createElement(elements_1.Table, null,
            React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles, table: true })),
            React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles, nodeRenderer: this.nodeRenderer.bind(this) })))) : dom ? (React.createElement(elements_1.HTML, null,
            React.createElement(react_inspector_1.DOMInspector, __assign({}, this.props, { theme: styles })))) : (React.createElement(react_inspector_1.Inspector, __assign({}, this.props, { theme: styles, nodeRenderer: this.nodeRenderer.bind(this) })))));
    };
    CustomInspector.prototype.getCustomNode = function (data) {
        var _a;
        var styles = this.props.theme.styles;
        var constructor = (_a = data === null || data === void 0 ? void 0 : data.constructor) === null || _a === void 0 ? void 0 : _a.name;
        if (constructor === 'Function')
            return (React.createElement("span", { style: { fontStyle: 'italic' } },
                React.createElement(react_inspector_1.ObjectPreview, { data: data }), " {",
                React.createElement("span", { style: { color: 'rgb(181, 181, 181)' } }, data.body), "}"));
        if (data instanceof Error && typeof data.stack === 'string') {
            return React.createElement(Error_1["default"], { error: data.stack });
        }
        if (constructor === 'Promise')
            return (React.createElement("span", { style: { fontStyle: 'italic' } },
                "Promise ", "{",
                React.createElement("span", { style: { opacity: 0.6 } }, "<pending>"), "}"));
        if (data instanceof HTMLElement)
            return (React.createElement(elements_1.HTML, null,
                React.createElement(react_inspector_1.DOMInspector, { data: data, theme: styles })));
        if (Array.isArray(data)) {
            var arrayLength = getArrayLength(data);
            var maxProperties = styles.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES;
            var previewArray = data
                .slice(0, -1)
                .slice(0, maxProperties)
                .map(function (element, index) {
                if (Array.isArray(element)) {
                    return (React.createElement(react_inspector_1.ObjectValue, { key: index, object: new Array(getArrayLength(element)) }));
                }
                else {
                    return React.createElement(react_inspector_1.ObjectValue, { key: index, object: element });
                }
            });
            if (arrayLength > maxProperties) {
                previewArray.push(React.createElement("span", { key: "ellipsis" }, "\u2026"));
            }
            return (React.createElement(React.Fragment, null,
                React.createElement("span", { style: styles.objectDescription }, arrayLength === 0 ? "" : "(" + arrayLength + ")\u00A0"),
                React.createElement("span", { style: styles.preview },
                    "[",
                    intersperse(previewArray, ', '),
                    "]")));
        }
        return null;
    };
    CustomInspector.prototype.nodeRenderer = function (props) {
        var depth = props.depth, name = props.name, data = props.data, isNonenumerable = props.isNonenumerable;
        // Root
        if (depth === 0) {
            var customNode_1 = this.getCustomNode(data);
            return customNode_1 || React.createElement(CustomObjectRootLabel, { name: name, data: data });
        }
        if (typeof data === 'string' && data.includes(REMAINING_KEY)) {
            name = REMAINING_KEY;
            data = data.split(REMAINING_KEY)[1];
        }
        if (name === 'constructor')
            return (React.createElement(elements_1.Constructor, null,
                React.createElement(react_inspector_1.ObjectLabel, { name: "<constructor>", data: data.name, isNonenumerable: isNonenumerable })));
        var customNode = this.getCustomNode(data);
        return customNode ? (React.createElement(elements_1.Root, null,
            React.createElement(react_inspector_1.ObjectName, { name: name }),
            React.createElement("span", null, ": "),
            customNode)) : (React.createElement(CustomObjectLabel, { name: name, data: data, isNonenumerable: isNonenumerable }));
    };
    return CustomInspector;
}(React.PureComponent));
exports["default"] = emotion_theming_1.withTheme(CustomInspector);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3JlYWN0LWluc3BlY3Rvci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJDO0FBQzNDLDJDQUE4QjtBQUM5QixtREFPd0I7QUFHeEIsbUVBQWlEO0FBQ2pELHVDQUEyRDtBQU8zRCxJQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQTtBQUVsRCw4QkFBOEI7QUFDOUIsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUc7SUFDM0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNwQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEVBQUUsRUFBRSxDQUFDLElBQUssT0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RFLENBQUM7QUFFRCxJQUFNLGNBQWMsR0FBRyxVQUFDLEtBQWlCO0lBQ3ZDLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMzRSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQTtBQUNyQyxDQUFDLENBQUE7QUFFRCxJQUFNLHFCQUFxQixHQUFHLFVBQUMsRUFBYztRQUFaLElBQUksVUFBQSxFQUFFLElBQUksVUFBQTtJQUN6QyxJQUFJLFFBQVEsR0FBRyxJ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