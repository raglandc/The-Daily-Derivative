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

    //clear old values from string
    returnArray = clearOldArrayHandler(inputArray);

    //create new userInput string to display
    returnArray = [...returnArray, fractionString];

    //return new userInput string to display fraction
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

    //start at special symbol
    const startIndex = inputArray.lastIndexOf("\\wedge");

    //filter out the values from special start to end of array
    returnArray = inputArray.filter((value, index) => index < startIndex);

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

  //integral with bounds builder
  if (type === "int-bounds") {
  }

  //if nothing is triggered return error message
  return inputArray;
}

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
  }

  return returnString;
}

//helper functions
function clearOldArrayHandler(array: string[]) {
  //start at special symbol
  const startIndex = array.lastIndexOf("(");

  //filter out the values from special start to end of array
  const newArray = array.filter((value, index) => index < startIndex - 1);

  return newArray;
}
