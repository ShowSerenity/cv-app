import { createServer, Model, Response } from 'miragejs';

export default function makeServer() {
  return createServer({
    models: {
      education: Model,
      skill: Model
    },

    seeds(server) {
      server.db.loadData({
        educations: [
          {
            id: '1',
            date: '2022',
            title: 'NIS Taldykorgan',
            description:
              'Graduated from Nazarbayev Intellectual School with a strong academic background and early interest in technology.'
          },
          {
            id: '2',
            date: '2025',
            title: 'B.A. in Software Engineering — Astana IT University',
            description:
              'Completed undergraduate studies in Software Engineering with a focus on programming, systems thinking, and applied software development.'
          },
          {
            id: '3',
            date: '2027',
            title: 'M.S. in Applied Artificial Intelligence — Astana IT University',
            description:
              'Currently pursuing a master’s degree in Applied Artificial Intelligence, expanding expertise in machine learning, intelligent systems, and practical AI applications.'
          }
        ],
        skills: [
          { id: '1', name: 'HTML', range: 85 },
          { id: '2', name: 'CSS / SCSS', range: 82 },
          { id: '3', name: 'JavaScript', range: 80 },
          { id: '4', name: 'TypeScript', range: 74 },
          { id: '5', name: 'React', range: 78 }
        ]
      });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 3000;

      this.get('/educations', (schema) => {
        const educations = schema.db.educations;
        return educations;
      });

      this.get('/skills', (schema) => {
        const skills = schema.db.skills;
        return skills;
      });

      this.post('/skills', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as {
          name?: string;
          range?: number;
        };

        const name = attrs.name?.trim();

        if (!name || typeof attrs.range !== 'number') {
          return new Response(
            400,
            {},
            { message: 'Name and range are required.' }
          );
        }

        const createdSkill = schema.db.skills.insert({
          name,
          range: attrs.range
        });

        return new Response(201, {}, createdSkill);
      });
    }
  });
}