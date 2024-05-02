import {
  Expense,
  ExpenseCategory,
  Subscription,
  SubscriptionResponse,
  TransactionListItem
} from 'models';

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
        amount: randomAmount,
        id: 'dwieow'
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

  static generateMockAllTransactions(count: number): TransactionListItem[] {
    const transactions: TransactionListItem[] = [];
    const names = ['ZooMarket', 'Novus', 'Metro', 'Greek House'];
    const dates = ['2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04'];
    const minAmount = -1000;
    const maxAmount = 4000;

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

  static generateMockSubscriptions(count: number): SubscriptionResponse {
    const subscriptions: Subscription[] = [];
    const statusOptions = [1, 0];
    const userId = 'user123';

    for (let i = 0; i < count; i++) {
      const id = `subscription_${i + 1}`;
      const transactionId = `transaction_${i + 1}`;
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
      const setDate = new Date();
      const endDate = new Date(setDate.getFullYear() + 1, setDate.getMonth(), setDate.getDate());

      const subscription: Subscription = {
        id,
        transactionId,
        status,
        setDate: setDate.toISOString(),
        endDate: endDate.toISOString(),
        userId
      };

      subscriptions.push(subscription);
    }

    return {
      items: subscriptions,
      page: 1,
      pageSize: count,
      totalCount: count,
      hasNextPage: false,
      hasPreviousPage: false
    };
  }

  static generateMockExpenseCategories(count: number): ExpenseCategory[] {
    const expenseCategories: ExpenseCategory[] = [];
    const categoryNames = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

    for (let i = 0; i < count; i++) {
      const categoryId = `category_${i + 1}`;
      const categoryName = categoryNames[i % categoryNames.length];

      const expenseCategory: ExpenseCategory = {
        categoryId,
        categoryName
      };

      expenseCategories.push(expenseCategory);
    }

    return expenseCategories;
  }
}

export default mockService;
