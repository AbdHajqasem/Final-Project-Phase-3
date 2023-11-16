class GenerateRandomNumber {
    static generateRandomNumber(maxNumber = 1000000000) {
      return Math.round(maxNumber * Math.random());
    }
  }
  export default GenerateRandomNumber;
  