import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Role } from './common/guards/enums/role.enum';
import { GlobalExceptionFilter } from './common/http/http-exception.filter';
import { AppConfig, ConfigType } from './configs/config.type';
import { AppModule } from './modules/app.module';
import { SignUpAdminRequestDto } from './modules/auth/dto/request/sign-up-admin.req.dto';
import { AuthService } from './modules/auth/services/auth.service';
import { EAccountTypes } from './modules/users/enums/account-type.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cars seller API')
    .setDescription('The cars API control point')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const appAdminCreate = app.get(AuthService);
  const adminData: SignUpAdminRequestDto = {
    name: 'admin',
    email: 'admin@example.com',
    password: '123qwe!@#QWE',
    role: Role.Admin,
    account_type: EAccountTypes.PREMIUM,
  } as SignUpAdminRequestDto;
  const Admin = await appAdminCreate.isAdminAllreadyExist(adminData.email);
  if (!Admin) {
    await appAdminCreate.createAdmin(adminData);
    Logger.log('Admin user created successfully.');
  }

  const configService = app.get(ConfigService<ConfigType>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    Logger.log(`Server running  http://localhost:${appConfig.port}`);
    Logger.log(`Swagger running http://localhost:${appConfig.port}/doc`);
  });
}
bootstrap();
