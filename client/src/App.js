import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import { Home } from './pages/home.js';
import { Auth } from './pages/auth.js';
import { CreateRecipe } from './pages/create-recipe.jsx';
import { SavedRecipes } from './pages/saved-recipes.js';
import { Navbar } from './components/Navbar'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/auth' element={<Auth/>} />
          <Route path='/create-recipe' element={<CreateRecipe/>} />
          <Route path='/saved-recipes' element={<SavedRecipes/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
