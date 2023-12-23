import { TreeNode } from "../types";
import { BaseNode } from "./BaseNode";

export abstract class DecoratorNode<TContext> extends BaseNode<TContext> {
  protected _childNode: TreeNode<TContext>;

  protected constructor(childNode: TreeNode<TContext>) {
    super();
    this._childNode = childNode;
  }
}
