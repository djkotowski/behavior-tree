import { TreeNode } from "../types";
import { BaseNode } from "./BaseNode";
export declare abstract class DecoratorNode<TContext> extends BaseNode<TContext> {
    protected _childNode: TreeNode<TContext>;
    protected constructor(childNode: TreeNode<TContext>);
}
//# sourceMappingURL=DecoratorNode.d.ts.map