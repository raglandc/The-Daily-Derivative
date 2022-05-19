export function expressionBuilderHandler(
  type: string,
  elementArray: string[]
): string[] {
  let returnArray: string[] = [];
  let inputArray = [...elementArray];

  //fraction builder
  if (type === "fraction") {
    //find numerator and denominator
    const numeratorIndexStart = inputArray.lastIndexOf("(") + 1;
    const denominatorIndexStart = inputArray.lastIndexOf("\\div") + 1;

    let numerator: string = "";
    let denominator: string = "";

    for (let i = numeratorIndexStart; i < denominatorIndexStart - 1; i++) {
      numerator += inputArray[i];
    }

    for (let i = denominatorIndexStart; i < inputArray.length; i++) {
      denominator += inputArray[i];
    }

    //create katex string
    const fractionString = `\\frac{${numerator}}{${denominator}}`;

    //start at special symbol
    const startIndex = inputArray.lastIndexOf("(");

    //filter out the values from special start to end of array
    returnArray = inputArray.filter((value, index) => index < startIndex);

    returnArray = [...returnArray, fractionString];

    return returnArray;
  }

  //exponent builder
  if (type === "exponent") {
    //find opening "("
    const exponentIndexStart = inputArray.lastIndexOf("(");

    let exponent: string[] = [];

    //loop through exponentString at exp index and create exponent string
    for (let i = exponentIndexStart + 1; i < inputArray.length; i++) {
      //push each entry into exponent value array
      exponent.push(inputArray[i]);
    }

    const exponentString = exponent.join("");

    const returnString = `^{${exponentString}}`;

    //filter out the values from special start to end of array
    returnArray = clearOldArrayHandler(inputArray);

    returnArray = [...returnArray, returnString];

    return returnArray;
  }

  //square root builder
  if (type === "square-root") {
    //find the opening "("
    const squareRootIndexStart = inputArray.lastIndexOf("(");

    //store square root values in string array
    let squareRoot: string[] = [];

    //loop through inputArray at square root start and create array of values
    for (let i = squareRootIndexStart + 1; i < inputArray.length; i++) {
      squareRoot.push(inputArray[i]);
    }

    //create square root string
    const squareRootString = squareRoot.join("");

    //create latex square root string that will be added to the array
    const returnString = `\\sqrt{${squareRootString}}`;

    returnArray = clearOldArrayHandler(inputArray);

    returnArray = [...returnArray, returnString];

    return returnArray;
  }

  //subscript builder
  if (type === "subscript") {
    //find the opening "("
    const subScriptIndexStart = inputArray.lastIndexOf("(");

    //store subscript values in string array
    let subScript: string[] = [];

    //loop through inputArray at subscript start and create array of values
    for (let i = subScriptIndexStart + 1; i < inputArray.length; i++) {
      subScript.push(inputArray[i]);
    }

    //turn array into string
    const subscriptString = subScript.join("");

    //turn string into katex subscript string
    const returnString = `_{${subscriptString}}`;

    //clear old input array
    returnArray = clearOldArrayHandler(inputArray);

    //set new array to display
    returnArray = [...returnArray, returnString];

    return returnArray;
  }

  //if nothing is triggered return last array
  return inputArray;
}

//determines type of expression to be built
export function determineTypeHandler(currentArray: string[]): string {
  let returnString: string = "error";

  //start at end of array and step back until
  //the last special char is found
  for (let i = currentArray.length - 1; i > 0; i--) {
    //fractions
    if (currentArray[i] === "\\div") {
      return (returnString = "fraction");
    }

    //exponent
    if (currentArray[i] === "\\wedge") {
      return (returnString = "exponent");
    }

    //square root
    if (currentArray[i] === "\\sqrt{}") {
      return (returnString = "square-root");
    }

    //subscript
    if (currentArray[i] === "\\lor") {
      return (returnString = "subscript");
    }
  }

  return returnString;
}

//helper functions

//clear old input array
function clearOldArrayHandler(array: string[]) {
  //start at special symbol
  const startIndex = array.lastIndexOf("(");

  //filter out the values from special start to end of array
  const newArray = array.filter((value, index) => index < startIndex - 1);

  return newArray;
}
