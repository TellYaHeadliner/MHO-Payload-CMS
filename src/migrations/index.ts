import * as migration_20260805_151337 from './20260805_151337';
import * as migration_20260811_100248 from './20260811_100248';

export const migrations = [
  {
    up: migration_20260805_151337.up,
    down: migration_20260805_151337.down,
    name: '20260805_151337',
  },
  {
    up: migration_20260811_100248.up,
    down: migration_20260811_100248.down,
    name: '20260811_100248'
  },
];
