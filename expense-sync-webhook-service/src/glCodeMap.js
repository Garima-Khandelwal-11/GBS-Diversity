// Maps expense categories (as sent by the travel/expense system) to the
// general-ledger codes the downstream accounting system expects. This is
// the kind of small lookup table that quietly becomes load-bearing in a
// real integration -- centralizing it makes "add a category" a one-line
// change instead of a hunt through the codebase.
export const GL_CODE_MAP = {
  Airfare: "6010",
  Lodging: "6020",
  "Ground Transport": "6030",
  Meals: "6040",
  default: "6099",
};

export function glCodeFor(category) {
  return GL_CODE_MAP[category] ?? GL_CODE_MAP.default;
}
