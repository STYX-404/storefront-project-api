import { UsersStore } from "../../models/user_model";
const store = new UsersStore();

describe("Users model", () => {
  it("create method should add a new user", async () => {
    const result = await store.create({
      firstname: "mohamed",
      lastname: "taha",
      password: "password",
    });
    delete result.password;
    delete result.id;
    expect(result).toEqual({
      firstname: "mohamed",
      lastname: "taha",
    });
  });

  it("index method should return a list of users", async () => {
    const create = await store.create({
      firstname: "ahmed",
      lastname: "ali",
      password: "password",
    });
    const result = await store.index();
    expect(result.length).toEqual(2);
  });

  it("show method should return one user by id", async () => {
    const result = await store.show("1");
    delete result.password;
    delete result.id;
    expect(result).toEqual({
      firstname: "mohamed",
      lastname: "taha",
    });
  });
});
