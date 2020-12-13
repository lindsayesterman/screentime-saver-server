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
        id: 1,
        friend_name: "thefriendsam.gamgee@shire.com",
        friend_user_id: "4",
        date_created: "2029-01-22T16:28:32.615Z",
      },
      {
        id: 2,
        friend_name: "peregrin.took@shire.com",
        friend_user_id: "5",
        date_created: "2100-05-22T16:28:32.615Z",
      },
    ];
  }

  function makeScrtimesArray() {
    return [
      {
        id: 1,
        day_1: "6",
        day_2: "2",
        day_3: "4",
        day_4: "4",
        day_5: "5",
        day_6: "3",
        day_7: "6",
        user_id: null
      },
      {
        id: 2,
        day_1: "3",
        day_2: "4",
        day_3: "2",
        day_4: "3",
        day_5: "4",
        day_6: "5",
        day_7: "4",
        user_id: null
      },
    ];
  }

  module.exports = {
    makeUsersArray,
    makeFriendsArray,
    makeScrtimesArray
  }