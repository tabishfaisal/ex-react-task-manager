import Routes from './Routes/Routes';
import GlobalProvider from './Context/GlobalContext';

const App = () => {
  return (
    <div>
      <GlobalProvider>
      <Routes />
      </GlobalProvider>
    </div>
  )
}

export default App;

