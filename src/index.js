class SmartCalculator {
  constructor(initialValue) {
    this.result = initialValue; 
    this.startVal = initialValue;
    this.history = []; 
    this.polishArr = [];
    this.operations = [];
    this.priority = { "add": 0,
                      "subtract": 0,
                      "multiply": 1,
                      "devide": 1,
                      "pow": 2 };
    this.isPrevPowEqualOne = false;
    
  }

  writePolishArr() {

    this.polishArr.push(this.startVal);

    for (var i = 0; i< this.history.length; i++) {

      if(typeof(this.history[i]) === "number") {
        this.polishArr.push(this.history[i]);

      } else if(typeof(this.history[i]) === "string") {
        
        var  currOperand = this.history[i];
        var currPriority = this.priority[currOperand];
        
        if(this.operations.length ==  0) {
          this.operations.push(currOperand);

        } else {

          var  prevOperand = this.operations[this.operations.length - 1]; 
          var prevPriority = this.priority[prevOperand]; 
          
          if(currPriority > prevPriority) {
            this.operations.push(currOperand);

          } else {

            while(currPriority <= this.priority[this.operations[this.operations.length - 1]] && this.operations[0]) {
              var repush = this.operations.pop(); 
              this.polishArr.push(repush);
            }
            this.operations.push(currOperand);
          }
        }
      }
      if( i === this.history.length -1) {

        while(this.operations[0]) {
          var rePush = this.operations.pop();
          this.polishArr.push(rePush);
        }
      }
    }
    return this;
  }

  calculPolishArr () {
    var resStack = [];
    for(var i = 0; i < this.polishArr.length; i++) {
      if(typeof this.polishArr[i] === "number") {
        resStack.push(this.polishArr[i]);
      }
      if(typeof this.polishArr[i] === "string") {
        var secondVal = resStack.pop();
        var firstVal = resStack.pop();
        var putToStack = this.calcul(this.polishArr[i], firstVal, secondVal);
        resStack.push(putToStack);
      }
    }
    var res = resStack.pop();

    this.result = res;
    console.log(this.polishArr); 
    this.polishArr = [];
    if(typeof res === "number") {
      return res;
    }else {
      return new Error ("invalid result of calculation calculPolishArr function");
    }
  }

  calcul(type, firstVal, secondVal) {

    var res;
    if(type === 'add') {
      res = secondVal + firstVal;
    }
    if(type === 'subtract') {
      res = firstVal-secondVal;
    }
    if(type === 'multiply') {
      res = firstVal*secondVal;
    }
    if(type === 'devide') {
      res = firstVal/secondVal;
    }
    if(type === 'pow') {
      res = Math.pow(firstVal,secondVal);
    }
    
    return res;
  }

  valueOf() { 
    return this.result; 
  }
  add(number) { 

    this.isPrevPowEqualOne = false;
    this.history.push("add");
    this.history.push(number);
    var resArr = this.writePolishArr();
    var resVal = this.calculPolishArr();

    return this;
  }
  
  subtract(number) { 

    this.isPrevPowEqualOne = false;
    this.history.push("subtract");
    this.history.push(number);
    var resArr = this.writePolishArr();
    var resVal = this.calculPolishArr();

     return this;
  }

  multiply(number) { 

    this.isPrevPowEqualOne = false;
    /*if(number === 1) {
      return this;
    }*/
    this.history.push("multiply");
    this.history.push(number);
    var resArr = this.writePolishArr();
    var resVal = this.calculPolishArr();

    return this;
  }

  devide(number) {

    this.isPrevPowEqualOne = false;
    /*if(number === 1 && this.result != 0) {
      return this;
    }*/
    this.history.push("devide");
    this.history.push(number);
    var resArr = this.writePolishArr();
    var resVal = this.calculPolishArr();

    return this;
  }

  pow(number) { 

    if(number === 1 || this.isPrevPowEqualOne) {
      this.isPrevPowEqualOne = true;
      return this;
    }
    this.history.push("pow");
    this.history.push(number);
    var resArr = this.writePolishArr();
    var resVal = this.calculPolishArr();

    return this;
  }
}
module.exports = SmartCalculator;
