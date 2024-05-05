const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const {Driving} = require('./Driving.js');

let fuel =0;
let date;
let formattedTime;
let averageTemperature;
let averageRpm;
let averageSpeed;
let averageThrottle;

async function getFirstLine(filePath) {
  return new Promise((resolve, reject) => {
    const readable = createReadStream(filePath); //creates a readable stream from the file
    const reader = createInterface({ input: readable }); //configures it to read from the `readable` stream

    reader.once('line', (line) => { // Use 'once' instead of 'on' to ensure it only triggers once
      reader.close(); // Close the reader once the first line is read
      //console.log('The first line:', line); // Print the first line to the console
      resolve(line); // Resolve the promise with the first line
    });

    reader.on('error', reject);
  });
}

async function getLastLine(filePath) {
  try {
    return await new Promise((resolve, reject) => {
      let lastLine = '';

      const readable = createReadStream(filePath, { encoding: 'utf-8' });

      readable.on('data', (chunk) => {
        const lines = chunk.split('\n');
        lastLine = lines.pop(); // Get the last line from the chunk
      });

      readable.on('end', () => {
        if (lastLine.trim() !== '') { // Check if the last line is not empty
          //console.log('Last line:', lastLine);
          resolve(lastLine);
        } else {
          reject('File is empty.');
        }
      });

      readable.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error_1) {
    console.error('Error occurred:', error_1);
  }
}
async function calculateTravelTime(filePath) {
  return new Promise(async (resolve, reject) => {
      try {
          const startTimeLine = await getFirstLine(filePath);
          const endTimeLine = await getLastLine(filePath);

          // Extracting the timestamp from the start and end lines
          const startTimeStamp = startTimeLine.split(',')[1];
          const endTimeStamp = endTimeLine.split(',')[1];

          // Extracting the time portion from the timestamps
          const startTime = startTimeStamp.split(' ')[1];
          const endTime = endTimeStamp.split(' ')[1];

          // Calculating the travel time
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);

          const startSeconds = (startTimeParts[0] * 3600) + (startTimeParts[1] * 60) + startTimeParts[2];
          const endSeconds = (endTimeParts[0] * 3600) + (endTimeParts[1] * 60) + endTimeParts[2];

          const timeDifferenceSeconds = endSeconds - startSeconds;

          // Converting seconds to hours, minutes, and seconds
          const hours = Math.floor(timeDifferenceSeconds / 3600);
          const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
          const seconds = Math.floor(timeDifferenceSeconds % 60);

          // Format the time as HH:MM:SS
          formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          //console.log('Travel Time:', formattedTime);
          resolve(formattedTime);
      } catch (error) {
          console.error('Error occurred:', error);
          reject(error);
      }
  });
}

async function getDate(filePath) {
  return new Promise((resolve, reject) => {
      getFirstLine(filePath)
          .then(line => {
              const parts = line.split(',');
              const datePart = parts[1];
              date = datePart.split(' ')[0]; // Extract the date part before the space
              //console.log('The date:', date);
              resolve(date);
          })
          .catch(error => {
              console.error('Error occurred while getting date:', error);
              reject(error);
          });
  });
}
async function calculateAverages(filePath) {
  return new Promise((resolve, reject) => {
      let totalTemperature = 0;
      let totalRpm = 0;
      let totalSpeed = 0;
      let totalThrottle = 0;
      let lineCount = 0;

      const readable = createReadStream(filePath, { encoding: 'utf-8' });
      const reader = createInterface({ input: readable });

      reader.on('line', (line) => {
          const values = line.split(',');
          if (values.length >= 7) {
              const temperature = parseInt(values[2]);
              const rpm = parseInt(values[3]);
              const speed = parseInt(values[4]);
              const throttle = parseInt(values[5]);

              totalTemperature += temperature;
              totalRpm += rpm;
              totalSpeed += speed;
              totalThrottle += throttle;

              lineCount++;
          }
      });

      reader.on('close', () => {
          if (lineCount === 0) {
              reject('No data found in the file.');
          } else {
              averageTemperature = totalTemperature / lineCount;
              averageRpm = totalRpm / lineCount;
              averageSpeed = totalSpeed / lineCount;
              averageThrottle = totalThrottle / lineCount;

              const averages = {
                  averageTemperature,
                  averageRpm,
                  averageSpeed,
                  averageThrottle
              };

              resolve(averages);
          }
      });

      reader.on('error', (error) => {
          reject(error);
      });
  });
}

async function createObjectDriving(filePath) {
  try {
      const date = await getDate(filePath);
      const formattedTime = await calculateTravelTime(filePath);
      const averages = await calculateAverages(filePath);

      const drivingInstance = new Driving(
          date,
          formattedTime,
          averageTemperature,
          averageRpm,
          averageSpeed,
          averageThrottle,
          fuel
      );

      console.log('The drivingData:', drivingInstance);
      return drivingInstance;
  } catch (error) {
      console.error('Error creating driving object:', error);
      throw error;
  }
}

module.exports = {createObjectDriving };
