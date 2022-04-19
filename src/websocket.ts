import { io } from 'socket.io-client';

const isProduction = process.env.NODE_ENV === 'production';
const socketUrl = isProduction
  ? 'https://go4api.herokuapp.com/'
  : 'http://localhost:5000';

function socket(options?: Record<string, any>) {
  const socket = io(socketUrl, options);

  return async function emit(event: string, payload: any) {
    return await new Promise((resolve, reject) => {
      socket.on(event, (response: any) => resolve(response));
      socket.on('error', (error: any) => reject(error));
      socket.emit(event, payload);
    });
  };
}

export const socketWithAuth = (token: string) => socket({ auth: { token } });
export default socket;
