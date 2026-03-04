import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "../config";

/**
 * Configuration Helmet pour les headers de sécurité
 */
export const helmetConfig = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", ...(config.corsOrigin === "*" ? [] : [config.corsOrigin].flat())],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // HTTP Strict Transport Security
  hsts: {
    maxAge: 31536000, // 1 an
    includeSubDomains: true,
    preload: true,
  },
  // Autres headers de sécurité
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  frameguard: { action: "deny" },
});

/**
 * Rate limiting global pour l'API
 * Limite : 100 requêtes par 15 minutes par IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true, // Retourne les headers RateLimit-*
  legacyHeaders: false, // Désactive les headers X-RateLimit-*
  // Clé personnalisée pour identifier les clients
  keyGenerator: (req) => {
    return req.ip || req.socket.remoteAddress || "unknown";
  },
  // Handler personnalisé pour les dépassements
  handler: (req, res) => {
    console.warn(`⚠️ Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
    res.status(429).json({
      error: "Too many requests",
      message: "You have exceeded the rate limit. Please try again later.",
      retryAfter: "15 minutes",
    });
  },
});

/**
 * Rate limiting strict pour les endpoints de modification
 * Limite : 20 requêtes par 15 minutes par IP
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limite à 20 requêtes pour les opérations sensibles
  message: {
    error: "Too many modification requests, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Compte aussi les requêtes réussies
  handler: (req, res) => {
    console.warn(`🔴 Strict rate limit exceeded for IP: ${req.ip} on ${req.method} ${req.path}`);
    res.status(429).json({
      error: "Too many modification requests",
      message: "You have exceeded the rate limit for modifications. Please try again later.",
      retryAfter: "15 minutes",
    });
  },
});

/**
 * Rate limiting pour les authentifications
 * Limite : 5 tentatives par 15 minutes par IP
 * Utilisé pour prévenir les attaques par force brute
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 tentatives
  skipSuccessfulRequests: true, // Ne compte que les échecs
  message: {
    error: "Too many authentication attempts, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.error(`🔴 Auth rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      error: "Too many authentication attempts",
      message: "Your IP has been temporarily blocked due to too many failed attempts.",
      retryAfter: "15 minutes",
    });
  },
});
