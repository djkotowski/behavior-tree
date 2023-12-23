import { Status, TreeNode } from "../types";
export declare abstract class BaseNode<TContext> implements TreeNode<TContext> {
    private _internalNodeStatus;
    protected constructor();
    start(context: TContext): void;
    protected end(context: TContext, status: Status): void;
    protected onStart(context: TContext): void;
    protected onEnd(context: TContext, status: Status): void;
    abstract get label(): string;
    abstract tick(context: TContext): Status;
}
//# sourceMappingURL=BaseNode.d.ts.map