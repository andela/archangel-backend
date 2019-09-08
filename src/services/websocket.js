import { io } from '../index';

export const eventEmitter = (eventName, data) => {
    io.on('connection', (client) => {
        client.emit(eventName, data);
    });
};

export const onEvent = (eventName, handleEvent) => {
    io.on('connection', (client) => {
        client.on(eventName, handleEvent);
    });
};
