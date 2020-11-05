abstract class Department {
    private employees: string[] = [];

    constructor(protected id: string, protected name: string) {}

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    getEmployees() {
        return this.employees;
    }
}

class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id, 'IT');
    }

    describe() {
        console.log('IT department - ID: ', this.id);
    }
}

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment;

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
    }

    static getInstance(id: string, reports: string[]): AccountingDepartment {
        if (!AccountingDepartment.instance) {
            AccountingDepartment.instance = new AccountingDepartment(
                id,
                reports
            );
        }
        return AccountingDepartment.instance;
    }

    describe() {
        console.log('Accounting department - ID: ', this.id);
    }

    addReport(report: string) {
        this.reports.push(report);
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = AccountingDepartment.getInstance('d1', ['accounting']);
const accounting2 = AccountingDepartment.getInstance('d5', ['Not accounting']);

console.log(accounting, accounting2);

accounting.describe();

const itDepartment = new ITDepartment('d2', ['henk', 'harry']);

itDepartment.describe();
