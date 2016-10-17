/* global jest, describe, it, expect */
/* eslint-disable no-multiple-empty-lines */

const deline = require('../deline');

describe('deline', () => {
  it('works without interpolation', () => {
    const result = deline`some
      text with
      newlines`;
    expect(result).toBe('some text with newlines');
  });

  it('works with interpolation', () => {
    const result = deline`first ${'line'}
                      ${'second'}
                      third`;
    expect(result).toBe('first line second third');
  });

  it('works with blank first line', () => {
    const result = deline`
      Lorem ipsum
      dolor sit amit
    `;

    expect(result).toBe('Lorem ipsum dolor sit amit');
  });

  it('works with multiple blank first lines', () => {
    const result = deline`

                    first
                    second
                    third`;
    expect(result).toBe('first second third');
  });

  it('turns a double newline into a single newline', () => {
    const result = deline`
      It is wednesday

      my dudes
    `;
    expect(result).toBe('It is wednesday\nmy dudes');
  });

  it('turns more than 2 newlines into a single newline', () => {
    const result = deline`
      It is wednesday






      my dudes
    `;
    expect(result).toBe('It is wednesday\nmy dudes');
  });

  describe('single line input', () => {
    const expected = 'A single line of input.';

    it('works with single line input', () => {
      const result = deline`A single line of input.`;
      expect(result).toBe(expected);
    });

    it('works with single line and closing backtick on newline', () => {
      const result = deline`
        A single line of input.
      `;
      expect(result).toBe(expected);
    });

    it('works with single line and inline closing backtick', () => {
      const result = deline`
        A single line of input.`;
      expect(result).toBe(expected);
    });
  });

  it('can be used as a function', () => {
    const arg = `
      A test argument.
    `;
    expect(deline(arg)).toBe('A test argument.');
  });

  it('escapes backticks', () => {
    expect(deline`\``).toBe('`');
  });

  it('doesn’t strip exlicit newlines', () => {
    const result = deline`
      <p>Hello world!</p>\n
    `;
    expect(result).toBe('<p>Hello world!</p>\n');
  });
});
