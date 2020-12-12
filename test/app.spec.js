const app = require("../src/app");
const knex = require("knex");
const usersRouter = require("../src/users/users-router");
const friendsRouter = require("../src/friends/friends-router");

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
  

  describe("App", () => {
    it('GET / responds with 200 containing "Hello, world!"', () => {
      return supertest(app).get("/").expect(200, "Hello, world!");
    });
  });

  function makeUsersArray() {
    return [
      {
        id: 300,
        date_created: "2029-01-22T16:28:32.615Z",
        user_name: "sam.gamgee@shire.com",
        user_password: "secret",
        user_bio: "hey"
      },
      {
        id: 301,
        date_created: "2100-05-22T16:28:32.615Z",
        user_name: "peregrin.took@shire.com",
        user_password: "secret",
        user_bio: "hi"
      },
    ];
  }

    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });

      it("responds with 200 and all of the users", () => {
        return supertest(app).get("/api/users").expect(200, testUsers);
      });
    });



    function makeFriendsArray() {
      return [
        {
          id: 308,
          friend_name: "thefriendsam.gamgee@shire.com",
          friend_user_id: "8",
          date_created: "2029-01-22T16:28:32.615Z",
        },
        {
          id: 309,
          friend_name: "peregrin.took@shire.com",
          friend_user_id: "9",
          date_created: "2100-05-22T16:28:32.615Z",
        },
      ];
    }
  
      context("Given there are friends in the database", () => {
        const testFriends = makeFriendsArray();
  
        beforeEach("insert friends", () => {
          return db.into("friends").insert(testFriends);
        });
  
        it("responds with 200 and all of the friends", () => {
          return supertest(app).get("/api/friends").expect(200, testFriends);
        });
      });
  
});
