import Drug from "./drug";

describe("Drug", () => {
  it("benefit never negative", () => {
    const drug = new Drug("test", 3, -1);
    expect(drug.currentBenefit).toBe(0);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(0);
  });

  it("benefit never more than 50", () => {
    const drug = new Drug("test", 3, 60);
    expect(drug.currentBenefit).toBe(50);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(49);
    expect(drug).toEqual(new Drug("test", 2, 49));
  });

  it("should decrease benefit by one every day", () => {
    const drug = new Drug("test", 3, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(4);
  });

  it("should decrease benefit twise as fast when expired", () => {
    const drug = new Drug("test", 1, 8);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(7);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(5);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(3);
  });

  it("should increas benefit by one for Herbal Tea", () => {
    const drug = new Drug("Herbal Tea", 3, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(6);
  });

  it("should increase benefit twice as fast for Herbal Tea", () => {
    const drug = new Drug("Herbal Tea", 1, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(6);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(8);
    drug.skipDay();
    expect(drug.currentBenefit).toBe(10);
  });

  it("should never change benefit or expire for Magic Pill", () => {
    const drug = new Drug("Magic Pill", 2, 5);
    const result = new Drug("Magic Pill", 2, 5);
    drug.skipDay();
    expect(drug).toEqual(result);
    drug.skipDay();
    expect(drug).toEqual(result);
  });

  it("should increase benefit by one if Fervex expires in more than 10 days", () => {
    const drug = new Drug("Fervex", 12, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(6);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(7);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(9);
  });

  it("should increase benefit by two if Fervex expires in less than 10 days and more than 5 days", () => {
    let drug = new Drug("Fervex", 11, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(6);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(8);
    drug = new Drug("Fervex", 6, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(7);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(10);
  });

  it("should increase benefit by three if Fervex expires in less than 5 days and more than 0 days", () => {
    let drug = new Drug("Fervex", 6, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(7);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(10);
    drug = new Drug("Fervex", 1, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(8);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(0);
  });

  it("should drop benefit 0 when expired", () => {
    let drug = new Drug("Fervex", 1, 5);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(8);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(0);
    drug.skipDay();
    expect(drug.currentBenefit).toEqual(0);
  });

  it("should decrease in benefit twise as fast as normal drugs for Dafalgan", () => {
    let drug = new Drug("Dafalgan", 2, 10);
    drug.skipDay();
    expect(drug.expiresIn).toEqual(1);
    expect(drug.currentBenefit).toEqual(8);
    drug.skipDay();
    expect(drug.expiresIn).toEqual(0);
    expect(drug.currentBenefit).toEqual(6);
    drug.skipDay();
    expect(drug.expiresIn).toEqual(-1);
    expect(drug.currentBenefit).toEqual(2);
    drug.skipDay();
    expect(drug.expiresIn).toEqual(-2);
    expect(drug.currentBenefit).toEqual(0);
  });
});
