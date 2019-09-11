module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'comments',
    [
      {
        id: 556655,
        travel_id: 1891029,
        author_email: 'nancngo@gmail.com',
        author_name: 'Ngozi Nancy',
        comment: 'Where is it taking you to?',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 554455,
        travel_id: 1891029,
        author_email: 'nancngo@gmail.com',
        author_name: 'Ngozi Nancy',
        comment: 'Sample message for testing?',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('comments', null, {}),
};
