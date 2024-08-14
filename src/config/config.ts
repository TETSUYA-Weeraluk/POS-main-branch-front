export const BASE_API = import.meta.env.VITE_API;
export const myId = import.meta.env.VITE_MY_ID;

export const path = {
  user: {
    getMe: "users/Getme",
  },
  resturant: {
    get: "restaurant",
    getOwner: "restaurant/GetOwner",
    create: "restaurant",
    delete: "restaurant",
    update: "restaurant",
  },
};
