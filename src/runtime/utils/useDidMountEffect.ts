import { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
  }, deps);
}

export default useDidMountEffect;

/* Usage example:

import React, { useState, useEffect } from 'react';

import useDidMountEffect from '../path/to/useDidMountEffect';

const MyComponent = (props) => {    
    const [state, setState] = useState({
        key: false
    });    

    useEffect(() => {
        // you know what is this, don't you?
    }, []);

    useDidMountEffect(() => {
        // react please run me if 'key' changes, but not on initial render
    }, [state.key]);    

    return (
        <div>
             ...
        </div>
    );
}
// ...

*/