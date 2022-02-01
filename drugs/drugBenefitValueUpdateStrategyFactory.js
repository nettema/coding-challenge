export default class DrugcurrentBenefitUpdateStrategyFactory {
  static getStrategy(name) {
    return strategies.get(name) ?? strategies.get("default");
  }
}

const strategies = new Map([
  ["default", defaultStrategy],
  ["Herbal Tea", HerbalTeaStrategy],
  ["Magic Pill", MagicPillStrategy],
  ["Fervex", FervexStrategy],
  ["Dafalgan", DafalganStrategy],
]);

function defaultStrategy(drug) {
  if (drug.isExpired()) {
    drug.currentBenefit -= 2;
    return;
  }
  drug.currentBenefit -= 1;
}

function HerbalTeaStrategy(drug) {
  if (drug.isExpired()) {
    drug.currentBenefit += 2;
    return;
  }
  drug.currentBenefit += 1;
}

function MagicPillStrategy(drug) {
  drug.expiresIn += 1;
}

function FervexStrategy(drug) {
  if (drug.expiresIn <= 0) {
    drug.currentBenefit = 0;
    return;
  }
  if (drug.expiresIn <= 5) {
    drug.currentBenefit += 3;
    return;
  }
  if (drug.expiresIn <= 10) {
    drug.currentBenefit += 2;
    return;
  }
  drug.currentBenefit += 1;
}

function DafalganStrategy(drug) {
  if (drug.isExpired()) {
    drug.currentBenefit -= 4;
    return;
  }
  drug.currentBenefit -= 2;
}
