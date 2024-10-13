import path from 'path'
import AutoLoad from '@fastify/autoload'
import { fileURLToPath } from 'url'
import testSchema from './schemas/test_schema.json' assert { type: 'json' }
import studiesSchema from './schemas/studies_output_schema.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Pass --options via CLI arguments in command to enable these options.
export const options = {}

export default async function (fastify, opts) {
  // Place here your custom code!

    // require schema jsons
    // const patientsSchema = await import('./schemas/patients_output_schema.json' assert { type: 'json' });
    // const studiesSchema = await import('./schemas/studies_output_schema.json' assert { type: 'json' });
    // const seriesSchema = await import('./schemas/series_output_schema.json' assert { type: 'json' }); 
    // const instancesSchema = await import('./schemas/instances_output_schema.json' assert { type: 'json' }); 
    // const testSchema = await import('./schemas/test_schema.json' assert { type: 'json' }); 
  
    // add schemas to fastify to use by id
    // fastify.addSchema(patientsSchema);
    fastify.addSchema(studiesSchema);
    // fastify.addSchema(seriesSchema);
    // fastify.addSchema(instancesSchema);
    fastify.addSchema(testSchema);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
