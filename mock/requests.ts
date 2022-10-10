import { Request, Response } from "express";

const mockRequest = {
  body: {
    firstName: 'Michael',
    lastName: 'Rossmann'
  },
} as Request

const mockResponse = {
  json: jest.fn(),
  set: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis()
} as unknown as Response

export { mockRequest, mockResponse };