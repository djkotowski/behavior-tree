import { BaseNode } from "./BaseNode";
import { Status, TreeNode } from "../types";

export class SelectorNode<TContext> extends BaseNode<TContext> {
  private readonly _children: Array<TreeNode<TContext>>;
  private _currentIndex: number;
  private _completionStatus: Status | null;

  constructor(children: Array<TreeNode<TContext>>) {
    super();
    this._children = children;
    this._currentIndex = -1;
    this._completionStatus = null;
  }

  get label(): string {
    return "Selector";
  }

  tick(context: TContext): Status {
    if (this._completionStatus != null) return this._completionStatus;

    const result = this.currentItem().tick(context);
    switch (result) {
      case Status.Running: {
        return Status.Running;
      }
      case Status.Success: {
        this.onEnd(context, Status.Success);
        return Status.Success;
      }
      case Status.Fail: {
        if (this.isLastItem()) {
          this.onEnd(context, Status.Fail);
          return Status.Fail;
        } else {
          this.advanceIndex(context);
          return Status.Running;
        }
      }
    }
  }

  protected onStart(context: TContext) {
    this.advanceIndex(context);
    super.onStart(context);
  }

  protected onEnd(context: TContext, status: Status) {
    this._completionStatus = status;
    super.onEnd(context, status);
  }

  private currentItem(): TreeNode<TContext> {
    if (this._currentIndex < 0) throw "currentItem called before start";
    return this._children[this._currentIndex];
  }

  private advanceIndex(context: TContext): void {
    this._currentIndex++;
    this.currentItem().start(context);
  }

  private isLastItem(): boolean {
    return this._currentIndex >= this._children.length - 1;
  }
}
