"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Methods_1 = __importDefault(require("../definitions/Methods"));
var parse_1 = __importDefault(require("./parse"));
var Transform_1 = require("../Transform");
// import Construct from './construct'
/**
 * Hook a console constructor and forward messages to a callback
 * @argument console The Console constructor to Hook
 * @argument callback The callback to be called once a message is logged
 */
function Hook(console, callback, encode, limit) {
    if (encode === void 0) { encode = true; }
    var TargetConsole = console;
    var Storage = {
        pointers: {},
        src: {
            npm: 'https://npmjs.com/package/console-feed',
            github: 'https://github.com/samdenty99/console-feed'
        }
    };
    var _loop_1 = function (method) {
        var NativeMethod = TargetConsole[method];
        // Override
        TargetConsole[method] = function () {
            // Pass back to native method
            NativeMethod.apply(this, arguments);
            // Parse arguments and send to transport
            var args = [].slice.call(arguments);
            // setTimeout to prevent lag
            setTimeout(function () {
                var parsed = parse_1["default"](method, args);
                if (parsed) {
                    var encoded = parsed;
                    if (encode) {
                        encoded = Transform_1.Encode(parsed, limit);
                    }
                    callback(encoded, parsed);
                }
            });
        };
        // Store native methods
        Storage.pointers[method] = NativeMethod;
    };
    // Override console methods
    for (var _i = 0, Methods_2 = Methods_1["default"]; _i < Methods_2.length; _i++) {
        var method = Methods_2[_i];
        _loop_1(method);
    }
    TargetConsole.feed = Storage;
    return TargetConsole;
}
exports["default"] = Hook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvSG9vay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU9BLG1FQUE0QztBQUU1QyxrREFBMkI7QUFFM0IsMENBQXFDO0FBQ3JDLHNDQUFzQztBQUV0Qzs7OztHQUlHO0FBQ0gsU0FBd0IsSUFBSSxDQUMxQixPQUFnQixFQUNoQixRQUFrQixFQUNsQixNQUFhLEVBQ2IsS0FBYztJQURkLHVCQUFBLEVBQUEsYUFBYTtJQUdiLElBQU0sYUFBYSxHQUFHLE9BQXdCLENBQUE7SUFDOUMsSUFBTSxPQUFPLEdBQVk7UUFDdkIsUUFBUSxFQUFFLEVBQUU7UUFDWixHQUFHLEVBQUU7WUFDSCxHQUFHLEVBQUUsd0NBQXdDO1lBQzdDLE1BQU0sRUFBRSw0Q0FBNEM7U0FDckQ7S0FDRixDQUFBOzRCQUdRLE1BQU07UUFDYixJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFMUMsV0FBVztRQUNYLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUN0Qiw2QkFBNkI7WUFDN0IsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7WUFFbkMsd0NBQXdDO1lBQ3hDLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBRXJDLDRCQUE0QjtZQUM1QixVQUFVLENBQUM7Z0JBQ1QsSUFBTSxNQUFNLEdBQUcsa0JBQUssQ0FBQyxNQUF3QixFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNwRCxJQUFJLE1BQU0sRUFBRTtvQkFDVixJQUFJLE9BQU8sR0FBWSxNQUFpQixDQUFBO29CQUN4QyxJQUFJLE1BQU0sRUFBRTt3QkFDVixPQUFPLEdBQUcsa0JBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFZLENBQUE7cUJBQzNDO29CQUNELFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUE7aUJBQzFCO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUE7UUFFRCx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUE7O0lBMUJ6QywyQkFBMkI7SUFDM0IsS0FBbUIsVUFBTyxFQUFQLFlBQUEsb0JBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBckIsSUFBSSxNQUFNLGdCQUFBO2dCQUFOLE1BQU07S0EwQmQ7SUFFRCxhQUFhLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtJQUU1QixPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDO0FBL0NELDBCQStDQyJ9