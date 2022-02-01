import Drug from "./drug";

describe("Drug", () => {
  it("Benefit never negative", () => {
    const drug = new Drug("test", 3, -1);
    expect(drug.benefit).toBe(0);
  });

  it("Benefit never more than 50", () => {
    const drug = new Drug("test", 3, 60);
    expect(drug.benefit).toBe(50);
  });
});
