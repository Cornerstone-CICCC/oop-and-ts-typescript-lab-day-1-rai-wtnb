// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.

enum TransactionType {
  Deposit,
  Withdraw,
}

interface Transaction {
  readonly accountNo: number;
  readonly amount: number;
  readonly type: TransactionType;
}

interface BankAccount {
  readonly accountNo: number;
  firstname: string;
  lastname: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[];
}

let accounts: BankAccount[] = [];

function createAccount(
  accountNo: number,
  firstname: string,
  lastname: string,
  initialDeposit: number,
  isActive: boolean = true,
): BankAccount {
  const account: BankAccount = {
    accountNo,
    firstname,
    lastname,
    balance: initialDeposit,
    isActive,
    transactions: [],
  };
  accounts.push(account);
  return account;
}

function processTransaction(
  accountNo: number,
  amount: number,
  transactionType: TransactionType,
): string {
  const account = accounts.find((acc) => acc.accountNo === accountNo);
  if (!account) throw new Error("Account not found");

  if (transactionType === TransactionType.Deposit) {
    account.balance += amount;
    const transaction: Transaction = {
      accountNo,
      amount,
      type: transactionType,
    };
    account.transactions.push(transaction);
    return `${amount} deposited into account number ${accountNo}`;
  } else if (transactionType === TransactionType.Withdraw) {
    if (account.balance >= amount) {
      account.balance -= amount;
      const transaction: Transaction = {
        accountNo,
        amount,
        type: transactionType,
      };
      account.transactions.push(transaction);
      return `${amount} withdrawn from account number ${accountNo}`;
    } else {
      throw new Error("Insufficient funds for withdrawal");
    }
  }
  throw new Error("Invalid transaction type");
}

function getBalance(accountNo: number): number {
  const account = accounts.find((acc) => acc.accountNo === accountNo);
  if (!account) throw new Error("Account not found");
  return account.balance;
}

function getTransactionHistory(accountNo: number): Transaction[] {
  const account = accounts.find((acc) => acc.accountNo === accountNo);
  if (!account) throw new Error("Account not found");
  return account.transactions;
}

function checkActiveStatus(accountNo: number): boolean {
  const account = accounts.find((acc) => acc.accountNo === accountNo);
  if (!account) throw new Error("Account not found");
  return account.isActive;
}

function closeAccount(accountNo: number): string {
  const index = accounts.findIndex((acc) => acc.accountNo === accountNo);
  if (index !== -1) {
    accounts.splice(index, 1);
    return `Account number ${accountNo} closed`;
  }
  throw new Error("Account not found");
}

// Test cases (students should add more)
try {
  console.log(createAccount(1, "John", "Smith", 100)); // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
  console.log(processTransaction(1, 50, TransactionType.Deposit)); // "50 deposited into account number 1"
  console.log(processTransaction(1, 20, TransactionType.Withdraw)); // "20 withdrawn from account number 1"
  try {
    console.log(processTransaction(1, 500, TransactionType.Withdraw)); // Error: Insufficient funds for withdrawal
  } catch (e) {
    console.log((e as Error).message);
  }
  console.log(getBalance(1)); // 130
  console.log(getTransactionHistory(1)); // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
  console.log(checkActiveStatus(1)); // true
  console.log(closeAccount(1)); // "Account number 1 closed"
} catch (e) {
  console.log((e as Error).message);
}
