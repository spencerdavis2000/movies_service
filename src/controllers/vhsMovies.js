const express = require('express');
const router = express.Router();
const { executeQuery } = require('../dbUtils.js');

// POST route to handle VHS search
router.post('/', async (req, res) => {
  try {
    const { currentPage, pageSize, search } = req.body;

    // Validate input
    if (!currentPage || !pageSize || typeof currentPage !== 'number' || typeof pageSize !== 'number') {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    const offset = (currentPage - 1) * pageSize;

    // Build the query with a safe fallback for title filter
    const titleFilter = search?.title ? `WHERE title LIKE @title` : '';
    const query = `
      SELECT title, releaseYear, numberOfCopiesAvailable, director, distributor
      FROM VHS
      ${titleFilter}
      ORDER BY title
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY;
    `;

    // Execute the query
    const results = await executeQuery(query, {
      title: `%${search?.title || ''}%`,
      offset,
      pageSize,
    });

    // Ensure results is always an array
    const films = results || [];

    // Respond with the data
    res.status(200).json({
      currentPage,
      pageSize,
      films,
    });
  } catch (error) {
    console.error('Error handling VHS POST:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
