import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private blacklist: string[] = [];

  addToBlacklist(token: string) {
    this.blacklist.push(token);
  }

  isBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }
}
