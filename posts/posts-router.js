const express = require("express");
const Posts = require("./posts-model");
const knexfile = require("../knexfile");
const router = express.Router();

const upload = require('../services/file-upload');

const db = require("../database/dbConfig");

router.get("/images", (req, res) => {
  Posts.find()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get images, error: ${error}.` });
    });
});

router.get("/images/verified", (req, res) => {
  Posts.find()
    .then(post => {
      for(let i = 0; i < post.length; i++){
        if(post[i].posted == false && post[i].verified == true){
          return res.status(200).json(post[i])
        }
      }
      res.status(204).json({message: `No images verified.`})
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get images, error: ${error}.` });
    });
});

router.get("/images/posted", (req, res) => {
  Posts.find()
    .then(post => {
      for(let i = post.length; i >= 0; i--){
        if(post[i].posted == true){
          return res.status(200).json(post[i])
        }
      }
      res.status(204).json({message: `No new images to update.`})
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to get image, error: ${error}.` });
    });
});

router.post('/upload', async (req, res) => {
    const {name, data} = req.body;
    if(name && data) {
       await db.insert({name: name, img: data}).into('posts'); 
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
    
})

const singleUpload = upload.single('image');

router.post('/image-upload', function (req, res) {
    singleUpload(req, res, async (err) => {
      if(err){
        return res.json({'error': err})
      } else {
        await db.insert({name: req.body.name, img: req.file.location, posted: false, verified: null, key: req.file.key, caption: req.body.caption, username: req.body.username}).into('posts');
        return res.json({'imageUrl': req.file.location, 'name': req.body.name, "key": req.file.key})
      }
    });


});

router.post("/", (req, res) => {
  const postData = req.body;
  console.log(req.body)
  Posts.add(postData)
    .then(post => {
      res
        .status(201)
        .json({ message: "The post was successfully created." });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new post, error: ${error}.` });
    });
});

router.put("/images/:id", (req, res) => {
  const { id } = req.params;
  const { verified, twitter_id, posted } = req.body;
  const changes = { id, verified, posted, twitter_id };

  Posts.findById(id)
    .then(post => {
      if (post) {
        Posts.update(changes, id).then(updatedpost => {
          res
            .status(200)
            .json({ message: "Post has been successfully updated.", updatedpost });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find the post with that id." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Failed to create new post, error: ${error}.` });
    });
});


module.exports = router;