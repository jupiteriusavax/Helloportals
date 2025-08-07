export type TriggerContext = {
  now: Date;
  usage?: Record<string, number>;
  crm?: Record<string, unknown>;
  account?: { stage?: string; engagementScore?: number; arrCents?: number };
  user?: { role?: string };
};

export type Value = string | number | boolean;

export type ComparisonOp = "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
export type LogicalOp = "and" | "or" | "not";

export type ComparisonExpression = {
  op: ComparisonOp;
  left: Value | string; // string starting with $ refers to context path
  right: Value | string;
};

export type LogicalExpression =
  | { op: "and"; args: Expression[] }
  | { op: "or"; args: Expression[] }
  | { op: "not"; arg: Expression };

export type Expression = ComparisonExpression | LogicalExpression;

export function evaluateExpression(expression: Expression, ctx: TriggerContext): boolean {
  if (!expression) return false;
  if (isLogical(expression)) {
    if (expression.op === "not") return !evaluateExpression(expression.arg, ctx);
    if (expression.op === "and") return expression.args.every((e) => evaluateExpression(e, ctx));
    if (expression.op === "or") return expression.args.some((e) => evaluateExpression(e, ctx));
    return false;
  }
  // comparison
  const left = resolveValue(expression.left, ctx);
  const right = resolveValue(expression.right, ctx);
  switch (expression.op) {
    case "eq":
      return left === right;
    case "neq":
      return left !== right;
    case "gt":
      return Number(left) > Number(right);
    case "gte":
      return Number(left) >= Number(right);
    case "lt":
      return Number(left) < Number(right);
    case "lte":
      return Number(left) <= Number(right);
    default:
      return false;
  }
}

function isLogical(expr: Expression): expr is LogicalExpression {
  return expr.op === "and" || expr.op === "or" || expr.op === "not";
}

function resolveValue(pathOrValue: Value | string, ctx: TriggerContext): Value {
  if (typeof pathOrValue !== "string") return pathOrValue;
  if (!pathOrValue.startsWith("$")) return pathOrValue as Value;
  const path = pathOrValue.slice(1).split(".");
  let current: unknown = ctx;
  for (const key of path) {
    if (typeof current === "object" && current !== null && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      current = undefined;
      break;
    }
  }
  if (
    typeof current === "string" ||
    typeof current === "number" ||
    typeof current === "boolean"
  ) {
    return current;
  }
  return String(current ?? "") as Value;
}