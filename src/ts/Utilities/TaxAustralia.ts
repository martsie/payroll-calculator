module SimplePayslip {
    /**
     * Australian Tax Class Calculator.
     */
    export class TaxAustralia implements TaxInterface {
        private annualSalary:number;
        private startDate:Date;
        private payPeriod:PayPeriod = PayPeriod.Month;
        private taxTables:TaxTableItem[];
        private superRate:number;

        public constructor() {
            this.setUp();
        }

        public setUp() {
            this.taxTables = [
                new TaxTableItem(18200, 37000, 19),
                new TaxTableItem(37000, 80000, 32.5),
                new TaxTableItem(80000, 180000, 37),
                new TaxTableItem(180000, null, 45),
            ];
        }

        /**
         *
         * @param {PayPeriod} payPeriod
         */
        public setPayPeriod(payPeriod:PayPeriod):void {
            this.payPeriod = payPeriod;
        }

        /**
         *
         *
         * @param {number} salary
         *
         * @return {number}
         *   The salary.
         */
        public setAnnualSalary(salary:number):void {
            this.annualSalary = salary;
        }

        /**
         *
         *
         * @param {number} superRate
         *
         * @return {number}
         *   The salary.
         */
        public setSuperRate(superRate:number):void {
            this.superRate = superRate;
        }

        /**
         *
         * @param startDate
         */
        public setStartDate(startDate:Date):void {
            this.startDate = startDate;
        }

        /**
         *
         */
        public getGrossIncome():number {
            return TaxAustralia.round(this.annualSalary / this.payPeriod);
        }

        /**
         *
         */
        public getTotalIncomeTax():number {
            var incomeTax:number = 0;

            for (var delta in this.taxTables) {
                var taxTableItem:TaxTableItem = this.taxTables[delta];

                incomeTax += taxTableItem.getTaxedAmount(this.annualSalary);
            }

            return TaxAustralia.round(incomeTax);
        }

        public getIncomeTax():number {
            var incomeTax:number = this.getTotalIncomeTax();

            incomeTax /= this.payPeriod;

            return TaxAustralia.round(incomeTax);
        }

        /**
         *
         */
        public getNetIncome():number {
            return this.getGrossIncome() - this.getIncomeTax();
        }

        public getSuper():number {
            return TaxAustralia.round(this.getGrossIncome() * (this.superRate / 100));
        }

        private static round(amount:number):number {
            return Math.round(amount);
        }

    }
}