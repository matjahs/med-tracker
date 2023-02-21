import type { NextApiHandler } from 'next';
import { createTodo, getTodos } from '@/lib/cosmos';

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { text, users, time } = req.body;

  switch(method) {
    case 'GET':
      try {
        const data = await getTodos();

        return res.status(200).json(data);
      } catch(error) {
        return res.status(500).json({ message: `failed to get todo's`, error: error });
      }

    case 'POST':
      try {
        if(text === undefined || text === null) {
          return res.status(400).json({ message: 'field required: text' });
        }

        const parsedTime = new Date(time);
        if(!parsedTime) {
          return res.status(400).json({ message: `field required: time, got: ${time}` });
        }

        const todo = await createTodo({
          id: Date.now().toString(),
          text,
          time,
          users
        });

        return res.status(201).json(todo);
      } catch {
        return res.status(500).json({ message: `failed to create todo: ${JSON.stringify({ time, text, users }, null, 2)}` });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
