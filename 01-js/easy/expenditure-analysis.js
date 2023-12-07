/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  const categoryWiseArray = [];
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    const result = {
      category: transaction.category,
      totalSpent: transaction.price,
    };

    console.log(result);

    let filterResult = categoryWiseArray.find(
      (x) => x.category == result.category
    );
    console.log("filtered array" + filterResult);

    if (filterResult) {
      filterResult.totalSpent = filterResult.totalSpent + transaction.price;
    } else {
      categoryWiseArray.push(result);
    }

    console.log("categoryWiseArray" + categoryWiseArray);
  }
  return categoryWiseArray;
}

module.exports = calculateTotalSpentByCategory;
