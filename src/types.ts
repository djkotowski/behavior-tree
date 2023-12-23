export enum Status {
  Running = "Running",
  Success = "Success",
  Fail = "Fail",
}

export interface TreeNode<TContext> {
  get label(): string;
  start: (context: TContext) => void;
  tick: (context: TContext) => Status;
}
