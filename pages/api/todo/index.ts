import redis, { databaseName } from '@/lib/redis';
import type { NextApiHandler } from 'next';
import type { TodoItem } from '@/global';

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  console.log(req.body);
  const { text } = req.body;

  switch (method) {
    case 'GET':
      const data = await redis.hgetall(databaseName);
      if (!data) {
        return res.status(200).json([]);
      }
      const todos = Object.keys(data)
        .map((key) => ({ ...data[key] as TodoItem, id: key }))
        .sort((a, b) => Number(a.id) - Number(b.id));

      console.log(`[GET] /api/todo`, JSON.stringify(todos, null, 2));

      return res.status(200).json(todos);
    case 'POST':
      const newId = Date.now().toString();
      const todo = JSON.stringify({ text, status: false });
      await redis.hset(databaseName, { [newId]: todo });

      console.log(`[POST] /api/todo`, JSON.stringify(todo, null, 2));

      return res.status(200).json({ message: 'Created' });

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
