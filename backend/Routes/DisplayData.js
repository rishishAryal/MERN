const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {
    try {
      if (!global.food_items || !global.foodCategory) {
        return res.status(500).send('Data not loaded');
      }
      res.send([global.food_items, global.foodCategory]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
