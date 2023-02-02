---
to: <%= path %>/<%= moduleName %>.controller.ts
---
import { Controller } from '../lib/controller';
import { <%= cModuleName %>Service } from './<%= moduleName %>.service';

export class <%= cModuleName %>Controller extends Controller {}