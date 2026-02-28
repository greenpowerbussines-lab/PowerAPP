import {IsIn, IsOptional, IsString} from 'class-validator';

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  @IsIn(['new', 'in_progress', 'won', 'lost'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

