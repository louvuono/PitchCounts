import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render expenses summary with 1 expense', () => {
    const wrapper =  shallow(<ExpensesSummary expenseCount={1} expenseTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render expenses summary with multiple expenses', () => {
    const wrapper =  shallow(<ExpensesSummary expenseCount={12} expenseTotal={756298}/>);
    expect(wrapper).toMatchSnapshot();
});