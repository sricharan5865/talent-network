import * as React from 'react';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

function Demo() {
  const [tab, setTab] = useState<'login' | 'sales'>('login');
  return React.createElement('div', null, 'Tab is: ' + tab);
}

function WithStateOverride({ children, override }: { children: React.ReactNode; override: (init: any, original: any) => any }) {
  const internals = (React as any).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  const currentH = internals.H;
  if (currentH && !currentH._patched) {
    const origUseState = currentH.useState;
    currentH.useState = function(initialState: any) {
      if ((globalThis as any).__hookOverride) {
        return (globalThis as any).__hookOverride(initialState, origUseState.bind(currentH));
      }
      return origUseState.call(currentH, initialState);
    };
    currentH._patched = true;
  }
  return React.createElement(React.Fragment, null, children);
}

// Render normally
console.log('Normal render:', renderToStaticMarkup(React.createElement(Demo)));

// Render with override
(globalThis as any).__hookOverride = (init: any, orig: any) => {
  if (init === 'login') return ['sales', () => {}];
  return orig(init);
};

console.log('Overridden render:', renderToStaticMarkup(
  React.createElement(WithStateOverride, null, React.createElement(Demo))
));

(globalThis as any).__hookOverride = null;
