module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'notifications',
    [
      {
        id: 899899,
        recipient_id: 1215739,
        travel_id: 1898451,
        message: 'Approved travel request sample notification.',
        is_read: false,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
      {
        id: 899453,
        recipient_id: 1215739,
        travel_id: 1891029,
        message: 'Approved travel request sample notification.',
        is_read: false,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    ],
    {}
  ),

  down: (queryInterface) => queryInterface.bulkDelete('notifications', null, {}),
};
