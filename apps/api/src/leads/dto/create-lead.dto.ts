import {IsInt, IsOptional, IsString, Max, MaxLength, Min} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateLeadDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;

  @IsString()
  @MaxLength(30)
  phone!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  telegram?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  segment?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(80)
  @Max(240)
  power?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10000)
  flowPerDay?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  network?: string;

  @IsOptional()
  @IsString()
  honeypot?: string;
}

