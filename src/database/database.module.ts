import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]  // make DatabaseService available for other modules to import and use.  // This is a best practice to avoid tight coupling between modules.  // This makes testing easier as you can mock the service.  // The DatabaseService will be injected into the other modules.  // This module is not being used in this current test file.  // You can use this module in other modules that need access to a database.  // This module provides the functionality to
})
export class DatabaseModule {}
