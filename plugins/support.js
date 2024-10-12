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
  fastify.decorate('getQIDOStudies', async (request, reply) => {
    try {
      const res = [];

      const newobj = {};
      newobj['00080005'] = { vr: 'CS'};
      newobj['00080005'].Value = [];
      newobj['00080005'].Value.push('instudies');
      res.push(newobj);
  
      

      const index = request.query.index || 'your-index-name';
      const query = request.query.query || { match_all: {} };
      const from = parseInt(request.query.from) || 0;
      const size = parseInt(request.query.size) || 10;
  
      const rawData = await fastify.getDataFromElasticsearch(index, query, from, size);
      // const processedData = processData(rawData);
  
      // // 设置响应头中的分页信息
      // reply.header('X-Total-Count', processedData.total);
      // reply.header('X-Page-Size', size);
      // reply.header('X-Current-Page', Math.floor(from / size) + 1);
      // reply.header('X-Total-Pages', Math.ceil(processedData.total / size));
  
      // 返回处理后的数据
      // reply.send(processedData.data);

      reply.code(200).send(res);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }



  });

  fastify.decorate('getQIDOSeries', (request, reply) => {
    const res = [];

    const newobj = {};
    newobj['00080005'] = { vr: 'CS'};
    newobj['00080005'].Value = [];
    newobj['00080005'].Value.push('inseries');
    res.push(newobj);

    reply.code(200).send(res);
  });

  fastify.decorate('getQIDOInstances', (request, reply) => {
    const res = [];

    const newobj = {};
    newobj['00080005'] = { vr: 'CS'};
    newobj['00080005'].Value = [];
    newobj['00080005'].Value.push('ininstance');
    res.push(newobj);

    reply.code(200).send(res);
  });

})
