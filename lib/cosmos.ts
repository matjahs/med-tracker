import { TodoItem } from "@/global";
import { Container, CosmosClient } from "@azure/cosmos";

const endpoint = process.env.AZURE_COSMOSDB_ENDPOINT;
const key = process.env.AZURE_COSMOSDB_KEY;

let db: Container | null = null;

export const getContainer = async (): Promise<Container> => {
  if (db !== null) {
    return db;
  }

  if (!endpoint || !key) {
    throw new Error('Missing Azure CosmosDB credentials');
  }

  const client = new CosmosClient({ endpoint, key });

  const { database } = await client.databases.createIfNotExists({ id: 'med-tracker-db' });

  const { container } = await database.containers.createIfNotExists({ id: 'med-tracker-container' });

  db = container;
  
  return db;
};

export const createTodo = async (todo: TodoItem): Promise<TodoItem> => {
  const container = await getContainer();

  const result = await container.items.create<TodoItem>(todo);

  if (result.statusCode !== 201 || !result.resource) {
    throw new Error('Failed to create item');
  }
  
  return result.resource;
};

export const getTodo = async (id: string): Promise<TodoItem> => {
  const container = await getContainer();

  const result = await container.item(id).read<TodoItem>();

  if (result.statusCode !== 200 || !result.resource) {
    throw new Error('Failed to get item');
  }
  
  return result.resource;
};

export const getTodos = async (): Promise<TodoItem[]> => {
  const container = await getContainer();
  
  const { resources: items } = await container.items.readAll<TodoItem>().fetchAll();

  return items;
}

export const deleteTodo = async (id: string): Promise<void> => {
  const container = await getContainer();

  const result = await container.item(id).delete();

  if (result.statusCode !== 204) {
    throw new Error('failed to delete item: ' + result.substatus?.toString());
  }
}

export const updateTodo = async (todo: TodoItem): Promise<TodoItem> => {
  const container = await getContainer();

  const result = await container.item(todo.id).replace<TodoItem>(todo);

  if (result.statusCode !== 200 || !result.resource) {
    throw new Error('Failed to update item');
  }

  return result.resource;
}
