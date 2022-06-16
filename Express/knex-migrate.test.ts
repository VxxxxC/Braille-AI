import { knex } from './knex';

console.log('NODE_ENV:', process.env.NODE_ENV);

describe('knex migrate test', () => {

   it('migration should pass', async () => {
      let config = undefined;
      let all = true;

      await knex.migrate.rollback(config, all);
      await knex.migrate.latest();
   })

   it('should running seed without error', async () => {
      await knex.seed.run();
   })
   
})