
import { MailtrapClient } from 'mailtrap';
import { config } from 'dotenv';

// Load environment variables
config();

export const mailtrapclient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: 'hello@demomailtrap.com',
  name: 'BIG JA',
};


