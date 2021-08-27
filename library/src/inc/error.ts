import { QQApiCode } from './enum';

export class ApiError extends Error {
	constructor(public readonly code: QQApiCode, message?: string) {
		if (!message) {
			message = 'no message';
		}
		super(`[${QQApiCode[code]}] ${message}`);
	}
}

export class NetworkError extends Error {}
