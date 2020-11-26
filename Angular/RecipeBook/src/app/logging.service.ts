import { Injectable } from '@angular/core';

export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    console.log('Current', message);
    console.log('Last log', this.lastLog);
    this.lastLog = message;
  }
}
