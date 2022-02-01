import DrugBenefitUpdateStrategyFactory from "./drugBenefitValueUpdateStrategyFactory";

const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;
export default class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.currentBenefit = benefit;
    this.benefitUpdateStrategy =
      DrugBenefitUpdateStrategyFactory.getStrategy(name);
  }

  skipDay() {
    this.benefitUpdateStrategy(this);
    this.expire();
  }

  expire() {
    this.expiresIn -= 1;
  }

  isExpired() {
    return this.expiresIn <= 0;
  }

  get currentBenefit() {
    return this.benefit;
  }

  set currentBenefit(value) {
    if (value < MIN_BENEFIT) value = MIN_BENEFIT;
    if (value > MAX_BENEFIT) value = MAX_BENEFIT;
    this.benefit = value;
  }
}
