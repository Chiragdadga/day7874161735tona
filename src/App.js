import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Slider from './slider/Slider';
import SliderDetails from './slider/SliderDetails';

function App() {
  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route path="/slider" exact component={ Slider } />
            <Route path="/slider/:id" exact component={ SliderDetails } />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
