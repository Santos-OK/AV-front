import { EquipmentProvider } from './context/EquipmentContext';
import Layout from './components/layout';

function App() {
  return (
    <EquipmentProvider>
      <Layout />
    </EquipmentProvider>
  );
}

export default App;
