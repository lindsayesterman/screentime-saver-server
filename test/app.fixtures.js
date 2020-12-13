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

  module.exports = {
    makeUsersArray,
    makeFriendsArray
  }