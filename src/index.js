class SmartCalculator {
  constructor(initialValue) {
    this.operatorsStack = [];
    this.exitStringStack = [initialValue];
    this.rusult;
    this.operatorsPriority = {
      add: 0,
      subtract: 0,
      multiply: 1,
      devide: 1,
      pow: 2
    }
    this.operators = {
      add: "add",
      subtract: "subtract",
      multiply: "multiply",
      devide: "devide",
      pow: "pow"
    }
  }

  operation(leftoperand, rightoperand, operator) {

    if(operator === "add") {

      let result = leftoperand + rightoperand;
      return result;
    }
    if(operator === "subtract") {

      let result = leftoperand - rightoperand;
      return result;
    }
    if(operator === "multiply") {

      let result = leftoperand * rightoperand;
      return result;
    }
    if(operator === "devide") {

      let result = leftoperand / rightoperand;
      return result;
    }
    if(operator === "pow") {

      let result = Math.pow(leftoperand , rightoperand);
      return result;
    }
  }

  polishScript(number, fn) {

    if(this.operatorsStack.length != 0) {

      let lastOperator = this.operatorsStack[this.operatorsStack.length - 1];
      let lastOperatorPriority = eval("this.operatorsPriority." + lastOperator);
      let innerOperatorPriority = eval("this.operatorsPriority." + fn);

      if(lastOperatorPriority != 2 || innerOperatorPriority != 2) {
        while(this.operatorsStack.length != 0 
              && lastOperatorPriority >= innerOperatorPriority) {

          let operator = this.operatorsStack.pop();
          this.exitStringStack.push(operator);

          lastOperator = this.operatorsStack[this.operatorsStack.length - 1];
          lastOperatorPriority = eval("this.operatorsPriority." + lastOperator);
        }
      } 
    }

    this.operatorsStack.push(fn);
    this.exitStringStack.push(number);
  }

  calculatePolishString() {

    let polishString = this.exitStringStack.slice();

    while(this.operatorsStack.length != 0) {
      let operator = this.operatorsStack.pop();
      polishString.push(operator);
    }

    let i = 0;
    while(polishString.length != 1 || polishString.length < i) {

      let elem = polishString[i];
      if (typeof elem === "number") {

        i++;
      } else {

        let operandLeft = polishString[i - 2];
        let operandRignt = polishString[i - 1];
        let result = this.operation(operandLeft, operandRignt, elem);
        polishString.splice(i - 2, 3, result);
        i -= 2;
      }
    }

    return polishString[0];
  }

  valueOf() { 
    this.result = this.calculatePolishString();
    return this.result; 
  }
  add(number) { 
    this.polishScript(number, "add");
    return this;
  }
  
  subtract(number) { 
    this.polishScript(number, "subtract");
     return this;
  }

  multiply(number) { 
    this.polishScript(number, "multiply");
    return this;
  }

  devide(number) {
    this.polishScript(number, "devide");
    return this;
  }

  pow(number) { 
    this.polishScript(number, "pow");
    return this;
  }
}
module.exports = SmartCalculator;

