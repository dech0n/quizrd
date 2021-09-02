import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/HomePage/HomePage.js'
import CardCreator from './components/Card/CardCreator';
import StudyDeck from './components/Deck/StudyDeck';
import Footer from './components/Footer/Footer'
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';

// TODO: Add Page Not Found Component
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/decks/:deckId/cards/add' exact={true} >
          <CardCreator />
        </ProtectedRoute>
        <Route path='/decks/:deckId/study' exact={true}>
          <StudyDeck />
        </Route>
        <Route path='/welcome'>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
