import autoBind from 'auto-bind';

let socketPlug = null;
/**
 *
 *
 * @class socketEmission
 */
class socketEmission {
    // eslint-disable-next-line valid-jsdoc
    /**
     *Creates an instance of socketEmission.
     @param {} io
     * @memberof socketEmission
     */
    constructor(io) {
        socketPlug = io;
        autoBind(this);
    }

    /**
     *@description A function that handles multicity travel request by a user
     * @static
     * @param {Object} eventName
     * @param {Object}  eventMessage
     * @returns {object} Details of booked trips
     * @memberof Trips
     */
    static async emission(eventName, eventMessage) {
        return socketPlug.emit(eventName, eventMessage);
    }
}
export default socketEmission;
