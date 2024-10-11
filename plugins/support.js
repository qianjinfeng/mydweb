'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {

  // needs to support query with following keys
  // StudyDate 00080020
  // StudyTime 00080030
  // AccessionNumber 00080050
  // ModalitiesInStudy 00080061
  // ReferringPhysicianName 00080090
  // PatientName 00100010
  // PatientID 00100020
  // StudyInstanceUID 0020000D
  // StudyID 00200010
  // add accessor methods with decorate
  fastify.decorate('getQIDOStudies', (request, reply) => {
    // const res = [];

    // const newobj = {};
    // newobj['00080005'].Value.push('instudies');
    // newobj['00080005'].vr = 'CS';
    // res.push(newobj);

    // reply.code(200).send(res);
    return [
      {
        "00080005": {
          "vr": "CS",
          "Value": ["1.2.3.4"]
        }
      }
    ];

  });

  fastify.decorate('getQIDOSeries', (request, reply) => {
    const res = [];

    const newobj = {};
    newobj['00080005'].Value.push('inseries');
    newobj['00080005'].vr = 'CS';
    res.push(newobj);

    reply.code(200).send(res);
  });

  fastify.decorate('getQIDOInstances', (request, reply) => {
    const res = [];

    const newobj = {};
    newobj['00080005'].Value.push('ininstance');
    newobj['00080005'].vr = 'CS';
    res.push(newobj);

    reply.code(200).send(res);
  });

})
