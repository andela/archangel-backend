/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import models from '../database/models';

const { travel_requests, departments, users } = models;

const onewayTripService = async (travelObj) => {
  try {
    return await travel_requests.create(travelObj);
  } catch (err) {
    throw err;
  }
};

const findTravelById = async (id) => {
  try {
    return await travel_requests.findOne({
      attributes: ['id', 'user_id'],
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

const showManagerPendingAppr = async (manager) => {
  try {
    return await travel_requests.findAll({
      where: {
        approval_status: 'pending',
      },
      include: [
        {
          model: users,
          attributes: ['first_name', 'last_name'],
          include: [
            {
              model: departments,
              attributes: ['dept_name', 'line_manager'],
              where: {
                line_manager: manager,
              },
            },
          ],
        },
      ],
      raw: true,
    });
  } catch (err) {
    throw err;
  }
};

const checkApprovalStatus = async (id) => {
  try {
    return await travel_requests.findAll({
      attributes: ['approval_status'],
      where: { id },
      raw: true
    });
  } catch (err) {
    throw err;
  }
};


const editOpenRequests = async ({
  id,
  travel_type = 'one-way',
  origin,
  destination,
  departure_date = null,
  return_date,
  travel_purpose,
  accommodation_id,
  approval_status = 'pending',
  multi_city = false
}, userId) => {
  try {
    return await travel_requests.update({
      user_id: userId,
      travel_type,
      origin,
      destination,
      departure_date,
      return_date,
      travel_purpose,
      accommodation_id,
      approval_status,
      multi_city
    }, {
      where: { id },
      returning: true,
      plain: true
    });
  } catch (err) {
    throw err;
  }
};

export {
  onewayTripService, findTravelById, showManagerPendingAppr, editOpenRequests, checkApprovalStatus
};
