/* eslint-disable no-useless-catch */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Op } from 'sequelize';
import { computeLimitAndOffset } from '../utils/pagination';
import models from '../models';

const { travel_requests, departments, users } = models;

export const onewayTripService = async travelObj => {
  try {
    return await travel_requests.create(travelObj);
  } catch (err) {
    throw err;
  }
};

export const findTravelById = async id => {
  try {
    return await travel_requests.findOne({
      attributes: ['id', 'user_id'],
      where: { id }
    });
  } catch (err) {
    throw err;
  }
};

export const showManagerPendingAppr = async manager => {
  try {
    return await travel_requests.findAll({
      where: {
        approval_status: 'pending'
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
                line_manager: manager
              }
            }
          ]
        }
      ],
      raw: true
    });
  } catch (err) {
    throw err;
  }
};

/** helper function that get request with a search keyword
 * @param {object} body query
 * @param {object} query query
 * @returns {Promise} Promise resolved or rejected
 */
export const searchTravel = (body, query) => {
  const { page, perPage } = query;
  const { limit, offset } = computeLimitAndOffset(page, perPage);
  const searchValue = Object.keys(body).map(key => {
    switch (key) {
      case 'origin':
        return {
          origin: body[key]
        };
      case 'destination':
        return {
          destination: body[key]
        };

      default:
        return {
          [key]: {
            [Op.iLike]: `%${body[key]}`
          }
        };
    }
  });
  return travel_requests.findAndCountAll({
    where: {
      [Op.or]: searchValue
    },
    limit,
    offset
  });
};

export const showUsertravelsStatus = async userId => {
  try {
    return await travel_requests.findAll({
      where: {
        user_id: userId
      }
    });
  } catch (error) {
    throw error;
  }
};
