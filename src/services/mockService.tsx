import { Expense, TransactionListItem } from 'models';

class mockService {
  static generateMockIncomes(count: number): TransactionListItem[] {
    const transactions: TransactionListItem[] = [];
    const names = ['Salary', 'Freelance Payment', 'Investment Income', 'Bonus'];
    const dates = ['2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04'];
    const minAmount = 1000;
    const maxAmount = 5000;

    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomDate = dates[Math.floor(Math.random() * dates.length)];
      const randomAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
      transactions.push({
        name: randomName,
        date: randomDate,
        amount: randomAmount
      });
    }

    return transactions;
  }

  static generateMockExpensesForTransactions(count: number): TransactionListItem[] {
    const transactions: TransactionListItem[] = [];
    const names = ['ZooMarket', 'Novus', 'Metro', 'Greek House'];
    const dates = ['2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04'];
    const minAmount = -100;
    const maxAmount = -3000;

    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomDate = dates[Math.floor(Math.random() * dates.length)];
      const randomAmount = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount;
      transactions.push({
        name: randomName,
        date: randomDate,
        amount: randomAmount
      });
    }

    return transactions;
  }

  static generateMockExpenses(count: number): Expense[] {
    const expenses: Expense[] = [];
    const categoryIds = ['category1', 'category2', 'category3', 'category4'];
    const descriptions = ['Expense 1', 'Expense 2', 'Expense 3', 'Expense 4'];

    for (let i = 0; i < count; i++) {
      const id = `expense_${i + 1}`;
      const categoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
      const amount = Math.floor(Math.random() * 1000);
      const setDate = new Date().toISOString();
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];

      const expense: Expense = {
        id,
        categoryId,
        amount,
        setDate,
        description
      };

      expenses.push(expense);
    }

    return expenses;
  }
}

export default mockService;
