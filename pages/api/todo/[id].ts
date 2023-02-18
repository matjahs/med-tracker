import redis, { databaseName } from '@/lib/redis';
import type { NextApiHandler } from 'next';

export const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { id } = req.query;
  const { text, status } = req.body;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Missing id' });
  }

  switch (method) {
    case 'PUT':
      const result = await redis.hset(databaseName, { [id]: { text, status } });

      console.log(`[PUT] /api/todo/${id}`, { text, status });

      return res.status(200).json({ message: 'Updated' });

    case 'DELETE':
      await redis.hdel(databaseName, id);

      console.log(`[DELETE] /api/todo/${id}`);

      return res.status(200).json({ message: 'Deleted' });

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
