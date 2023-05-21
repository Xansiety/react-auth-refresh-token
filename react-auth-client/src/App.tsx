import { AuthProvider } from './context';
import { Register, Login } from './pages';

const App = () => {
  return (
    <AuthProvider>
      <main className="App">
        <div className="app-theme">
          <Login />
          <Register />
        </div>
      </main>
    </AuthProvider>
  );
};
export default App;
