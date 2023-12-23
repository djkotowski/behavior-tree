import { Status } from "../types";
import { DecoratorNode } from "./DecoratorNode";
export declare class InverterNode<TContext> extends DecoratorNode<TContext> {
    get label(): string;
    onStart(context: TContext): void;
    tick(context: TContext): Status;
}
//# sourceMappingURL=InverterNode.d.ts.map