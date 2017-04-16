// @flow

import {atom} from 'derivable';
import type {Atom} from 'derivable';
import {fromJS, Map, List} from 'immutable';

const $PersistentState = atom(Map({types: Map(), entries: List()}));
export default $PersistentState;

try {
  const fromStorage = localStorage.getItem('state');
  if (fromStorage) {
    $PersistentState.set(fromJS(JSON.parse(fromStorage)));
  }
} catch (e) {
  console.error(e, localStorage.getItem('state'));
}

export const $StringifiedPersistentState: Atom<string> = $PersistentState.lens({
  get(s: any) {
    return JSON.stringify(s.toJS(), null, '  ');
  },
  set(_, s: string) {
    return fromJS(JSON.parse(s));
  },
});

$StringifiedPersistentState.react(s => localStorage.setItem('state', s));

const $Hash = atom(window.location.hash);

window.onhashchange = () => $Hash.set(window.location.hash);

export const $route = $Hash.derive(h => h.slice(1).split('/').filter(x => x));
