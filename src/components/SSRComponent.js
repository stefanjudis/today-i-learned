import { Component } from 'react';
import { storeState } from '../lib/store-state.js';

class SSRComponent extends Component {
  constructor(props) {
    super(props);

    // needed for react-snap
    window.snapSaveState = () => {
      storeState(this.state);
    };
  }
}

export default SSRComponent;
