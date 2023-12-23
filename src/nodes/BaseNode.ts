import { Status, TreeNode } from "../types";

enum NodeStatus {
  Init,
  Started,
  Ended,
}

export abstract class BaseNode<TContext> implements TreeNode<TContext> {
  private _internalNodeStatus: NodeStatus;

  protected constructor() {
    this._internalNodeStatus = NodeStatus.Init;
  }

  start(context: TContext) {
    if (this._internalNodeStatus != NodeStatus.Init)
      throw "`start` called more than once for this node";
    this._internalNodeStatus = NodeStatus.Started;
    this.onStart(context);
  }

  protected end(context: TContext, status: Status) {
    if (this._internalNodeStatus === NodeStatus.Ended)
      throw "`end` called more than once for this node";
    this._internalNodeStatus = NodeStatus.Ended;
    this.onEnd(context, status);
  }

  protected onStart(context: TContext): void {}
  protected onEnd(context: TContext, status: Status): void {}

  abstract get label(): string;
  abstract tick(context: TContext): Status;
}
