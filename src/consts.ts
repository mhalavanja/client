import { PUBLIC_REST_API_BASE_URI, PUBLIC_REST_API_PORT } from "$env/static/public";

const restApi = "http://" + PUBLIC_REST_API_BASE_URI + ":" + PUBLIC_REST_API_PORT;
const AUTHENTICATE_API = restApi + "/authenticate";
const REGISTER_API = restApi + "/register";

export { AUTHENTICATE_API, REGISTER_API };
