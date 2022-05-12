// import {ActionController, UserController} from './src/controller'
// import {ActionType, UserType} from "./src/models";
import {serverService} from './src/services'

let app = async () => {
    // let userData: UserType = {age: 32, location: 'tehran', name: 'ali'}
    // let actionData: ActionType = {completed: false, text: 'swim'}
    // let actionController = new ActionController();
    // let userController = new UserController();
    // await actionController.create(actionData).then(r => console.log(`create Action: ${JSON.stringify(r)}`))
    // actionData._id = new ObjectId('6278fa81ac032d291a7ad28f');
    // actionData.completed = !actionData.completed;
    // await actionController.read('6278fa81ac032d291a7ad28f').then(r => console.log(`read Action: ${JSON.stringify(r)}`));
    // await actionController.update(actionData).then(r => console.log(`update Action: ${JSON.stringify(r)}`));
    // await actionController.delete('6278fa81ac032d291a7ad28f').then(r => console.log(`delete Action: ${JSON.stringify(r)}`));
    // await actionController.readAll().then(r => console.log(`readAll Action: ${JSON.stringify(r)}`));
    // await userController.create(userData).then(r => console.log(`create users: ${JSON.stringify(r)}`));
    // userData._id = new ObjectId('6278f67273af78def759abff');
    // userData.age = userData.age + 2;
    // await userController.read('6278fa81ac032d291a7ad28f').then(r => console.log(`read users: ${JSON.stringify(r)}`));
    // await userController.update(userData).then(r => console.log(`update users: ${JSON.stringify(r)}`));
    // await userController.delete('6278fa81ac032d291a7ad28f').then(r => console.log(`delete users: ${JSON.stringify(r)}`));
    // await userController.readAll().then(r => console.log(`readAll users: ${JSON.stringify(r)}`));

    serverService();
}

app().then();

export default {app: app}




