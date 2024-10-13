import fp from 'fastify-plugin'
import fastifyElasticsearch from '@fastify/elasticsearch';

export default fp(async (fastify) => {
    fastify.register(fastifyElasticsearch, {
        node: 'http://localhost:9200',
        auth: {  
          username: 'elastic',  
          password: 'elastic'  
        },
        healthcheck: false
    });
    
    fastify.decorate('getDataFromElasticsearch', async (index, query, from = 0, size = 10) => {
        try {
            const body = await fastify.elastic.search({
              index,
              body: {
                query,
                from,
                size
              }
            });
            return {
              hits: body.hits.hits.map(hit => hit._source),
              total: body.hits.total.value
            };
          } catch (error) {
            fastify.log.error(error);
            throw new Error('Failed to fetch data from Elasticsearch');
          }
      });
  })