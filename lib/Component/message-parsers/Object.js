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
var React = __importStar(require("react"));
var emotion_theming_1 = require("emotion-theming");
var elements_1 = require("../react-inspector/elements");
var react_1 = __importDefault(require("linkifyjs/react"));
var react_inspector_1 = __importDefault(require("../react-inspector"));
var ObjectTree = /** @class */ (function (_super) {
    __extends(ObjectTree, _super);
    function ObjectTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectTree.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, quoted = _a.quoted, log = _a.log;
        return log.data.map(function (message, i) {
            if (typeof message === 'string') {
                var string = !quoted && message.length ? (message + " ") : (React.createElement("span", null,
                    React.createElement("span", null, "\""),
                    React.createElement("span", { style: {
                            color: theme.styles.OBJECT_VALUE_STRING_COLOR
                        } }, message),
                    React.createElement("span", null, "\" ")));
                return (React.createElement(elements_1.Root, { "data-type": "string", key: i },
                    React.createElement(react_1["default"], { options: _this.props.linkifyOptions }, string)));
            }
            return React.createElement(react_inspector_1["default"], { data: message, key: i });
        });
    };
    return ObjectTree;
}(React.PureComponent));
exports["default"] = emotion_theming_1.withTheme(ObjectTree);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbXBvbmVudC9tZXNzYWdlLXBhcnNlcnMvT2JqZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQThCO0FBRTlCLG1EQUEyQztBQUMzQyx3REFBa0Q7QUFFbEQsMERBQXFDO0FBR3JDLHVFQUEwQztBQVMxQztJQUF5Qiw4QkFBK0I7SUFBeEQ7O0lBaUNBLENBQUM7SUFoQ0MsMkJBQU0sR0FBTjtRQUFBLGlCQStCQztRQTlCTyxJQUFBLEtBQXlCLElBQUksQ0FBQyxLQUFLLEVBQWpDLEtBQUssV0FBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLEdBQUcsU0FBZSxDQUFBO1FBRXpDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFZLEVBQUUsQ0FBUztZQUMxQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsSUFBTSxNQUFNLEdBQ1YsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDdkIsT0FBTyxNQUFHLENBQ2QsQ0FBQyxDQUFDLENBQUMsQ0FDRjtvQkFDRSx1Q0FBYztvQkFDZCw4QkFDRSxLQUFLLEVBQUU7NEJBQ0wsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCO3lCQUM5QyxJQUVBLE9BQU8sQ0FDSDtvQkFDUCx3Q0FBZSxDQUNWLENBQ1IsQ0FBQTtnQkFFSCxPQUFPLENBQ0wsb0JBQUMsZUFBSSxpQkFBVyxRQUFRLEVBQUMsR0FBRyxFQUFFLENBQUM7b0JBQzdCLG9CQUFDLGtCQUFPLElBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFHLE1BQU0sQ0FBVyxDQUMxRCxDQUNSLENBQUE7YUFDRjtZQUVELE9BQU8sb0JBQUMsNEJBQVMsSUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUksQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFqQ0QsQ0FBeUIsS0FBSyxDQUFDLGFBQWEsR0FpQzNDO0FBRUQscUJBQWUsMkJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQSJ9