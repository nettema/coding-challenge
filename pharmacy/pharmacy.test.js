import Pharmacy from "./pharmacy";
import Drug from "../drugs/drug";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    const testDrugs = [new Drug("test", 2, 3)];
    const results = [new Drug("test", 1, 2)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  it("should decrease benefit value twice as fast if expiration date has passed", () => {
    const testDrugs = [new Drug("test", 0, 3)];
    const results = [new Drug("test", -1, 1)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  test("benefit value should never become negative", () => {
    const testDrugs = [new Drug("test", 3, 2)];
    const pharmasy = new Pharmacy(testDrugs);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toBeGreaterThanOrEqual(0);
    expect(testDrugs[0].expiresIn).toBe(2);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toBe(0);
    expect(testDrugs[0].expiresIn).toBe(1);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toBe(0);
    expect(testDrugs[0].expiresIn).toBe(0);
  });

  test("Herbal tea should increace benefit the oler it gets", () => {
    const testDrugs = [new Drug("Herbal Tea", 3, 2)];
    const results = [new Drug("Herbal Tea", 2, 3)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  test("Herbal tea should increace benefit twice as fast after expiration date", () => {
    const testDrugs = [new Drug("Herbal Tea", 0, 2)];
    const results = [new Drug("Herbal Tea", -1, 4)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  test("Benefit value should never be more than 50", () => {
    const testDrugs = [new Drug("Herbal Tea", 5, 49)];
    const pharmasy = new Pharmacy(testDrugs);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toBe(50);
    expect(testDrugs[0].expiresIn).toBe(4);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toBe(50);
    expect(testDrugs[0].expiresIn).toBe(3);
  });

  test("Magic Pill should never expire nor decrease in Benefit", () => {
    const testDrugs = [new Drug("Magic Pill", 5, 60)];
    const results = [new Drug("Magic Pill", 5, 60)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  test("Fervex should increase in benefit as its expiration date approaches ", () => {
    const testDrugs = [new Drug("Fervex", 15, 2)];
    const results = [new Drug("Fervex", 14, 3)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });

  test("Fervex benefit increases by 2 when there are 10 days or less", () => {
    const testDrugs = [new Drug("Fervex", 10, 5)];
    const pharmasy = new Pharmacy(testDrugs);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(7);
    expect(testDrugs[0].expiresIn).toBe(9);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(9);
    expect(testDrugs[0].expiresIn).toBe(8);
  });

  test("Fervex benefit increases by 3 when there are 5 days or less", () => {
    const testDrugs = [new Drug("Fervex", 6, 5)];
    const pharmasy = new Pharmacy(testDrugs);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(7);
    expect(testDrugs[0].expiresIn).toBe(5);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(10);
    expect(testDrugs[0].expiresIn).toBe(4);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(13);
    expect(testDrugs[0].expiresIn).toBe(3);
  });

  test("Fervex benefit drops to 0 after expiration date", () => {
    const testDrugs = [new Drug("Fervex", 1, 7)];
    const pharmasy = new Pharmacy(testDrugs);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(10);
    expect(testDrugs[0].expiresIn).toBe(0);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(0);
    expect(testDrugs[0].expiresIn).toBe(-1);
    pharmasy.updateBenefitValue();
    expect(testDrugs[0].benefit).toEqual(0);
    expect(testDrugs[0].expiresIn).toBe(-2);
  });

  it("Dafalgan should decrease in benefit twice as fast usual drugs", () => {
    const testDrugs = [new Drug("Dafalgan", 2, 3)];
    const results = [new Drug("Dafalgan", 1, 1)];
    const pharmasy = new Pharmacy(testDrugs);
    expect(pharmasy.updateBenefitValue()).toEqual(results);
  });
});
