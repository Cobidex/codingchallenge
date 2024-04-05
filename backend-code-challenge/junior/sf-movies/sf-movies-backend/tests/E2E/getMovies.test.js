import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
          title: 'mockTitle',
          locations: 'mockLocation',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
      ],
    };

    axios.get.mockResolvedValue(mockData);

    const response = await request(app).get('/api/v1/movies');
    console.log(response.body.data);
    console.log(mockData.data);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data[0].title).toBe(mockData.data[0].title);
    expect(response.body.data[0].locations).toBe(mockData.data[0].locations);
    expect(response.body.data[0].release_year).toBe(
      mockData.data[0].release_year,
    );
    expect(response.body.data[0].production_company).toBeUndefined();
    expect(response.body.data[0].distribution).toBeUndefined();
    expect(response.body.data[0].director).toBeUndefined();
  });

  it('Returns expected data with querry parameter when third party API is available', async () => {
    const mockData = {
      data: [
        {
          title: 'love',
          locations: 'mockLocation1',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
        {
          title: 'charge',
          locations: 'mockLocation2',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
        {
          title: 'love',
          locations: 'mockLocation3',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
        {
          title: 'charge',
          locations: 'mockLocation4',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
        {
          title: 'charge',
          locations: 'mockLocation5',
          release_year: 2000,
          production_company: 'mockCompany',
          distribution: 'mockDistribution',
          director: 'mockDirector',
        },
      ],
    };

    axios.get.mockResolvedValue(mockData);

    const response = await request(app).get('/api/v1/movies?title=love');
    console.log(response.body.data);
    console.log(mockData.data);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.length).toBe(2);
    expect(response.body.data[0].locations).toBe(mockData.data[0].locations);
    expect(response.body.data[1].locations).toBe(mockData.data[2].locations);
    expect(response.body.data[0].release_year).toBe(
      mockData.data[0].release_year,
    );
    expect(response.body.data[0].production_company).toBeUndefined();
    expect(response.body.data[0].distribution).toBeUndefined();
    expect(response.body.data[0].director).toBeUndefined();
  });

  it('Returns proper erro message when no data is available', async () => {
    const mockData = { data: [] };

    axios.get.mockResolvedValue(mockData);

    const response = await request(app).get('/api/v1/movies');

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('error');
    expect(response.body.error).toBe('no data available');
  });

  it('Returns error when API is unavailable', async () => {
    const mockData = null;

    axios.get.mockResolvedValue(mockData);

    const response = await request(app).get('/api/v1/movies');

    expect(response.statusCode).toBe(500);
    expect(response.body.status).toBe('error');
    expect(response.body.error).toBe('data source unavailable');
  });
});
