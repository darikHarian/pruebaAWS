import { verifyToken, showContent, hideContent } from './auth.js';
import { verifyEmail } from './verifySignUp.js';

export const auth = (req, res, next) => {
    verifyToken(req, res, next);
};

export const verifySignUp = (req, res, next) => {
    verifyEmail(req, res, next);
};

export const showSessionContent = (req, res, next) => {
    showContent(req, res, next);
};

export const hideSessionContent = (req, res, next) => {
    hideContent(req, res, next);
};