const MyReact = (function () {
  let hooks = [],
    currentHook = 0; // array of hooks, and an iterator!
  return {
    render(Component) {
      const Comp = Component(); // run effects
      Comp.render();
      currentHook = 0; // reset for next render
      return Comp;
    },
    useEffect(callback, depArray) {
      console.log("current hook", currentHook, hooks);
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: array | undefined
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // done with this hook
    },
    useState(initialValue) {
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // for setState's closure!
      const setState = (newState) => (hooks[setStateHookIndex] = newState);
      return [hooks[currentHook++], setState];
    },
    useRef(initialValue) {
      hooks[currentHook] = hooks[currentHook] || { current: initialValue }; // type: any
      return hooks[currentHook++];
    },
  };
})();
// Example 4 continued - in usage
function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState("foo"); // 2nd state hook!
  MyReact.useEffect(() => {
    console.log("effect", count, text);
  }, [count, text]);
  const ref = MyReact.useRef(null);
  console.log("ref.", ref.current);
  return {
    click: () => {
      setCount(count + 1);
      ref.current = "hello";
    },
    type: (txt) => setText(txt),
    noop: () => setCount(count),
    render: () => console.log("render", { count, text }),
  };
}
let App;
App = MyReact.render(Counter);
// effect 0 foo
// render {count: 0, text: 'foo'}
App.click();
App = MyReact.render(Counter);

// effect 1 foo
// render {count: 1, text: 'foo'}
App.type("bar");
App = MyReact.render(Counter);
// effect 1 bar
// render {count: 1, text: 'bar'}
App.noop();
App = MyReact.render(Counter);
// // no effect run
// render {count: 1, text: 'bar'}
App.click();
App = MyReact.render(Counter);
// effect 2 bar
// render {count: 2, text: 'bar'}
