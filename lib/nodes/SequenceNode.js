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
exports.SequenceNode = void 0;
var BaseNode_1 = require("./BaseNode");
var types_1 = require("../types");
var SequenceNode = /** @class */ (function (_super) {
    __extends(SequenceNode, _super);
    function SequenceNode(children) {
        var _this = _super.call(this) || this;
        _this._children = children;
        _this._currentIndex = -1;
        _this._completionStatus = null;
        return _this;
    }
    Object.defineProperty(SequenceNode.prototype, "label", {
        get: function () {
            return "Sequence";
        },
        enumerable: false,
        configurable: true
    });
    SequenceNode.prototype.tick = function (context) {
        if (this._completionStatus != null)
            return this._completionStatus;
        var result = this.currentItem().tick(context);
        switch (result) {
            case types_1.Status.Running: {
                return types_1.Status.Running;
            }
            case types_1.Status.Fail: {
                this.onEnd(context, types_1.Status.Fail);
                return types_1.Status.Fail;
            }
            case types_1.Status.Success: {
                if (this.isLastItem()) {
                    this.onEnd(context, types_1.Status.Success);
                    return types_1.Status.Success;
                }
                else {
                    this.advanceIndex(context);
                    return types_1.Status.Running;
                }
            }
        }
    };
    SequenceNode.prototype.onStart = function (context) {
        this.advanceIndex(context);
        _super.prototype.onStart.call(this, context);
    };
    SequenceNode.prototype.onEnd = function (context, status) {
        this._completionStatus = status;
        _super.prototype.onEnd.call(this, context, status);
    };
    SequenceNode.prototype.currentItem = function () {
        if (this._currentIndex < 0)
            throw "currentItem called before start";
        return this._children[this._currentIndex];
    };
    SequenceNode.prototype.advanceIndex = function (context) {
        this._currentIndex++;
        this.currentItem().start(context);
    };
    SequenceNode.prototype.isLastItem = function () {
        return this._currentIndex >= this._children.length - 1;
    };
    return SequenceNode;
}(BaseNode_1.BaseNode));
exports.SequenceNode = SequenceNode;
