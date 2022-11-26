import { TransactionsTable } from 'components/transactionTable/transactionTable';
import Balance from 'components/balance/Balance';
import Media from 'react-media';

export const HomeTab = () => {
  return (
    <div>
      <h2>HomeTab</h2>
      <Media query="(max-width: 767px)" render={() => <Balance />} />

      <TransactionsTable />
    </div>
  );
};
