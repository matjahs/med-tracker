import { deleteTodo, updateTodo } from '@/lib/cosmos';
import type { NextApiHandler } from 'next';

export const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { id } = req.query;
  const { text, users, time } = req.body;

  if(!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Missing id' });
  }

  switch(method) {
    case 'PUT':
      try {
        await updateTodo({ id, text, time, users });

        return res.status(200).json({ message: 'Updated' });
      } catch {
        return res.status(500).json({ message: `failed to update todo with id: ${id}` });
      }

    case 'DELETE':
      try {
        await deleteTodo(id);

        return res.status(200).json({ message: 'Deleted' });
      } catch {
        return res.status(500).json({ message: `failed to delete todo with id: ${id}` });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
