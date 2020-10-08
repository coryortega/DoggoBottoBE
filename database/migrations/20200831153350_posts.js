exports.up = function (knex) {
  return knex.schema
    .createTable("posts", (tbl) => {
      tbl.increments();
      tbl.string("key");
      tbl.string("caption", 280);
      tbl.string("name");
      tbl.string("username");
      tbl.text("img");
      tbl.boolean("verified");
      tbl.timestamp(true, true);
    })
    .createTable("verified", (tbl) => {
      tbl.increments();
      tbl.timestamp(true, true);
      tbl.string("post_date", 128);
      tbl.boolean("posted");
      tbl.string("twitter_id");
      tbl
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("rejected", (tbl) => {
      tbl.increments();
      tbl.timestamp(true, true);
      tbl
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("admin", (tbl) => {
      tbl.increments();
      tbl.string("username", 64).notNullable().unique();
      tbl.string("password", 64).notNullable();
      tbl.string("email", 128).notNullable().unique();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("posts")
    .dropTableIfExists("verified")
    .dropTableIfExists("rejected")
    .dropTableIfExists("admin");
};
