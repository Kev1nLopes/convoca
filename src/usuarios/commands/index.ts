import { removeUserHandler } from "./remove-user/remove-user.handler";
import { signInHandler } from "./signIn/signIn.handler";
import { signUpCommand } from "./signUp/signUp.command";
import { signUpHandler } from "./signUp/signUp.handler";
import { UpdateUserHandler } from "./update-user/update-user.handler";


export const CommandHandlers = [signUpHandler, signInHandler, UpdateUserHandler, removeUserHandler]