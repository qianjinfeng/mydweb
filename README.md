# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

Study
        "00080020",   //date
        "00080030",   //time
        "00100010",   //name
        "00100020",  //patientid
        "00100040",   //sex
        "0020000D",   //uid
        "00200010"   //Studyid
        00201208   NumberOfStudyRelatedInstances

Series
        "00080005", //Specific Character Set
        "00080060",  //Modality
        "0008103E",  //Series Description
        "0020000D",  //Study Instance UID
        "0020000E",  //Series Instance UID
        "00200011",  //Series Number
        "00201209"   NumberOfSeriesRelatedInstances

instance
        "00080005",
        "00080016",  SOP Class UI
        "00080018",  SOP Instance UID
        "0020000D",  Study Instance UID
        "0020000E",  Series Instance UID
        "00200013"  Instance Number


