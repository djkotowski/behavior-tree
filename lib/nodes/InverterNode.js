"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InverterNode = void 0;
var types_1 = require("../types");
var DecoratorNode_1 = require("./DecoratorNode");
var InverterNode = /** @class */ (function (_super) {
    __extends(InverterNode, _super);
    function InverterNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InverterNode.prototype, "label", {
        get: function () {
            return "Inverter";
        },
        enumerable: false,
        configurable: true
    });
    InverterNode.prototype.onStart = function (context) {
        this._childNode.start(context);
    };
    InverterNode.prototype.tick = function (context) {
        var status = this._childNode.tick(context);
        switch (status) {
            case types_1.Status.Fail:
                this.end(context, types_1.Status.Success);
                return types_1.Status.Success;
            case types_1.Status.Success:
                this.end(context, types_1.Status.Fail);
                return types_1.Status.Fail;
            case types_1.Status.Running:
                return types_1.Status.Running;
            default:
                throw "Received invalid status from child";
        }
    };
    return InverterNode;
}(DecoratorNode_1.DecoratorNode));
exports.InverterNode = InverterNode;
