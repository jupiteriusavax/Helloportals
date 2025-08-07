import { evaluateExpression, type Expression, type TriggerContext } from "@/lib/trigger-engine";

type SegmentContext = {
  account: { stage: string; engagementScore: number; arrCents: number };
  user?: { role: string };
};

export function isInSegment(definition: unknown, ctx: SegmentContext): boolean {
  const expr = definition as Expression;
  const triggerCtx: TriggerContext = {
    now: new Date(),
    account: {
      stage: ctx.account.stage,
      engagementScore: ctx.account.engagementScore,
      arrCents: ctx.account.arrCents,
    },
    user: ctx.user,
  };
  return evaluateExpression(expr, triggerCtx);
}