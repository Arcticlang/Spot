/******************************************************************\
 
 CODE IS RIPPED FROM https://github.com/keqingrong/supports-ansi/

\******************************************************************/

'use strict';
const os = require('os');
//const isMinGW = require('is-mingw');

const env = process.env;

export const supportsAnsi = () => {
  // Check if it is running in the terminal.
  // NOTE: `process.stdout.isTTY` always return undefined on Cygwin.
  // See https://github.com/nodejs/node/issues/3006
  if (!process.stdout.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    // Be natively supported on Windows 10 after v.1607 ("Anniversery Update",
    // OS build 14393).
    // Reference: https://api.dartlang.org/stable/1.24.3/dart-io/Stdout/supportsAnsiEscapes.html
    const osRelease = os.release().split('.');
    if (
      parseInt(osRelease[0], 10) >= 10 && // major version
      parseInt(osRelease[2], 10) >= 14393 // build number
    ) {
      return true;
    }
  }

  // Check if the terminal is of type ANSI/VT100/xterm compatible.
  const pattern = [
    '^xterm', // xterm, PuTTY, Mintty
    '^rxvt', // RXVT
    '^eterm', // Eterm
    '^screen', // GNU screen, tmux
    '^tmux', // tmux
    '^vt100', '^vt102', '^vt220', '^vt320', // DEC VT series
    'ansi', // ANSI
    'scoansi', // SCO ANSI
    'cygwin', // Cygwin, MinGW
    'linux', // Linux console
    'konsole', // Konsole
    'bvterm' // Bitvise SSH Client
  ].join('|');
  const regex = new RegExp(pattern, 'i');
  if (
    env.TERM &&
    env.TERM !== 'dumb' &&
    regex.test(env.TERM)
  ) {
    return true;
  }

  // ConEmu (from build 120520d) can process ANSI X3.64 when the environment
  // variable `ConEmuANSI` is set to `ON`.
  // See https://conemu.github.io/en/AnsiEscapeCodes.html#Environment_variable
  const isConEmuAnsiOn = (env.ConEmuANSI || '').toLowerCase() === 'on';
  if (isConEmuAnsiOn) {
    return true;
  }

  // ANSICON provides ANSI escape sequences for Windows console programs. It
  // will create an `ANSICON` environment variable.
  // NOTE: ANSICON supports only a subset of ANSI escape sequences.
  // See https://github.com/adoxa/ansicon/blob/master/ANSI.c#L38
  if (!!env.ANSICON) {
    return true;
  }

  return false;
};