import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsControllers {
  async index(request: Request, response: Response) {
    
  const items = await knex('items').select('*');

  const serialiazedItems = items.map(item => ({
    id: item.id,
    name: item.title,
    image_url: `http://${process.env.APP_URL}/uploads/${item.image}`
  }))

  return response.json(serialiazedItems)

  }
}
export default new ItemsControllers();