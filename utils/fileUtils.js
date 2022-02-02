import fs from "fs";

export default function saveLog(log) {
  /* eslint-disable no-console */
  fs.writeFile("output.txt", JSON.stringify(log), (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  });
  /* eslint-enable no-console */
}
