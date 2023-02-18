import type { NextApiHandler } from 'next';
import { createTodo, getTodos } from '@/lib/cosmos';

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { text, status } = req.body;

  switch (method) {
    case 'GET':
      try {
        const data = await getTodos();
        
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ message: `failed to get todo's`, error: error });
      }

    case 'POST':
      try {
      const newId = Date.now().toString();
      
      const todo = await createTodo({ id: newId, text, status: false });
      
      return res.status(201).json(todo);
    } catch {
      return res.status(500).json({ message: `failed to create todo: ${JSON.stringify({text, status}, null, 2)}` });
    }
      

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
