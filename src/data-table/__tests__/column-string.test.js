/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

import {StringColumn} from '../index.js';

let container: HTMLDivElement;

describe('string column', () => {
  beforeEach(() => {
    if (__BROWSER__) {
      container = document.createElement('div');
      if (document.body) {
        document.body.appendChild(container);
      }
    }
  });

  afterEach(() => {
    if (__BROWSER__) {
      if (document.body && container) {
        document.body.removeChild(container);
        container.remove();
      }
    }
  });

  it('is sortable by default', () => {
    const column = StringColumn({title: 'column'});
    expect(column.sortable).toBe(true);
  });

  it('is not filterable by default', () => {
    const column = StringColumn({title: 'column'});
    expect(column.filterable).toBe(false);
  });

  it('applies provided sortable value', () => {
    const column = StringColumn({title: 'column', sortable: false});
    expect(column.sortable).toBe(false);
  });

  it('cell renders provided value', () => {
    const column = StringColumn({title: 'column'});
    const Cell = column.renderCell;

    act(() => {
      ReactDOM.render(<Cell value="hello" />, container);
    });

    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('hello');
  });

  it('builds expected sort function', () => {
    const column = StringColumn({title: 'column'});
    const input = ['A', 'B', 'C', 'C', 'B', 'A'];
    input.sort(column.sortFn);

    const output = ['A', 'A', 'B', 'B', 'C', 'C'];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
