import Pharmacy from "./pharmacy/pharmacy";
import Drug from "./drugs/drug";
import saveLog from "./utils/fileUtils";

function getDrugs() {
  return [
    new Drug("Doliprane", 20, 30),
    new Drug("Herbal Tea", 10, 5),
    new Drug("Fervex", 5, 40),
    new Drug("Magic Pill", 15, 40),
  ];
}

function runPharmacy() {
  const drugs = getDrugs();
  const trial = new Pharmacy(drugs);
  const log = [];

  for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
    log.push(trial.updateBenefitValue());
  }

  saveLog(log);
}

runPharmacy();
