import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: [
      'https://personal-website-finals-1r56.vercel.app', // <-- your frontend domain
      'http://localhost:5173',                           // optional for local testing
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false, // set true only if you send cookies/Authorization across origins
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();