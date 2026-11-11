const APPLICATION_STAGE_LABELS = {
  "Design Task": "Assignment",
};

export function stageLabel(stage) {
  if (!stage) return stage;
  return APPLICATION_STAGE_LABELS[stage] || stage;
}
