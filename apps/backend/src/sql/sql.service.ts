import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlService {
  buildDb2Validations(customerIdVariable = ':CUSTOMER_ID') {
    return [
      `SELECT CUSTOMER_ID, STATUS, UPDATED_AT FROM CCRWLUP WHERE CUSTOMER_ID = ${customerIdVariable};`,
      `SELECT COUNT(1) AS TXN_COUNT FROM CCRWTRN WHERE CUSTOMER_ID = ${customerIdVariable} AND TXN_DATE = CURRENT DATE;`
    ];
  }
}
