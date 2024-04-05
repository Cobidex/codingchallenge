import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import axios from 'axios';
import { config } from 'dotenv';
import app from '../../src/app';

const envPath = new URL('../../.env', import.meta.url).pathname;
config({ path: envPath });

vi.mock('axios');

describe('/GET movies', () => {
  it('Returns expected data when third party API is available', async () => {
    const mockData = {
      data: [
        {
          objectId: 'mockObjectId',
          applicant: 'mockApplicant',
        },
      ],
    };
    const longitude = 47.59;
    const latitude = -122.33;

    axios.get.mockResolvedValue(mockData);

    const response = await request(app).get(
      `/api/v1/foodtrucks?longitude=${longitude}&latitude=${latitude}`,
    );
    console.log(response.body.data);
    console.log(mockData.data);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data[0].objectId).toBe(mockData.data[0].objectId);
    expect(response.body.data[0].applicant).toBe(mockData.data[0].applicant);
  });

  it('Returns proper erro message when no data is available', async () => {
    const mockData = { data: [] };

    axios.get.mockResolvedValue(mockData);
    const longitude = 47.59;
    const latitude = -122.33;

    const response = await request(app).get(
      `/api/v1/foodtrucks?longitude=${longitude}&latitude=${latitude}`,
    );

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.error).toBe('no foodtruck found');
  });

  it('Returns error when API is unavailable', async () => {
    const mockData = null;

    axios.get.mockResolvedValue(mockData);

    const longitude = 47.59;
    const latitude = -122.33;

    const response = await request(app).get(
      `/api/v1/foodtrucks?longitude=${longitude}&latitude=${latitude}`,
    );

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.error).toBe('data source unavailable');
  });
});
