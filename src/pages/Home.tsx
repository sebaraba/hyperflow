import { WalletConnection } from '../components/WalletConnection';

export const Home = () => {
  return (
    <div className="home">
      <h1>HyperFlow</h1>
      <p>Your TypeScript React app with HyperEVM integration</p>
      <WalletConnection />
    </div>
  );
};
