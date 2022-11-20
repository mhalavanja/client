import { PUBLIC_REST_API_BASE_URI, PUBLIC_REST_API_PORT } from "$env/static/public";

const restApi = "http://" + PUBLIC_REST_API_BASE_URI + ":" + PUBLIC_REST_API_PORT;
const AUTHENTICATE_API = restApi + "/authenticate";
const GROUPS_API = restApi + "/groups";
const FRIENDS_API = restApi + "/friends";
const USER_API = restApi + "/user";
const REGISTER_API = restApi + "/register";
const AUTH_HEADER = "authorization";
export { AUTHENTICATE_API, REGISTER_API, GROUPS_API, AUTH_HEADER, FRIENDS_API, USER_API };
