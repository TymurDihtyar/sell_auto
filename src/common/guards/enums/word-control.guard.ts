import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { EStatus } from '../../../modules/listings/enums/status.enum';
import { ListingsRepository } from '../../../modules/repository/services/listins.repository';
import { badWordList } from '../constants/badWordList';

@Injectable()
export class BannedWordsGuards implements CanActivate {
  private numberOfEditAttempts = 0;
  private readonly maxNumberOfEditAttempts = 3;
  private isListingSaved = false;
  private previousToken: string;

  constructor(private listingsRepository: ListingsRepository) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const description = request.body.description;
    const title = request.body.title;
    const currentToken = request.headers['authorization'];
    if (this.previousToken !== currentToken) {
      this.numberOfEditAttempts = 0;
      this.previousToken = currentToken;
      this.isListingSaved = false;
    }

    if (this.isListingSaved) {
      throw new BadRequestException(
        'You have reached the maximum number of edit attempts in this ListingSaved',
      );
    }

    if (this.numberOfEditAttempts === this.maxNumberOfEditAttempts) {
      await this.listingsRepository.save(
        this.listingsRepository.create({
          ...request.body,
          user_id: request.user.userId,
          status: EStatus.INACTIVE,
        }),
      );

      this.isListingSaved = true;
      throw new BadRequestException(
        'You have reached the maximum number of edit attempts',
      );
    }

    const containsBannedWords = this.checkForBannedWords(
      description,
      title,
      badWordList,
    );

    if (containsBannedWords) {
      this.numberOfEditAttempts++;
      throw new BadRequestException(
        'The description or title contains invalid words',
      );
    }
    return true;
  }

  private checkForBannedWords(
    title: string,
    description: string,
    bannedWords: string[],
  ): boolean {
    if (!description || !title) {
      throw new BadRequestException('Description or title is empty');
    }
    for (const word of bannedWords) {
      if (description.includes(word) || title.includes(word)) {
        return true;
      }
    }
    return false;
  }
}
