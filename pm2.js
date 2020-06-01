module.exports = {
    apps: [
      {
        script: 'node_modules/.bin/ts-node',
        args: '-T -r tsconfig-paths/register ./index.ts',
        instances: 3,
        exec_mode: 'cluster',
      }]
    }