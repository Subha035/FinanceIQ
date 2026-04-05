// Generate 60 mock transactions across the last 6 months
const categories = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Rent', 'Education', 'Freelance Income', 'Salary', 'Investment Return', 'Gym & Fitness'];
const incomeCategories = ['Salary', 'Freelance Income', 'Investment Return'];
const expenseCategories = ['Food & Dining', 'Transport', 'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Rent', 'Education', 'Gym & Fitness'];

const descriptions = {
  'Food & Dining': ['Dinner at Spice Kitchen', 'McDonald\'s', 'Grocery Store', 'Coffee at Brew & Co', 'Pizza Hut Order', 'Swiggy Order', 'Zomato Delivery'],
  'Transport': ['Uber Ride', 'Ola Cab', 'Metro Card Recharge', 'Petrol Fill-up', 'Auto Rickshaw', 'Flight Ticket'],
  'Shopping': ['Amazon Purchase', 'Flipkart Order', 'Clothes - H&M', 'Electronics - Croma', 'Books - Crossword'],
  'Entertainment': ['Netflix Subscription', 'Spotify Premium', 'Movie Tickets - PVR', 'Gaming - Steam', 'YouTube Premium'],
  'Healthcare': ['Doctor Consultation', 'Pharmacy - Medplus', 'Lab Tests', 'Health Insurance Premium'],
  'Utilities': ['Electricity Bill', 'Water Bill', 'Internet - JioFiber', 'Mobile Recharge'],
  'Rent': ['Monthly Rent Payment', 'Society Maintenance'],
  'Education': ['Udemy Course', 'Coursera Subscription', 'Books - O\'Reilly', 'Workshop Fee'],
  'Freelance Income': ['Client Project - WebApp', 'Freelance Design Work', 'Consulting Fee', 'Client Payment - Mobile App'],
  'Salary': ['Monthly Salary - TechCorp', 'Performance Bonus', 'Salary Credit'],
  'Investment Return': ['Mutual Fund Returns', 'FD Interest', 'Dividend Income', 'Stock Profit'],
  'Gym & Fitness': ['Gym Monthly Fee', 'Yoga Class', 'Swimming Membership'],
};

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate(monthsAgo, dayOfMonth) {
  const d = new Date(2026, 3 - monthsAgo, dayOfMonth); // April 2026 base
  return d.toISOString().split('T')[0];
}

let idCounter = 1;

function makeTransaction(category, monthsAgo) {
  const isIncome = incomeCategories.includes(category);
  const descArr = descriptions[category];
  const description = descArr[randomBetween(0, descArr.length - 1)];
  let amount;
  if (category === 'Salary') amount = randomBetween(55000, 75000);
  else if (category === 'Freelance Income') amount = randomBetween(8000, 25000);
  else if (category === 'Investment Return') amount = randomBetween(1000, 8000);
  else if (category === 'Rent') amount = randomBetween(12000, 18000);
  else if (category === 'Utilities') amount = randomBetween(500, 3000);
  else if (category === 'Healthcare') amount = randomBetween(300, 5000);
  else if (category === 'Shopping') amount = randomBetween(500, 8000);
  else if (category === 'Entertainment') amount = randomBetween(200, 2000);
  else if (category === 'Food & Dining') amount = randomBetween(100, 2500);
  else if (category === 'Transport') amount = randomBetween(50, 1500);
  else if (category === 'Education') amount = randomBetween(500, 5000);
  else if (category === 'Gym & Fitness') amount = randomBetween(800, 3000);
  else amount = randomBetween(200, 2000);

  return {
    id: `TXN${String(idCounter++).padStart(4, '0')}`,
    date: generateDate(monthsAgo, randomBetween(1, 28)),
    description,
    category,
    type: isIncome ? 'income' : 'expense',
    amount,
  };
}

export const mockTransactions = [
  // Month 0 (April 2026 - current)
  makeTransaction('Salary', 0),
  makeTransaction('Food & Dining', 0),
  makeTransaction('Transport', 0),
  makeTransaction('Rent', 0),
  makeTransaction('Utilities', 0),
  makeTransaction('Shopping', 0),
  makeTransaction('Entertainment', 0),
  makeTransaction('Food & Dining', 0),
  makeTransaction('Freelance Income', 0),
  makeTransaction('Gym & Fitness', 0),

  // Month 1 (March 2026)
  makeTransaction('Salary', 1),
  makeTransaction('Food & Dining', 1),
  makeTransaction('Transport', 1),
  makeTransaction('Rent', 1),
  makeTransaction('Shopping', 1),
  makeTransaction('Entertainment', 1),
  makeTransaction('Healthcare', 1),
  makeTransaction('Utilities', 1),
  makeTransaction('Food & Dining', 1),
  makeTransaction('Investment Return', 1),
  makeTransaction('Freelance Income', 1),
  makeTransaction('Education', 1),

  // Month 2 (Feb 2026)
  makeTransaction('Salary', 2),
  makeTransaction('Food & Dining', 2),
  makeTransaction('Transport', 2),
  makeTransaction('Rent', 2),
  makeTransaction('Shopping', 2),
  makeTransaction('Entertainment', 2),
  makeTransaction('Healthcare', 2),
  makeTransaction('Utilities', 2),
  makeTransaction('Gym & Fitness', 2),
  makeTransaction('Investment Return', 2),
  makeTransaction('Food & Dining', 2),

  // Month 3 (Jan 2026)
  makeTransaction('Salary', 3),
  makeTransaction('Food & Dining', 3),
  makeTransaction('Transport', 3),
  makeTransaction('Rent', 3),
  makeTransaction('Shopping', 3),
  makeTransaction('Entertainment', 3),
  makeTransaction('Healthcare', 3),
  makeTransaction('Utilities', 3),
  makeTransaction('Education', 3),
  makeTransaction('Freelance Income', 3),

  // Month 4 (Dec 2025)
  makeTransaction('Salary', 4),
  makeTransaction('Food & Dining', 4),
  makeTransaction('Transport', 4),
  makeTransaction('Rent', 4),
  makeTransaction('Shopping', 4),
  makeTransaction('Entertainment', 4),
  makeTransaction('Healthcare', 4),
  makeTransaction('Investment Return', 4),
  makeTransaction('Gym & Fitness', 4),
  makeTransaction('Freelance Income', 4),

  // Month 5 (Nov 2025)
  makeTransaction('Salary', 5),
  makeTransaction('Food & Dining', 5),
  makeTransaction('Transport', 5),
  makeTransaction('Rent', 5),
  makeTransaction('Shopping', 5),
  makeTransaction('Utilities', 5),
  makeTransaction('Entertainment', 5),
  makeTransaction('Investment Return', 5),
  makeTransaction('Education', 5),
  makeTransaction('Healthcare', 5),
];

// Sort by date desc
mockTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
