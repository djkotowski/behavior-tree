import { BaseNode } from "./BaseNode";
import { Status, TreeNode } from "../types";
export declare class SelectorNode<TContext> extends BaseNode<TContext> {
    private readonly _children;
    private _currentIndex;
    private _completionStatus;
    constructor(children: Array<TreeNode<TContext>>);
    get label(): string;
    tick(context: TContext): Status;
    protected onStart(context: TContext): void;
    protected onEnd(context: TContext, status: Status): void;
    private currentItem;
    private advanceIndex;
    private isLastItem;
}
//# sourceMappingURL=SelectorNode.d.ts.map