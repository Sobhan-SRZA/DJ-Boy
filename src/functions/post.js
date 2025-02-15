const clc = require("cli-color");

/**
 *
 * @param {any} data
 * @param {string} name
 * @param {string} color1
 * @param {string} color2
 * @returns {void}
 */
module.exports = function post(data, name, color1, color2) {
  try {
    const dataColor = color1 || "yellowBright";
    const textColor = color2 || "greenBright";
    const message = `${clc[dataColor](`[${name || "U"}]〢┃  `)}`;
    if (typeof data == "string")
      console.log(
        message +
        data
          .split("\n")
          .map(d => clc.green(`${clc[textColor](`${d}`)}`))
          .join(`\n${message}`)
      );

    else if (typeof data == "object")
      console.log(
        message + clc.green(JSON.stringify(clc[textColor](`${data}`), null, 3))
      );

    else if (typeof data == "boolean")
      console.log(message + clc.cyan(clc[textColor](`${data}`)));

    else
      console.log(message + clc[textColor](`${data}`));
  } catch (e) {
    error(e);
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */