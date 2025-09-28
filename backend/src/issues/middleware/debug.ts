import { type RequestHandler } from "express";

export const debugRequest: RequestHandler = (req, res, next) => {
  console.log('\n🔍 Incoming Request Debug Info:');
  console.log('📍 URL:', req?.url || "");
  console.log('📝 Method:', req?.method);
  console.log('📦 Body:', req?.body);
  console.log('🔎 Query:', req?.query);
  console.log('🎯 Params:', req?.params);
  console.log('📨 Headers:', req?.headers);
  console.log('-------------------\n');
  next()
};