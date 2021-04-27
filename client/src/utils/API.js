import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  executeTrade: function (body){
    return axios.put(`/api/users`, body)
  },
  getProfile: function(id) {
    return axios.get("/api/users/profile/" + id);
  },
//update the user model
  addCard: function(id, body) {
    return axios.post("/api/cards/" + id, body)
  },
  updateCard: function(id, body) {
    return axios.put("/api/cards/" + id, body)
  },
  deleteCard: function(id, uuid) {
    return axios.delete("/api/cards/" + id + "/" + uuid);
  },
  verifyTrades: function(uuid) {
    return axios.put("/api/trades/verify", uuid);
  },
  createTrade: function(trade) {
    return axios.post("/api/trades", trade)
  },
  getTrade: function(user) {
    return axios.get(`/api/trades/${user}`)
  },
 accept: function(id, body) {
   return axios.put(`api/trades/` + id, body)
 },
 updateStatus: function (id, body) {
   return axios.put(`api/trades/` + id, body)
 },
 delete: function (id) {
   return axios.delete(`api/trades/` + id)
 },
  // Saves a user to the database
  createUser: function(user) {
    return axios.post("/api/users", user);
  },
  createChatRoom: function(data) {
    return axios.post("/api/chats", data);
  }



   // Deletes the user with the given id
  // deleteUser: function(id) {
  //   return axios.delete("/api/users/" + id);
  // },
};