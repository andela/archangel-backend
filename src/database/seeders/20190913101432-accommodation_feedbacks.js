module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'accommodation_feedbacks',
    [
      {
        id: 556655,
        accommodation_id: 1653453,
        accommodation_name: 'Sheraton Protea',
        author_email: 'nancngo@gmail.com',
        author_name: 'Ngozi Nancy',
        feedback: 'Its great working from this location.',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 554455,
        accommodation_id: 1653453,
        accommodation_name: 'Sheraton Protea',
        author_email: 'nancngo@gmail.com',
        author_name: 'Ngozi Nancy',
        feedback: 'Sample feedback on accommodation facility for testing.',
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('accommodation_feedbacks', null, {}),
};
