const FriendsService = {
  getAllFriends(knex) {
    return knex.select("*").from("friends")
  },

  insertFriend(knex, newFriends) {
    return knex
      .insert(newFriends)
      .into("friends")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("friends").select("*").where("id", id).first();
  },

  getByUserId(knex, user_id) {
    return knex.from("friends").select("*").where("user_id", user_id).first();
  },

  deleteFriend(knex, id) {
    return knex("friends").where({ id }).delete();
  },

  updateFriend(knex, id, newFriendFields) {
    return knex("friends").where({ id }).update(newFriendFields);
  },
};

module.exports = FriendsService;
