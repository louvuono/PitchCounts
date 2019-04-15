// import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {  startAddExpense,  addExpense, 
          startEditExpense, editExpense, 
          startRemoveExpense, removeExpense, 
          startSetExpenses, setExpenses
        } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
    });
});

test('should remove the expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id
      });
      return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});
  
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: {
        note: 'New note value'
      }
    });
});
  
test('should edit the expense from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  const updates = {
    description: 'Water',
    note: 'February 2018',
    amount: 12500
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
          type: 'EDIT_EXPENSE',
          id,
          updates
      });
      return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toEqual(updates.amount);
    expect(snapshot.val().description).toEqual(updates.description);
    expect(snapshot.val().note).toEqual(updates.note);
    done();
  });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
    });
});
  
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };
  
    store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });
  
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});
  
test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
  
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
  
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should setup remove expense action object', () => {
  const id = expenses[0].id;
  const action = removeExpense({ id });
  expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id
  });
});




// test('should setup remove expense action object', () => {
//     const action = removeExpense({ id: '123abc'} );
//     expect(action).toEqual({
//         type: 'REMOVE_EXPENSE',
//         id: '123abc'
//     });
// });

// test('should setup exit expense action object', () => {
//     const action = editExpense('edit', { note: 'Test add note' });
//     expect(action).toEqual({
//         type: 'EDIT_EXPENSE',
//         id: 'edit',
//         updates: {
//             note: 'Test add note'
//         }
//     });
// });

// test('should setup add expense action object with provided values', () => {
//     const expenseData = {
//         description: 'Rent',
//         amount: 109500,
//         createdAt: 1000,
//         note: 'January Rent'
//     };
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }        
//     });
// });

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });