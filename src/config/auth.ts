if (!process.env.APP_SECRET) {
  throw new Error('Environment variable APP_SECRET is not defined');
}

export default {
  jwt: {
    secret: process.env.APP_SECRET as string,
    expiresIn: '1d',
  },
};
