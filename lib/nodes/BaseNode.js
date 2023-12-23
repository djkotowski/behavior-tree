"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNode = void 0;
var NodeStatus;
(function (NodeStatus) {
    NodeStatus[NodeStatus["Init"] = 0] = "Init";
    NodeStatus[NodeStatus["Started"] = 1] = "Started";
    NodeStatus[NodeStatus["Ended"] = 2] = "Ended";
})(NodeStatus || (NodeStatus = {}));
var BaseNode = /** @class */ (function () {
    function BaseNode() {
        this._internalNodeStatus = NodeStatus.Init;
    }
    BaseNode.prototype.start = function (context) {
        if (this._internalNodeStatus != NodeStatus.Init)
            throw "`start` called more than once for this node";
        this._internalNodeStatus = NodeStatus.Started;
        this.onStart(context);
    };
    BaseNode.prototype.end = function (context, status) {
        if (this._internalNodeStatus === NodeStatus.Ended)
            throw "`end` called more than once for this node";
        this._internalNodeStatus = NodeStatus.Ended;
        this.onEnd(context, status);
    };
    BaseNode.prototype.onStart = function (context) { };
    BaseNode.prototype.onEnd = function (context, status) { };
    return BaseNode;
}());
exports.BaseNode = BaseNode;
