import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 3000);

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://127.0.0.1:3000/',
      'https://localhost:3000/',
      'https://task-backend-chi-ten.vercel.app/',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('User Detail Application')
    .setDescription('User Detail API Description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
