const app = require("../src/app");
const knex = require("knex");
const { makeUsersArray, makeFriendsArray, makeScrtimesArray } = require('./app.fixtures')

describe("Endpoints", function () {
  let db;

  console.log(process.env.TEST_DATABASE_URL)

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE users, friends, scrtimes RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE users, friends, scrtimes RESTART IDENTITY CASCADE'))
  
    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });

      it("responds with 200 and all of the users", () => {
        return supertest(app).get("/api/users").expect(200, testUsers);
      });
    });
  
      context("Given there are friends in the database", () => {
        const testFriends = makeFriendsArray();
  
        beforeEach("insert friends", () => {
          return db.into("friends").insert(testFriends);
        });
  
        it("responds with 200 and all of the friends", () => {
          return supertest(app).get("/api/friends").expect(200, testFriends);
        });
      });

      context("Given there are scrtimes in the database", () => {
        const testScrtimes = makeScrtimesArray();
  
        beforeEach("insert scrtimes", () => {
          return db.into("scrtimes").insert(testScrtimes);
        });
  
        it("responds with 200 and all of the scrtimes", () => {
          return supertest(app).get("/api/scrtimes").expect(200, testScrtimes);
        });
      });
  
});
