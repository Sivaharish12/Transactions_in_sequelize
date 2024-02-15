// Managed Transactions


/*
  Sequelize automatically handles committing or rolling back transactions.
  If any error occurs within the transaction, Sequelize rolls back automatically.
  Use sequelize.transaction() with an async callback.

*/

try {
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({ firstName: 'John', lastName: 'Doe' }, { transaction: t });
    await user.update({ age: 30 }, { transaction: t });
    return user;
  });
  // Transaction committed automatically
} catch (error) {
  // Transaction rolled back automatically
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Unmanaged Transactions

/*
  You manually commit or roll back the transaction using t.commit() or t.rollback().
  Useful when you need fine-grained control over transaction boundaries.
*/

const t = await sequelize.transaction();
try {
  await User.create({ firstName: 'Jane', lastName: 'Smith' }, { transaction: t });
  await t.commit(); // Manually commit the transaction
} catch (error) {
  await t.rollback(); // Manually roll back the transaction
}


// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// LOCKS
const product=await Product.findByPk(productId,{lock:true});
if(product.strockQuantity>=orderQuantity){
product.stockQuantity-=orderQuantity;
  await Product.save();
}
else{
  // Not enough stock,handle accordingly
}

