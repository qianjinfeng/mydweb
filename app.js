'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // require schema jsons
  const patientsSchema = require('./schemas/patients_output_schema.json');
  const studiesSchema = require('./schemas/studies_output_schema.json');
  const seriesSchema = require('./schemas/series_output_schema.json');
  const instancesSchema = require('./schemas/instances_output_schema.json');
  const testSchema = require('./schemas/test_schema.json');

  // add schemas to fastify to use by id
  fastify.addSchema(patientsSchema);
  fastify.addSchema(studiesSchema);
  fastify.addSchema(seriesSchema);
  fastify.addSchema(instancesSchema);
  fastify.addSchema(testSchema);

  // 打印 schema 以进行调试
  console.log(JSON.stringify(testSchema, null, 2));


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

module.exports.options = options
