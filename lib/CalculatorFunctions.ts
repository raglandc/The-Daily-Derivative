export function expressionBuilderHandler(
  type: string,
  elementArray: string[]
): string {
  let returnString: string;

  //fraction builder
  if (type === "fraction") {
    const fractionElements = elementArray.join("");

    //find numerator and denominator
    const divisorIndexStart = fractionElements.indexOf("\\");
    const divisorIndexEnd = fractionElements.indexOf("v");

    let numerator: string = "";
    let denominator: string = "";

    for (let i = 0; i < divisorIndexStart; i++) {
      numerator += fractionElements[i];
    }

    for (let i = divisorIndexEnd + 1; i < fractionElements.length; i++) {
      denominator += fractionElements[i];
    }

    returnString = `\\frac{${numerator}}{${denominator}}`;

    return returnString;
  }

  //exponent builder
  if (type === "exponent") {
  }

  //square root builder
  if (type === "square-root") {
  }

  //integral with bounds builder
  if (type === "int-bounds") {
  }

  //if nothing is triggered return error message
  return "error";
}
