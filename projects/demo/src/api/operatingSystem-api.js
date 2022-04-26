import os from 'os';
console.log('start operating System api');
export let operatingSystem=()=> {
    console.log(os.userInfo().username);
}
