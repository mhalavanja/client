import { PUBLIC_REST_API_BASE_URI, PUBLIC_REST_API_PORT } from "$env/static/public";

const restApi = "http://" + PUBLIC_REST_API_BASE_URI + ":" + PUBLIC_REST_API_PORT;
const AUTHENTICATE_API = restApi + "/authenticate";
const GROUPS_API = restApi + "/groups";
const FRIENDS_API = restApi + "/friends";
const USER_API = restApi + "/user";
const REGISTER_API = restApi + "/register";
const AUTH_HEADER = "authorization";

enum Errors {
  MissingGroupName = "Group name is missing",
  MissingUsername = "Username is missing",
  GroupNameEmpty = "Group name can't be empty",
  UsernameEmpty = "Username can't be empty",
  UniqueUsername = "Friend's username must be different than your's",
  WrongGroup = "You can only delete groups you own",
  AlreadyAddedFriend = "You are already friends with that user",
  UserNotExisting = "User with this username doesn't exist",
  UserAlreadyExists = "User with the given email address or username already exists",
  UserInGroup = "User is already a member of this group",
  GroupNotExisting = "Group with this name doesn't exist",
  GenericError = "Something went wrong on our side, sorry about that",
}

export { AUTHENTICATE_API, REGISTER_API, GROUPS_API, AUTH_HEADER, FRIENDS_API, USER_API, Errors };
