import { OrderStore } from '../../models/order_model';
const store = new OrderStore();

describe('Orders model', () => {
  it('create method should add a new order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: 2,
    });
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: 2,
    });
  });

  it('index method should return a list of orders', async () => {
    const create = await store.create({
      status: 'completed',
      user_id: 1,
    });
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        status: 'active',
        user_id: 2,
      },
      {
        id: 2,
        status: 'completed',
        user_id: 1,
      },
    ]);
  });

  it('show method should return one order by id', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: 2,
    });
  });
});
