const read = require("readline-sync");
var number1;
var number2;

//#region Execution
do 
{
    var operation = read.question("What operation would you like to perform? ");
} while (!tryValidateOperation(operation));

//if we get here and the numbers are still undefined, it means a single symbol (not an expression) was entered
//if we skip this, it means a valid expression was entered and numbers were assigned during parsing
if (number1 === undefined)
{
    number1 = requestNumber("first");
    number2 = requestNumber("second");
}

result = calculateResult();
console.log("The result is " + result);
//#endregion

//#region Functions
function tryValidateOperation(input)
{
    let validSingleSymbol = tryValidateMathSymbol(input);
    let validExpression = tryParseExpression(input);
    let valid = validSingleSymbol || validExpression;
    if (!valid)
    {
        console.log("That is not a valid operation. If you want to enter an expression, use single-digit numbers and no spaces.");
    }
    return valid;
}

function tryValidateMathSymbol(symbol)
{
    return symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/";
}

function tryParseExpression(input)
{
    //require expressions to contain 3 characters--a digit, a math symbol, and another digit
    let chars = input.split("");
    if (chars.length !== 3)
    {
        return false;
    }
    let parsed1 = parseInt(chars[0]);
    let parsed2 = parseInt(chars[2]);
    if (isNaN(parsed1) || !tryValidateMathSymbol(chars[1]) || isNaN(parsed2))
    {
        return false;
    }
    number1 = parsed1;
    number2 = parsed2;
    operation = chars[1];
    return true;
}

function tryValidateNumber(number)
{
    let isNumber = !isNaN(number);
    if (!isNumber)
    {
        console.log("This is not a number.");
    }

    return isNumber;
}

function requestNumber(numberOrdinal)
{
    let number = "";
    do
    {
        number = read.question("Please enter the " + numberOrdinal + " number. ");
        number = parseInt(number);
    
    } while (!tryValidateNumber(number));

    return number;
}

function calculateResult()
{
    switch (operation)
    {
        case "+":
            return number1 + number2;
        case "-":
            return number1 - number2;
        case "*":
            return number1 * number2;
        case "/":
            return number1 / number2;
        default:
            return 0;
    }
}
//#endregion