import express, { Request, Response } from 'express';
import axios from 'axios';
import { DateTime, IANAZone } from 'luxon';

const app = express();

async function callApi(ipAddress: string) {
  const queryUrl = `http://ip-api.com/json/${ipAddress.trim()}`;
  const response = await axios.get(queryUrl);
  return response.data;
}

function getIpAddress(req: Request) {
  const proxyHeader = req.headers['x-forwarded-for'] as string; 
  if (!proxyHeader) {
    return req.socket.remoteAddress; // ip z połączenia
  } else {
    return proxyHeader.split(',')[0].trim(); // z reverse proxy np. nginx
  }
}

app.get('/', async (req: Request, res: Response) => {
  const userIP = getIpAddress(req);
  console.info(`User with IP ${userIP} entered the site.`);

  try {
    const response = await callApi(userIP);
    console.info(`API Response: ${JSON.stringify(response)}`);

    if (response.status !== 'success') {
      console.error(`API call failed for IP: ${userIP}.`);
      return res.send(getFailMessage(userIP));
    }

    const timezoneText = response.timezone as string;
    const timezoneObj = IANAZone.create(timezoneText);
    const serverTime = DateTime.now();
    const userTime = serverTime.setZone(timezoneObj);
    res.send(`IP Address: ${userIP}. Time zone: ${timezoneObj.name}. Time: ${userTime}.`);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.send(getFailMessage(userIP));
  }
});

function getFailMessage(userIP: string) {
  return `IP Address: ${userIP}. Server time is ${DateTime.now()}`;
}

const port = 8000;
app.listen(port, () => {
  console.log('Author: Dawid Pawelec')
  console.log(`Server listening on port ${port}`);
});