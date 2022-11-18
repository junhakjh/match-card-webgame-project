import express from 'express'
import {getDatabase} from 'firebase-admin/database';
import { UM } from '../../service/USER/userManager.js';

export const router = express.Router();

const db = getDatabase();
const userRef = db.ref('user');

export const crudUser = (io, socket) => {
    const createPlayer = (data) => {
        socket.emit("success player signup", UM.createUser(data));
    } 
    
    const createAdmin = (data) => {
        socket.emit("success admin signup", UM.createAdmin(data));
    }
    
    const readUser = (id = 0) => {
        //if(id) c = CM.getChannelById(id);
        //else if(name) c = CM.getChannelByName(name);

        // CM.getChannelById(id)
        // .then(c=>socket.emit("channel:read", (c?c:"isNull")))
        // .catch(e=>console.log(e));
    }

    const updateUser = (name, maxRoom, maxTeam, channelId) => { 
    }

    const deleteUser = (channelId) => { 
    }

    // socket.on("user:create", createUser);
    // socket.on("user:read", readUser);
    socket.on("player signup", createPlayer);
    socket.on("admin signup", createAdmin);
}