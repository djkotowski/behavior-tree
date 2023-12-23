import { Status } from "../types";
import { DecoratorNode } from "./DecoratorNode";

export class InverterNode<TContext> extends DecoratorNode<TContext> {
  get label(): string {
    return "Inverter";
  }

  onStart(context: TContext) {
    this._childNode.start(context);
  }

  tick(context: TContext) {
    const status = this._childNode.tick(context);
    switch (status) {
      case Status.Fail:
        this.end(context, Status.Success);
        return Status.Success;
      case Status.Success:
        this.end(context, Status.Fail);
        return Status.Fail;
      case Status.Running:
        return Status.Running;
      default:
        throw "Received invalid status from child";
    }
  }
}
