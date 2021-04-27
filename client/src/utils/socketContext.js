import React from "react";
import openSocket from 'socket.io-client';

export const socket= openSocket(process.env.REACT_APP_SOCKET_URI, {transports: ['websocket']});
export const socketContext= React.createContext();