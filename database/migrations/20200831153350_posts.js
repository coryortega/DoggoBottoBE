
exports.up = function(knex) {
    return knex.schema
    .createTable("posts", tbl => {
        tbl.increments();
        tbl
          .string("key")
        tbl
          .string("caption", 280)
        tbl
          .string("name")
        tbl
          .string("username")
        tbl
          .text("img")
        tbl
          .boolean("posted")
        tbl
          .boolean("verified")
      });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('posts');
};
