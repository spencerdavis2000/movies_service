const express = require('express');
const router = express.Router();
const { executeQuery } = require('../dbUtils.js');

// POST route to handle VHS search
router.post('/', async (req, res) => {
  try {
    const { currentPage, pageSize, search } = req.body;
    const offset = (currentPage - 1) * pageSize;

    // Build the query
    const titleFilter = search?.title ? `WHERE title LIKE @title` : '';
    const query = `
      SELECT title, releaseYear, numberOfCopiesAvailable, director, distributor
      FROM Projector
      ${titleFilter}
      ORDER BY title
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY;
    `;

    // Execute the query
    const results = await executeQuery(query, {
      title: `%${search.title}%`,
      offset,
      pageSize,
    });

    // Respond with the data
    res.status(200).json({ currentPage, pageSize, data: results });
  } catch (error) {
    console.error('Error handling VHS POST:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
