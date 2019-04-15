exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex("users").insert([
    { id: 1, handle: "Jimmy H",  },
    { id: 2, handle: "Dylan D",  },
    { id: 3, handle: "Mike C",  }
  ]);
};
