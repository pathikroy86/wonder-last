import { mongodbAdapter } from 'better-auth/adapters/mongodb';
console.log('mongodbAdapter type', typeof mongodbAdapter);
console.log('mongodbAdapter is function', typeof mongodbAdapter === 'function');
console.log('mongodbAdapter length', mongodbAdapter.length);
